<?php

class EducationPrice
{
    public $contentsCode; // 컨텐츠 코드
    public $lectureStart; // 수강 시작 날짜
    public $contentsInfo; // 콘텐츠 정보
    public $applyDate; // ncs 조정계수 적용 기준 일자

    /**
     * @param $contentsCode
     * @param $lectureStart
     */
    public function __construct($contentsCode, $lectureStart)
    {
        $this->contentsCode = $contentsCode;
        $this->lectureStart = $lectureStart;
        $this->contentsInfo = $this->getContentsInfo($this->contentsCode);
        $this->applyDate = $this->getApplyDateArr();
    }


    public function insertPrice()
    {
        $applyDate = $this->getApplyDate();
        $query = "
            SELECT 1 FROM nynContentsPrice WHERE contentsCode = '$this->contentsCode' AND applyDate = '$applyDate'
        ";
        $result = mysql_query($query);
        $count = mysql_num_rows($result);
        if ($count == 0) {
            $priceInfo = $this->getPriceInfo();
            $queryI = "
                INSERT INTO nynContentsPrice
                    (contentsCode, applyDate, rPrice01, rPrice02, rPrice03, selfPrice01, selfPrice02, selfPrice03)
                VALUES
                    ('$this->contentsCode', '$applyDate', '{$priceInfo['rPrice01']}', '{$priceInfo['rPrice02']}',
                     '{$priceInfo['rPrice03']}', '{$priceInfo['selfPrice01']}', '{$priceInfo['selfPrice02']}',
                     '{$priceInfo['selfPrice03']}')
            ";
            $resultI = mysql_query($queryI);
        }
    }

    /**
     * @return array
     */
    public function getPriceInfo()
    {
        // 산업안전인 경우
        if ($this->contentsInfo['sort01'] == 'lecture03') {
            return [
                'rPrice01' => 0,
                'rPrice02' => 0,
                'rPrice03' => 0,
                'selfPrice' => $this->contentsInfo['selfPrice'],
                'selfPrice01' => 0,
                'selfPrice02' => 0,
                'selfPrice03' => 0
            ];
        }

        // 디지털 융합 과정인 경우
        if ($this->contentsInfo['sort01'] == 'lecture16') {
            return [
                'rPrice01' => $this->contentsInfo['selfPrice'],
                'rPrice02' => 0,
                'rPrice03' => 0,
                'selfPrice' => $this->contentsInfo['selfPrice'],
                'selfPrice01' => 0,
                'selfPrice02' => 0,
                'selfPrice03' => 0
            ];
        }

        // 비환급인 경우
        if ($this->contentsInfo['contentsType'] == '3') {
            return [
                'rPrice01' => 0,
                'rPrice02' => 0,
                'rPrice03' => 0,
                'selfPrice' => 0,
                'selfPrice01' => 0,
                'selfPrice02' => 0,
                'selfPrice03' => 0
            ];
        }

        $coefficient = $this->getCoefficient();

        $selfPrice = floor($this->getSelfPrice());

        if ($this->contentsInfo['dutyType2'] == 'Y') {
            $rPrice01 = floor(($selfPrice * 0.5 / 10) * 10);
        } else {
            $rPrice01 = floor($selfPrice * $coefficient * 0.9 / 10) * 10;
        }
        $selfPrice01 = $selfPrice - $rPrice01;

        $rPrice02 = floor($selfPrice * $coefficient * 0.8 / 10) * 10;
        $selfPrice02 = $selfPrice - $rPrice02;

        $rPrice03 = floor($selfPrice * $coefficient * 0.4 / 10) * 10;
        $selfPrice03 = $selfPrice - $rPrice03;

        return [
            'rPrice01' => $rPrice01,
            'rPrice02' => $rPrice02,
            'rPrice03' => $rPrice03,
            'selfPrice' => $selfPrice,
            'selfPrice01' => $selfPrice01,
            'selfPrice02' => $selfPrice02,
            'selfPrice03' => $selfPrice03
        ];

    }

    /**
     * @return float|int
     */
    public function getSelfPrice()
    {
        $price = $this->getGradePrice($this->contentsInfo['contentsGrade']);
        return $this->contentsInfo['contentsTime'] * $price;
    }

    /**
     * @return string
     */
    public function getApplyDate()
    {
        $date = '2022-01-01';
        $i = 0;

        while ($this->applyDate) {
            if ($this->applyDate[$i] <= $this->lectureStart) {
                $date = $this->applyDate[$i];
                break;
            }
            $i++;
        }
        return $date;
    }

    /**
     * 조정계수 적용
     * @return float|int
     */
    private function getCoefficient()
    {
        $coefficient = $this->setCoefficient();

        // 23년 규정
//        if ($this->contentsInfo['contentsGrade'] == 'A') {
//            $coefficient = 1;
//        }

        // 24년 규정
        // 23년 6월 이후 선정된 A등급은 조정계수 미적용(1)
        if ($this->contentsInfo['contentsGrade'] == 'A') {

            if (!empty($this->contentsInfo['passCode']) && $this->contentsInfo['passCode'] >= date('Ym',
                    strtotime('2023-06'))) {
                $coefficient = 1;
            }
        }

        if ($this->contentsInfo['dutyType2'] == 'Y') {
            $coefficient = 0.5;
        }

        if ($this->contentsInfo['contentsType'] == '4') {
            $coefficient = 1;
        }

        return $coefficient;
    }

    /**
     * @return int|float
     */
    public function setCoefficient()
    {
        $date = $this->getApplyDate();
        return $this->ncsQuery($date);
    }

    /**
     * 적용 날짜별, ncs코드별 설정되어있는 조정계수 가져옴
     * @param $date
     * @return int|float
     */
    private function ncsQuery($date)
    {
        $ncsCode = $this->contentsInfo['ncsCode'];
        $searchCode = $ncsCode;
        if (strlen($ncsCode) == 8) $searchCode = substr($ncsCode, 0, 6);

        $query = "
                SELECT ncsCode, coefficient FROM nynNcsCode
                WHERE ncsCode LIKE '$searchCode%' AND applyDate = '$date'
            ";
        $result = mysql_query($query);
        $count = mysql_num_rows($result);
        if ($count > 0) {
            $ncsArray = array();
            while ($rs = mysql_fetch_array($result)) {
                $ncsArray[$rs['ncsCode']] = $rs['coefficient'];
            }
            if (array_key_exists($ncsCode, $ncsArray)) {
                return $ncsArray[$ncsCode];
            }

            if (array_key_exists($searchCode, $ncsArray)) {
                return $ncsArray[$searchCode];
            }
        }

        return 1;
    }

    /**
     * @return array
     */
    public function getContentsInfo($contentsCode)
    {
        if (empty($contentsCode)) {
            $contentsCode = $this->contentsCode;
        }
        $query = "
            SELECT ncsCode, dutyType2, contentsGrade, contentsTime, contentsType, sort01, selfPrice, SUBSTRING(passCode, 2, 6) as passCode
            FROM nynContents
            WHERE contentsCode = '$contentsCode'
        ";

        $result = mysql_query($query);
        $ncsCode = mysql_result($result, 0, 'ncsCode');
        $dutyType2 = mysql_result($result, 0, 'dutyType2');
        $contentsGrade = mysql_result($result, 0, 'contentsGrade');
        $contentsTime = mysql_result($result, 0, 'contentsTime');
        $contentsType = mysql_result($result, 0, 'contentsType');
        $sort01 = mysql_result($result, 0, 'sort01');
        $selfPrice = mysql_result($result, 0, 'selfPrice');
        $passCode = mysql_result($result, 0, 'passCode');

        return [
            'ncsCode' => $ncsCode,
            'dutyType2' => $dutyType2,
            'contentsGrade' => $contentsGrade,
            'contentsTime' => $contentsTime,
            'contentsType' => $contentsType,
            'sort01' => $sort01,
            'selfPrice' => $selfPrice,
            'passCode' => $passCode
        ];
    }

    /**
     * 등급별 기준 가격
     * @param $contentsGrade
     * @return int
     */
    private function getGradePrice($contentsGrade)
    {
        switch ($contentsGrade) {
            case 'A':
                $price = 6160;
                break;

            case 'B':
                $price = 4180;
                break;

            case 'C':
                $price = 2970;
                break;
        }
        return $price;
    }

    /**
     * 적용 일자 기준 그룹
     * @return array
     */
    public function getApplyDateArr()
    {
        $query = "
            SELECT applyDate FROM nynNcsCode GROUP BY applyDate ORDER BY applyDate DESC;
        ";
        $result = mysql_query($query);

        $applyDateArr = array();
        while ($rs = mysql_fetch_object($result)) {
            $applyDateArr[] = $rs->applyDate;
        }

        return $applyDateArr;
    }
}

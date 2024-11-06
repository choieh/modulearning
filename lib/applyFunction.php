<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/lib/dbConnectNew.php';

function getApplySeq($companyCode, $contentsCode, $lectureStart, $lectureEnd, $serviceType)
{
    global $mysqli;

    try {
        $stmt = $mysqli->prepare('SELECT applySeq FROM nynCompanyApply WHERE companyCode = ? AND contentsCode = ? 
                                  AND lectureStart = ? AND lectureEnd = ? AND serviceType = ?');
        $stmt->bind_param('sssss', $companyCode, $contentsCode, $lectureStart, $lectureEnd, $serviceType);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $result->num_rows;

        if ($count == 0) {
            return null;
        }

        return $row['applySeq'];
    } catch (Exception $e) {
        return null;
    }

}

function setApplySeq($companyCode, $contentsCode, $lectureStart, $lectureEnd, $serviceType, $year)
{
    global $mysqli;

    try {
        $stmtMax = $mysqli->prepare("SELECT MAX(applySeq) as maxSeq FROM nynCompanyApply WHERE applySeq LIKE CONCAT(?, '%')");
        $stmtMax->bind_param('s', $year);
        $stmtMax->execute();
        $resultMax = $stmtMax->get_result();
        $rowMax = $resultMax->fetch_assoc();
        $applySeq = $rowMax['maxSeq'];

        if ($applySeq == null) {
            $applySeq = $year . 'R0000000';
        } else {
            $applySeq++;
        }

        $stmt = $mysqli->prepare('INSERT INTO nynCompanyApply 
            (applySeq, companyCode, contentsCode, lectureStart, lectureEnd, serviceType) 
            VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('ssssss', $applySeq, $companyCode, $contentsCode, $lectureStart, $lectureEnd, $serviceType);
        $result = $stmt->execute();

        if (!$result) {
            return false;
        }

        return $applySeq;
    } catch (Exception $e) {
        return false;
    }
}

function getContractSeq($companyCode, $year)
{
    global $mysqli;

    try {
        $stmt = $mysqli->prepare("SELECT contractSeq FROM nynCompanyContract WHERE companyCode = ? AND year = ? 
                                   AND contractTermination = 'N' ORDER BY contractSeq LIMIT 1");
        $stmt->bind_param('ss', $companyCode, $year);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $result->num_rows;

        if ($count == 0) {
            return null;
        }

        return $row['contractSeq'];
    } catch (Exception $e) {
        return null;
    }
}

function getLectureOpenSeq($lectureStart, $lectureEnd, $contentsCode, $serviceType, $openChapter = 1)
{
    global $mysqli;

    $whereArr = [];
    $valueArr = [];

    if (!empty($lectureStart)) {
        $whereArr[] = 'lectureStart = ?';
        $valueArr[] = $lectureStart;
    } else {
        return null;
    }

    if (!empty($lectureEnd)) {
        $whereArr[] = 'lectureEnd = ?';
        $valueArr[] = $lectureEnd;
    } else {
        return null;
    }

    if (!empty($contentsCode)) {
        $whereArr[] = 'contentsCode = ?';
        $valueArr[] = $contentsCode;
    } else {
        return null;
    }

    if (!empty($serviceType)) {
        $whereArr[] = 'serviceType = ?';
        $valueArr[] = $serviceType;
    } else {
        return null;
    }

    $whereArr[] = 'openChapter = ?';
    $valueArr[] = $openChapter;


    try {
        $stmt = $mysqli->prepare('SELECT seq FROM nynLectureOpen WHERE ' . implode(' AND ', $whereArr));
        $stmt->bind_param('sssss', ...$valueArr);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $result->num_rows;

        if ($count == 0) {
            return null;
        }

        return $row['seq'];
    } catch (Exception $e) {
        return null;
    }

}

function setLectureOpenSeq($lectureStart, $lectureEnd, $contentsCode, $serviceType, $openChapter = 1)
{
    global $mysqli;

    try {
        $stmt = $mysqli->prepare('INSERT INTO nynLectureOpen
        (lectureStart, lectureEnd, contentsCode, serviceType, openChapter)
        VALUES (?, ?, ?, ?, ?)');

        $stmt->bind_param('sssss', $lectureStart, $lectureEnd, $contentsCode, $serviceType, $openChapter);
        $result = $stmt->execute();

        if (!$result) {
            return false;
        }

        return $stmt->insert_id;
    } catch (Exception $e) {
        return false;
    }
}

// 등록된 수강인지 확인
function isExistStudy($studyKey)
{
    global $mysqli;

    $stmt = $mysqli->prepare('SELECT 1 FROM nynStudy WHERE studyKey = ?');
    $stmt->bind_param('s', $studyKey);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->num_rows;

    if ($count == 0) {
        return false;
    }

    return true;

}


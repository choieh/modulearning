<? include '../lib/header.php'; ?>
<?php
error_reporting(E_ALL & ~E_NOTICE);
ini_set("display_errors", 1);
		header("Content-Encoding: utf-8");

    require_once '../lib/PHPExcel/Classes/PHPExcel.php';
    $objPHPExcel = new PHPExcel(); 

	$sheet = $objPHPExcel->getActiveSheet();
	$sheet->getDefaultStyle()->getFont()->setName('맑은 고딕'); // 폰트
	$sheet->getDefaultStyle()->getFont()->setName('맑은 고딕')->setSize(11); // 폰트 크기
	$sheet->getColumnDimension('A')->setWidth(9);
	$sheet->getColumnDimension('B')->setWidth(12);
	$sheet->getColumnDimension('C')->setWidth(13);
	$sheet->getColumnDimension('D')->setWidth(12);
	$sheet->getColumnDimension('E')->setWidth(57);
	$sheet->getColumnDimension('F')->setWidth(83);
	$sheet->getColumnDimension('G')->setWidth(9);
	$sheet->getColumnDimension('H')->setWidth(9);
	$sheet->getColumnDimension('I')->setWidth(9);
	$sheet->getColumnDimension('J')->setWidth(9);
	$sheet->getColumnDimension('K')->setWidth(12);
	$sheet->getColumnDimension('L')->setWidth(15);
	$sheet->getColumnDimension('M')->setWidth(15);
	$sheet->getColumnDimension('N')->setWidth(15);
	$sheet->getColumnDimension('O')->setWidth(15);
	$sheet->getColumnDimension('P')->setWidth(15);
	$sheet->getColumnDimension('Q')->setWidth(15);
	$sheet->getColumnDimension('R')->setWidth(15);
	$sheet->getColumnDimension('S')->setWidth(15);
	$sheet->getColumnDimension('T')->setWidth(15);
	$sheetIndex = $objPHPExcel->setActiveSheetIndex(0);

	//엑셀 항목 출력
	$sheetIndex ->setCellValue('A1',$_siteName.' 교육과정 목록')
							->mergeCells('A1:T1')
							->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->setCellValue('A2','(홈페이지) http://'.$_siteURL.' / (전화) '.$_csPhone.' / (팩스) '.$_csFax.' / (수강신청 이메일) '.$_studyMail)
							->mergeCells('A2:T2')
							->getStyle('A2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->getCell('A2')
							->getHyperlink()
							->setUrl('http://'.$_siteURL);
	$sheetIndex ->setCellValue('A3','과정번호')
							->mergeCells('A3:A4')
							->getStyle('A3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('B3','대분류')
							->mergeCells('B3:B4')
							->getStyle('B3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('C3','소분류')
							->mergeCells('C3:C4')
							->getStyle('C3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('D3','직무 관련성 (대상 한정)')
							->mergeCells('D3:D4')								
							->getStyle('D3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->getActiveSheet()->getStyle('D3')->getAlignment()->setWrapText(true)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('E3','훈련 대상')
							->mergeCells('E3:E4')
							->getStyle('E3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


	$sheetIndex ->setCellValue('F3','과정명')
							->mergeCells('F3:F4')
							->getStyle('F3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('G3','상세보기')
							->mergeCells('G3:G4')
							->getStyle('G3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('H3','과정코드')
							->mergeCells('H3:H4')
							->getStyle('H3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('I3','차시분량')
							->mergeCells('I3:I4')
							->getStyle('I3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('J3','교육시간')
							->mergeCells('J3:J4')
							->getStyle('J3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

	$sheetIndex ->setCellValue('K3','교육비')
							->mergeCells('K3:K4')
							->getStyle('K3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

	$sheetIndex ->setCellValue('L3','우선지원기업')
							->mergeCells('L3:M3')
							->getStyle('L3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

	$sheetIndex ->setCellValue('N3','대규모(1000인 미만)기업')
							->mergeCells('N3:O3')
							->getStyle('N3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
							
	$sheetIndex ->setCellValue('P3','대규모(1000인 이상)기업')
							->mergeCells('P3:Q3')
							->getStyle('P3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

	$sheetIndex ->setCellValue('R3','스마트러닝')
							->mergeCells('R3:R4')
							->getStyle('R3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('S3','인정만료일')
							->mergeCells('S3:S4')
							->getStyle('S3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('T3','수강방법')
							->mergeCells('T3:T4')
							->getStyle('T3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)
							->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheetIndex ->setCellValue('L4','정부지원금')
							->getStyle('L4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->setCellValue('M4','자부담금')
							->getStyle('M4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->setCellValue('N4','정부지원금')
							->getStyle('N4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->setCellValue('O4','자부담금')
							->getStyle('O4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->setCellValue('P4','정부지원금')
							->getStyle('P4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheetIndex ->setCellValue('Q4','자부담금')
							->getStyle('Q4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

	$query = "SELECT A.*,B.value02 AS cate01, C.value02 AS cate02
						FROM nynContents AS A
						LEFT OUTER
						JOIN nynCategory AS B ON A.sort01=B.value01
						LEFT OUTER
						JOIN nynCategory AS C ON A.sort02=C.value01
						WHERE A.enabled='Y' ORDER BY A.sort01, A.sort02";
	$result = mysql_query($query);
	$count = mysql_num_rows($result);
	$b = 5;

	//엑셀 데이터 출력
	while($rs = mysql_fetch_array($result)) {
		if($rs[mobile] == 'Y' && $rs[cate01] != '산업안전' ) {
			$mobile = '지원';
		} else {
			$mobile = '미지원';
		}
		if($rs[dutyType] == "Y"){
			$dutyType = "O";
			$target = $rs[target];
		}else{
			$dutyType = "";
			$target = "";
		}

		if($rs[serviceType] == 1){
			$serviceType = "사업주(환급)";
		} else if($rs[serviceType] == 3){
			$serviceType = "일반(비환급)";
		} else {
			$serviceType = "수강연동";
		}

		$sheetIndex ->setCellValue('A'.$b, $rs[seq])
								->getStyle('A'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('B'.$b, $rs[cate01])
								->getStyle('B'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('C'.$b, $rs[cate02])
								->getStyle('C'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('D'.$b, $dutyType )
								->getStyle('D'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('E'.$b, $target);
		$sheetIndex ->setCellValue('F'.$b, $rs[contentsName]);
		$sheetIndex ->setCellValue('G'.$b, "클릭보기")
								->getStyle('G'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex	->getCell('G'.$b)
								->getHyperlink()
								->setUrl('http://'.$_siteURL.'/lecture/?seq='.$rs[seq]);
		$sheetIndex ->setCellValue('H'.$b, $rs[contentsCode])
								->getStyle('H'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('I'.$b, $rs[chapter])
								->getStyle('I'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('J'.$b, $rs[contentsTime])
								->getStyle('J'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('K'.$b, number_format($rs[selfPrice])."원")
								->getStyle('K'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('L'.$b, number_format($rs[rPrice01])."원")
								->getStyle('L'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('M'.$b, number_format($rs[selfPrice01])."원")
								->getStyle('M'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('N'.$b, number_format($rs[rPrice02])."원")
								->getStyle('N'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('O'.$b, number_format($rs[selfPrice02])."원")
								->getStyle('O'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('P'.$b, number_format($rs[rPrice03])."원")
								->getStyle('P'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('Q'.$b, number_format($rs[selfPrice03])."원")
								->getStyle('Q'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('R'.$b, $mobile)
								->getStyle('R'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('S'.$b, $rs[contentsExpire])
								->getStyle('S'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheetIndex ->setCellValue('T'.$b, $serviceType)
								->getStyle('T'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		//$sheetIndex ->getStyle('L'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$b++;
	}

	$sheetIndex ->setCellValue('A'.$b,'과정목록은 '.substr($inputDate,0,10).' 기준이며 상황에 따라 변동될 수 있습니다.')
							->mergeCells('A'.$b.':'.'T'.$b)
							->getStyle('A'.$b)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheet->getStyle('A1:T'.$b)->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

	$fileName = iconv("utf-8","euc-kr","모두의러닝_과정목록(".date("Y-m-d").").xls");
	header('Content-Type: application/vnd.ms-excel');
	header('Content-Disposition: attachment;filename='.$fileName);
    header('Cache-Control: max-age=0');
 
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter ->save('php://output');
 
    exit;
?>
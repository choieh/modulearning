var isCustomIDDuplicate = false;
var studentIndex = 0; // studentIndex 변수를 전역에서 초기화

function listAct(){
    writeAct();
}

// 게시판 보기 스크립트 시작
function writeAct(){    

	writePrint();
	
    // 게시판 생성
    function writePrint(){
		var writes = '';

		// 개별등록,수정
		writes += '<h2>수강 등록</h2>';
		writes += '<form class="writeform" method="post">';
		writes += '<div id="studentList" class="student-container">';
		
		// 기본 학생 폼 추가
		writes += getStudentFormHtml(studentIndex);
		studentIndex++; // 인덱스 증가

		writes += '</div>';
		writes += '<div class="btnArea">';
		writes += '<button type="button" id="registerBtn" onClick="checkStudyForm()">등록하기</button>';
		writes += '<button type="button" onClick="resetInput()">초기화</button>';
		writes += '<button type="button" onClick="addStudent()">추가</button>';
		writes += '</div>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
		writes += '</form>';

		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		pickerAct(); // 데이피커 사용
		daysInsert(); // select box 항목 삽입
	}
}

function daysInsert() {
    var daysAdd = '';
    $.get('../api/apiOffDay.php', function(data) {
        $.each(data.days, function() {
            var lectureDay = new Date(this.educenterLectureDay);
            var today = new Date();
            var timeDiff = lectureDay.getTime() - today.getTime();
            var dayDiff = timeDiff / (1000 * 3600 * 24);
            if(dayDiff >= 4) {
                daysAdd += '<option value="' + this.contentsCode + '/' + this.educenterLectureDay + '/' + this.contentsName + '">' + this.contentsName + ' ( 교육일 : ' + this.educenterLectureDay + ')</option>';
            }
        });
        // 각 student-form의 select 요소에 항목 추가
        $('.student-form select[name*="[lectureDay]"]').each(function() {
            var currentVal = $(this).val();
            $(this).html(daysAdd);
            $(this).val(currentVal); // 이전 선택 상태 유지
        });
    });
}


// 수강 개별 등록
function writeStudy(){
    var sendData = $('.writeform').serialize();
    $.ajax({
        url: '../api/apiCustomPayManager.php',
        type: 'POST',
        data: sendData,
        dataType: 'json',
        success: function(data){
            if(data.result == 'success'){
                alert('등록되었습니다.');
                location.reload();
            } else {
                alert(data.result);
            }
        },
        fail: function(data){
            alert(data.result);
        }
    });
}

function resetInput(){
    $('.writeform')[0].reset(); // 폼을 초기 상태로 리셋
    $('#studentList').html(getStudentFormHtml(studentIndex)); // 기본 학생 폼으로 다시 설정
    daysInsert(); // select box 항목 삽입
    isCustomIDDuplicate = false; // 중복 체크 상태 초기화
    studentIndex = 1; // 인덱스 초기화
}

function addStudent(){
    $('#studentList').append(getStudentFormHtml(studentIndex));
    studentIndex++; // 인덱스 증가
    daysInsert(); // select box 항목 삽입
}

function removeStudent(studentId) {
    $(`#student-${studentId}`).remove();
}

// 지정아이디 중복 체크
function checkCustomIDAvailability(element) {
    var customID = $(element).val();
    var $currentInput = $(element); // 현재 입력 필드
    var $message = $currentInput.siblings('.price');

    if (customID) {
        $.ajax({
            url: '../api/apiMember.php',
            type: 'PUT',
            data: { userID: customID },
            dataType: 'json',
            success: function(data) {
                $message.remove(); // 이전의 경고 메시지 제거
                
                if (data.result != 'success') {
                    $currentInput.after('<strong class="price">이미 사용 중인 아이디입니다.</strong>');
                    isCustomIDDuplicate = true; // 중복 상태 설정
                } else {
                    isCustomIDDuplicate = false; // 중복 상태 해제
                }
            },
            error: function() {
                alert('아이디 중복 체크 중 오류가 발생했습니다.');
            }
        });
    } else {
        $message.remove(); // 지정아이디가 비어있을 때 경고 메시지 제거
        isCustomIDDuplicate = false; // 중복 상태 해제
    }
}

function getStudentFormHtml(index) {
    var studentId = Date.now(); // 고유 ID 생성
    return `
        <div class="student-form" id="student-${studentId}">
            <div class="large">
                <h1>수강기간</h1>
                <select name="students[${index}][lectureDay]"></select>
            </div>
            <div>
                <h1>훈련생 이름</h1>
                <input name="students[${index}][userName]" type="text" placeholder="훈련생 이름" maxlength="50" />
            </div>            
            <div>
                <h1>직급</h1>
                <input name="students[${index}][position]" type="text" placeholder="직급" maxlength="50" />
            </div>
            <div>
                <h1>직무</h1>
                <input name="students[${index}][duty]" type="text" placeholder="직무" maxlength="50" />
            </div>
            <div>
                <h1>생년월일</h1>
                <input name="students[${index}][birthdate]" type="text" placeholder="YYMMDD" maxlength="6" />
            </div>
            <div>
                <h1>성별</h1>
                <select name="students[${index}][gender]">
                    <option value="">선택</option>
                    <option value="1">남</option>
                    <option value="2">여</option>
                </select>
            </div>
            <div>
                <h1>휴대전화</h1>
                <input name="students[${index}][mobile]" type="text" placeholder="010-1234-5678" oninput="formatPhoneNumber(this)" maxlength="13" />
            </div>
            <div>
                <h1>이메일</h1>
                <input name="students[${index}][email]" type="text" placeholder="example@domain.com" maxlength="100" />
            </div>
			<div>
                <h1>결제</h1>
                <select name="students[${index}][paymentType]">
                    <option value="card">카드</option>
                    <option value="bill">계산서</option>
                </select>
            </div>
            <div>
                <h1>지정아이디</h1>
                <input name="students[${index}][customID]" type="text" placeholder="지정아이디" maxlength="50" onblur="checkCustomIDAvailability(this)" />
            </div>
            <div>
                <button type="button" onclick="removeStudent(${studentId})">삭제</button>
            </div>
        </div>`;
}

// 입력폼 체크
function checkStudyForm(){
    $('.writeform strong.price').remove();
    var checkFalse = 0;

    $('.writeform input, .writeform select').each(function(){
        // 필수값 체크에서 customID는 제외
        var nameAttr = $(this).attr('name');
        if(!$(this).val() && nameAttr && !nameAttr.includes('[customID]')) {
            $(this).after('<strong class="price"> 이 필드를 입력해주세요.</strong>');
            checkFalse++;
        }
    });

    // 정규식 검사
    $('.writeform input[name="companyName"]').each(function(){        
        if($(this).val() == ''){
            $(this).after('<strong class="price"> 필수 입력 항목 입니다.</strong>');
            checkFalse++;
        }
    });

    $('.writeform input[name="birthdate"]').each(function(){
        var regex = /^\d{6}$/;
        if(!regex.test($(this).val())){
            $(this).after('<strong class="price"> YYMMDD 형식이어야 합니다.</strong>');
            checkFalse++;
        }
    });

    $('.writeform input[name="mobile"]').each(function(){
        var regex = /^01\d-\d{3,4}-\d{4}$/;
        if(!regex.test($(this).val())){
            $(this).after('<strong class="price"> 010-1234-5678 형식이어야 합니다.</strong>');
            checkFalse++;
        }
    });

    $('.writeform input[name="email"]').each(function(){
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test($(this).val())){
            $(this).after('<strong class="price"> 유효한 이메일 형식이어야 합니다.</strong>');
            checkFalse++;
        }
    });

    // 중복 아이디 상태 검사
    if (isCustomIDDuplicate) {
        alert('중복된 지정아이디가 있습니다. 확인 후 다시 시도해 주세요.');
        checkFalse++;
    }

    if(checkFalse == 0){
        writeStudy();
    }
}

function formatPhoneNumber(input) {
    input.value = input.value
        .replace(/[^0-9]/g, '')
        .replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
}

// CSS 스타일 추가
const style = `
    <style>
        .student-container {
            display: flex;
            flex-direction: column;
        }
        .student-form {
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #ddd;
            margin: 10px 0;
            padding: 10px;
            box-sizing: border-box;
        }
        .student-form div {
            flex: 0 0 8%; /* 각 항목을 가로로 배치 */
            margin: 10px;
        }
        .student-form div.large {
            flex: 1 0 11%; /* 수강기간 항목을 더 크게 */
        }
        .student-form h1 {
            font-size: 14px;
        }
        .student-form input, .student-form select {
            width: 100%;
            padding: 5px;
        }
        .student-form div:last-child {
            flex: 0 0 3%;
            align-self: center;
        }
		.student-form div button {
			height: 48px;
			margin: 0 5px;
			border: 1px solid #999;
			border-radius: 5px;
			background: #efefef;
			padding: 0 20px;
			font-weight: bold;
		}
        @media (max-width: 1200px) {
            .student-form div {
                flex: 1 0 30%; /* 더 작은 화면에서는 두 줄로 나열 */
            }
            .student-form div.large {
                flex: 1 0 45%;
            }
        }
        @media (max-width: 600px) {
            .student-form div {
                flex: 1 0 90%; /* 가장 작은 화면에서는 한 줄로 나열 */
            }
            .student-form div.large {
                flex: 1 0 90%;
            }
        }
    </style>
`;

$('head').append(style);

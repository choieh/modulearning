<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>모두의러닝</title>
    <link rel="shortcut icon" type="image/png" sizes="16x16"
        href="https://<?= $_SERVER['SERVER_NAME'] ?>/favicon/favicon-16x16M.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/css/video.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="/css/fontVideo.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="/css/swal.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="/dist/css/main.css?ver=<?= time() ?>">
    <!--    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>-->
    <script src="/js/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <div class="wrap">
        <div class="video-wrap">
            <div class="video">
                <div class="video-tit">
                    <button class="back" onclick="goStudyList()">
                        <img src="/plus/img/icon/back.png" alt="뒤로">
                    </button>
                    <h1 id="top_title">제목</h1>
                </div>
                <div class="video-in">
                    <div id="videoArea" style="position: relative;">
                        <!--   mp4  버튼   -->
                        <div class="next-btn"></div>
                    </div>
                </div>

            </div>
            <section class="video-tab">
                <div class="tab-wrap">
                    <ul class="tab-wrap-box">
                        <li class="tab01">
                            <h3 style="width:20%">과정소개</h3>
                            <ul class="video-tab-in">
                                <li>
                                    <p>기본정보</p>
                                    <strong id="side_title">제목</strong>
                                    <ul class="tab-in-txt" id="studyInfoUi">
                                        <li>
                                            <p>총시간 <span id="passTime">00:00:00</span></p>
                                        </li>
                                        <li>
                                            <p>학습시간 <span id="studyTime">00:00:00</span></p>
                                        </li>
                                        <li>
                                            <p>총진도 <span id="totalProgress">0%</span></p>
                                        </li>
                                        <li>
                                            <p>학습진도 <span id="progress">0%</span></p>
                                        </li>
                                    </ul>
                                    <div id="studyRule" class="text-blue-400"></div>
                                </li>
                                <li class="tab-btn">
                                    <ul>
                                        <li><strong id="countStudy"></strong><span>학습횟수</span></li>
                                        <li><strong id="countLike"></strong><span>좋아요</span></li>
                                        <li><strong id="heart" class="heart" data-id="">좋아요</strong>
                                            <span>좋아요</span>
                                        </li>
                                    </ul>
                                </li>
                                <li id="examArea"></li>
                                <li id="chapterList" class="flex flex-col gap-y-6"></li>
                            </ul>
                        </li>
                        <li class="tab02">
                            <h3 style="width:20%;left:20%">학습자료</h3>
                            <ul id="contentsFile" class="video-tab-in">
                                <li>
                                    <a href="#;">
                                        <p>학습자료다운로드</p>
                                        <img src="/plus/img/icon/downloads.png" alt="다운로드">
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="tab03">
                            <h3 style="width:20%;left:40%">학습노트</h3>
                            <div class="video-tab-in">
                                <div class="memo-app">
                                    <textarea id="memo-input" class="memo-input min-h-[200px] xl:min-h-[250px]
                                resize-none"></textarea>
                                    <button type="button" id="save-memo" onclick="saveMemo()">메모
                                        저장
                                    </button>

                                </div>
                                <div id="memo-list">
                                    <ul id="memo-save">
                                        <li class="memo-x">
                                            <p>저장된 메모가 없습니다.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="tab04">
                            <h3 style="width:20%;left:60%">1:1 문의</h3>
                            <div class="video-tab-in">
                                <form id="consultForm" class="memo-app">
                                    <input type="hidden" name="boardType" value="study">
                                    <input type="hidden" name="subject" value="">
                                    <div class="py-4">
                                        <div class="py-5 xl:text-2xl text-3xl">*문의 결과는 <strong>나의강의실-상담신청내역</strong>에서
                                            확인가능합니다.
                                        </div>
                                        <label for="consult">문의종류: </label>
                                        <select id="consult" name="consult" class="pr-8 pl-2 border border-black">
                                            <option value="">선택</option>
                                            <option value="learn">학습질의</option>
                                            <option value="contents">콘텐츠 오류</option>
                                            <option value="progress">진도율 관련</option>
                                            <option value="system">시스템 관련</option>
                                            <option value="test">평가 관련</option>
                                            <option value="pass">수료 관련</option>
                                            <option value="score">성적 이의신청</option>
                                            <option value="tendinous">건의사항</option>
                                            <option value="register">수강신청</option>
                                            <option value="etc">기타</option>
                                        </select>
                                    </div>
                                    <textarea id="consult-input" name="content"
                                        class="memo-input min-h-[200px] xl:min-h-[250px] resize-none"></textarea>
                                    <button type="button" id="save-consult" onclick="saveConsult()">문의하기</button>
                                </form>
                            </div>
                        </li>
                        <li class="tab05 chatbot active">
                            <h3 style="width:20%;left:80%">AI튜터</h3>
                            <div class="video-tab-in">
                                <div class="chat__banner">
                                    <img src="/images/study/img_moduri.png"
                                        alt="모두의교육그룹 챗봇 모두리입니다. 무엇이든 물어보시면 친절하게 알려드릴께요!">
                                </div>
                                <!-- 채팅 내용 -->
                                <div id="chat-container">
                                    <!-- 대화 내용이 여기에 표시됩니다 -->
                                </div>
                                <!-- 메시지 입력란 -->
                                <form id="chatForm">
                                    <ul id="chatForm--items" class="is-active">
                                        <li class="chatForm--item">
                                            <button type="button"
                                                class="chatForm--item-btn btn-primary">모두의러닝은?</button>
                                        </li>
                                        <li class="chatForm--item">
                                            <button type="button" class="chatForm--item-btn btn-primary">개인정보처리는
                                                어떻게하고있나요?</button>
                                        </li>
                                    </ul>
                                    <div id="chatForm--input">
                                        <input type="hidden" id="csrf_token"
                                            value="<?= htmlspecialchars($csrfToken) ?>">
                                        <textarea id="chat-input" placeholder="메시지를 입력하세요..."></textarea>
                                        <button type="button" id="send-chat" onclick="sendChat()">전송</button>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</body>

</html>

<script>
$(function() {
    $('.tab-wrap h3').on("click focus", function() {
        $('.tab-wrap li').removeClass("active");
        $(this).parent().addClass("active");
    });
})

makeEmonForm()

// 중복 로그인 체크
function overlap_loginchk() {
    $.ajax({
        url: '/api/crossLogin.php',
        dataType: 'JSON',
        success: function(data) {
            if (data.result != 'success') {
                alert(data.result);
                if (checkIfMobile()) {
                    window.location.replace(window.location.origin + '/m/login.php');
                } else {
                    if (window.location.hostname.split('.').length > 2) {
                        window.location.replace(window.location.origin + '/login.php');
                    } else {
                        window.location.replace(window.location.origin + '/member/index.php?pid=1');
                    }
                }
            }
        }
    })
    window.setTimeout("overlap_loginchk()", 100000);
}

/*
공통
 */
// parameter
const searchParam = new URLSearchParams(window.location.search);
const param = {
    'studySeq': searchParam.get('studySeq'),
    'contentsCode': searchParam.get('contentsCode'),
    'lectureOpenSeq': searchParam.get('lectureOpenSeq'),
    'userID': searchParam.get('userID'),
    'serviceType': searchParam.get('serviceType'),
}

const progressSegApi = '/api/v1/apiProgressSeg.php';
const studyInfoApi = '/api/v1/apiStudyInfo.php';
const chapterLikeApi = '/api/v1/apiChapterLike.php';
const progressApi = '/api/v1/apiProgress.php';
const checkTestApi = '/api/v1/apiCheckTest.php';
const memoApi = '/api/apiStudyNote.php';
const consultApi = '/api/apiConsult.php';

let memoObj = '';
let progressData = '';
let maxChapterSize = '';
let fileName = ''; // 현재 video src;
let progressTimeout = null; // 진도율 스케줄러
let timerTimeout = null; // 타이머 스케줄러
let currentUrl = '';
let frontUrl = '';
let totalTime = 0;
let currentPage = 0;
let highestPage = 0;
let startPos = '';
let countViolations = 0;
let distance = 0;
const pageObj = []; // 페이지 정보를 담는 객체 key: page, highestTime
let companyCode = null;


document.addEventListener('visibilitychange', tabVisibility);

// document.addEventListener('DOMContentLoaded', async () => {

//     const data = await fetch(studyInfoApi + window.location.search)
//         .then(res => {
//             if (!res.ok) {
//                 alert('수강 정보를 불러오는데 실패했습니다.');
//                 goStudyList();
//             }

//             return res.json();
//         })
//         .then(data => {
//             if (data.result == 'success') {
//                 progressData = data.message;
//                 companyCode = progressData.company.companyCode;

//                 if (param.serviceType == '5' && checkIfMobile()) {
//                     startTracking();
//                 }


//                 if (['1', '2'].includes(String(param.serviceType)) && progressData.progress.chapter %
//                     8 == 1) {
//                     if (checkIfMobile()) {
//                         sessionStorage.setItem('mobileLink', window.location.href);
//                     }

//                     const certInfo = sessionStorage.getItem(param.contentsCode + '_' + progressData
//                         .progress.chapter);

//                     if (certInfo != 'Y' || !/userCert/.test(document.referrer)) {
//                         document.removeEventListener('visibilitychange', tabVisibility);

//                         try {
//                             Swal.fire({
//                                 icon: 'info',
//                                 title: '환급 과정은 매 8차시마다 인증 후 수강 가능합니다.',
//                                 willClose: () => {
//                                     window.location.replace(`/auth/userCert.php?type=study&contentsCode=${param
//                       .contentsCode}&lectureOpenSeq=${param
//                       .lectureOpenSeq}&chapter=${progressData.progress.chapter}`)
//                                 }
//                             })
//                         } catch (e) {
//                             alert('환급 과정은 매 8차시마다 인증 후 수강 가능합니다.');
//                             window.location.replace(`/auth/userCert.php?type=study&contentsCode=${param
//                   .contentsCode}&lectureOpenSeq=${param
//                   .lectureOpenSeq}&chapter=${progressData.progress.chapter}`)
//                         }

//                         return;
//                     }
//                     sessionStorage.removeItem(param.contentsCode + '_' + progressData.progress.chapter);
//                 }

//                 // 차시 랜더링
//                 renderChapter(progressData);
//                 // renderRecommendContents(progressData);

//                 // 공통
//                 updateProgressText(progressData.progress.progress);
//                 updateTotalProgressText(progressData.study.progress);

//                 document.getElementById('top_title').innerText = progressData.contents.contentsName;
//                 document.getElementById('side_title').innerText = progressData.progress.chapter +
//                     '차시. ' +
//                     progressData.progress.chapterName;
//                 document.getElementById('passTime').innerText = progressData.progress.passTime;
//                 document.getElementById('countLike').innerText = progressData.chapterLike.chapterLike;
//                 document.getElementById('countStudy').innerText = progressData.progress.countStudy;

//                 if (param.serviceType == '5' && progressData.study.testStatus == 'C') {
//                     document.getElementById('studyInfoUi').insertAdjacentHTML('beforeend',
//                         '<li><p>평가점수 <span ' +
//                         `id="testScore">${progressData.study.testScore}점/100점</span></p></li>`)
//                 }

//                 if (progressData.contents.progressCheck == 'timeCheck') {
//                     document.getElementById('studyRule').innerHTML = '총시간만큼 학습해야 학습 진도율이 100% 반영됩니다.'
//                 }

//                 if (progressData.contents.progressCheck == 'pageCheck') {
//                     document.getElementById('studyRule').innerHTML =
//                         '총시간만큼 학습하고 마지막 페이���까지 수강해야<br> 학습 진도율이 100% ' +
//                         '반영됩니다.'
//                 }

//                 totalTime = progressData.progress.totalTime;

//                 if (['1', '2'].includes(String(param.serviceType))) {
//                     hrdCheckScore('study', 'S');
//                 }

//                 if (progressData.chapterLike.userLike == 1) {
//                     document.getElementById('heart').classList.add('active');
//                     document.getElementById('heart').dataset.id = progressData.chapterLike.seq;
//                 }

//                 // 평가 랜더링
//                 if (['1', '2', '5', '9', '10'].includes(String(param.serviceType))) {
//                     renderExam();
//                 } else {
//                     document.getElementById('examArea').remove();
//                 }

//                 if (progressData.contents.attachFile == null) {
//                     document.getElementById('contentsFile').innerHTML = `<li><p>학습자료가 없습니다.</p></li>`;
//                 }

//                 if (progressData.contents.attachFile != null) {
//                     document.getElementById('contentsFile').innerHTML = `<li>
//                            <a href="/lib/fileDownLoad.php?fileName=${encodeURI(progressData.contents.attachFileName)
//             }&link=${encodeURIComponent(progressData.contents.attachFile)}">
//                                <p>학습자료다운로드</p>
//                                <img src="/plus/img/icon/downloads.png" alt="다운로드">
//                            </a>
//                        </li>`;
//                 }

//                 if (param.serviceType == '5' || checkIfMobile()) {
//                     renderVideo(progressData);
//                     return;
//                 }

//                 if (progressData.contents.sourceType == 'html5') {
//                     renderHTML(progressData);
//                     return;
//                 }

//                 if (progressData.contents.sourceType == 'mp4') {
//                     renderVideo(progressData);
//                     return;
//                 }

//             }

//             if (data.result == 'error') {
//                 try {
//                     Swal.fire({
//                         icon: 'error',
//                         title: '오류가 발생했습니다.',
//                         willClose: () => {
//                             goStudyList()
//                         }
//                     })
//                 } catch (e) {
//                     alert('오류가 발생했습니다.')
//                     goStudyList()
//                 }

//             }

//             if (data.result == 'login') {
//                 try {
//                     Swal.fire({
//                         icon: 'info',
//                         title: '로그아웃 상태입니다. 재로그인 해주세요.',
//                         willClose: () => {
//                             if (checkIfMobile()) {
//                                 window.location.replace(window.location.origin +
//                                     '/m/login.php');
//                             } else {
//                                 if (window.location.hostname.split('.').length > 2) {
//                                     window.location.replace(window.location.origin +
//                                         '/login.php');
//                                 } else {
//                                     window.location.replace(window.location.origin +
//                                         '/member/index.php?pid=1');
//                                 }
//                             }
//                         }
//                     })
//                 } catch (e) {
//                     alert('로그아웃 상태입니다. 재로그인 해주세요.');
//                     if (checkIfMobile()) {
//                         window.location.replace(window.location.origin + '/m/login.php');
//                     } else {
//                         if (window.location.hostname.split('.').length > 2) {
//                             window.location.replace(window.location.origin + '/login.php');
//                         } else {
//                             window.location.replace(window.location.origin + '/member/index.php?pid=1');
//                         }
//                     }
//                 }

//             }

//             if (data.result == 'timeLimit') {
//                 try {
//                     Swal.fire({
//                         icon: 'warning',
//                         title: data.message,
//                         willClose: () => {
//                             goStudyList()
//                         }
//                     })
//                 } catch (e) {
//                     goStudyList()
//                 }

//             }
//         }).catch(error => {
//             alert('정보를 불러오는 중 오류가 발생했습니다.')
//             console.log(error);
//         })

//     renderMemo();
//     overlap_loginchk()
// })


document.getElementById('heart').addEventListener('click', throttle((e) => {
    if (e.target.dataset.id == '') {
        const formData = new FormData();
        formData.append('userID', param.userID);
        formData.append('contentsCode', progressData.contents.contentsCode);
        formData.append('chapter', progressData.progress.chapter);

        fetch(chapterLikeApi, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.result == 'success') {
                    e.target.dataset.id = data.seq;
                    e.target.classList.add('active');
                    document.getElementById('countLike').innerText = data.countLike;
                }

                if (data.result == 'error') {
                    try {
                        Swal.fire({
                            icon: 'error',
                            title: '오류가 발생했습니다.',
                        })
                    } catch (e) {
                        alert('오류가 발생했습니다.');
                    }

                }
            })
    } else {
        fetch(chapterLikeApi, {
                method: 'DELETE',
                body: `seq=${e.target.dataset.id}&contentsCode=${progressData.contents.contentsCode}&chapter=${progressData.progress.chapter}`
            })
            .then(res => res.json())
            .then(data => {
                if (data.result == 'success') {
                    e.target.dataset.id = '';
                    e.target.classList.remove('active');
                    document.getElementById('countLike').innerText = data.countLike;
                }

                if (data.result == 'error') {
                    try {
                        Swal.fire({
                            icon: 'error',
                            title: '오류가 발생했습니다.',
                        })
                    } catch (e) {
                        alert('오류가 발생했습니다.');
                    }
                }
            })
    }
}, 500));

function throttle(func, wait) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    }
}

function hrdCheckScore(types, flag) {
    let eval_cd = '';
    let hrdApi = '';
    if (['1', '2'].includes(String(param.serviceType))) {
        if (types == 'mid') {
            eval_cd = '04';
        } else if (types == 'final') {
            eval_cd = '02';
        } else if (types == 'report') {
            eval_cd = '03';
        } else if (types == 'study') {
            eval_cd = '01';
        }

        if (['1', '2'].includes(String(param.serviceType))) {
            hrdApi = '/api/apiHrdScoreCheck.php' + `?userID=${param.userID}&contentsCode=${param
          .contentsCode}&chapter=${progressData.progress.chapter}`;
        }

        fetch(hrdApi, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `startEnd=${flag}&contentsCode=${progressData.contents.contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&chapter=${progressData.progress.chapter}&eval_cd=${eval_cd}`,
            keepalive: true
        })

    }
}


function updateTotalProgressText(totalProgress) {
    document.getElementById('totalProgress').innerText = totalProgress + '%';
}

function updateProgressText(progress) {
    document.getElementById('progress').innerText = progress + '%';
    document.querySelector(`[data-id="${progressData.progress.chapter}"] > #chapterProgress`).innerText =
        '진도율: ' + progress + '%'
}

// 내 강의실로 돌아가기
function goStudyList() {
    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'));
}

// 어떤 플랫폼 접근이지 확인
function checkIfMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        return true;
    }

    if (/android/i.test(userAgent)) {
        return true;
    }

    if (/iPad|iPhone/.test(userAgent) && !window.MSStream) {
        return true;
    }
    return false;
}

// 브라우저 백그라운드 상태 확인
function tabVisibility() {
    currentVisibility = !document.hidden;

    if (!currentVisibility) {
        sendProgress('N');
        hrdCheckScore('study', 'E');

        if (typeof timerTimeout === 'number') {
            clearTimeout(timerTimeout);
            timerTimeout = null
        }
        clearTimeout(progressTimeout);
        progressTimeout = null
        document.getElementById('studyTime').innerText = '--:--:--';
    } else {
        setTimeout(() => {
            if (['1', '2'].includes(String(param.serviceType))) {
                hrdCheckScore('study', 'S');
            }

            if (progressTimeout == null) updateTimeout('N');

            setTimeout(() => {
                fetch(`${progressSegApi}?type=totalTime&seq=${progressData.progress.seq}&userID=${param
            .userID}&lectureOpenSeq=${param.lectureOpenSeq}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.result == 'success') {
                            totalTime = data.message;

                            if (timerTimeout == null) {
                                updateTimer();
                            }
                        }
                    })
            }, 500)
        }, 0)
    }
}

// 타이머 스케줄러
function updateTimer() {
    // 타이머 업데이트 시에 멈춤 상태면 스케줄러 초기화 2023.01.22 일단 주석
    // if (document.getElementById('video')) {
    //     if (document.getElementById('video').paused) {
    //         clearTimeout(progressTimeout);
    //         clearTimeout(timerTimeout);
    //         progressTimeout = null
    //         timerTimeout = null
    //         return;
    //     }
    // }
    totalTime++;
    var insertTime = new Date(totalTime * 1000).toISOString().slice(11, 19);
    document.getElementById('studyTime').innerText = insertTime;

    timerTimeout = setTimeout(() => {
        updateTimer();
    }, 1000)
}

// 진도율 스케줄러
function updateTimeout(isOpen) {
    sendProgress(isOpen);
    progressTimeout = setTimeout(() => {
        updateTimeout('N')
    }, 10000);
}

// 진도율 전송
async function sendProgress(isOpen) {
    const contentsCode = progressData.contents.contentsCode;
    const progressSeq = progressData.progress.seq;
    const chapter = progressData.progress.chapter;
    const url = progressApi + window.location.search;

    const formData = new FormData();
    formData.append('open', isOpen);
    formData.append('progressSeq', progressSeq);
    formData.append('chapter', chapter);
    formData.append('contentsCode', contentsCode);


    if (document.getElementById('video')) {
        formData.append('lastPage', document.getElementById('video').src);
        formData.append('lastTimeCursor', Math.floor(document.getElementById('video').currentTime));
        formData.append('duration', Math.floor(document.getElementById('video').duration));
        formData.append('sourceType', 'mp4');
    }

    if (document.getElementById('frame')) {
        formData.append('lastPage', document.getElementById('frame').src);
        formData.append('sourceType', 'html');
    }

    fetch(url, {
            method: 'POST',
            body: formData,
            keepalive: true,
        })
        .then(res => {
            if (!res.ok) {
                alert('진도율 반영에 오류가 발생했습니다.');
                goStudyList();
            }

            return res.json()
        })
        .then(data => {
            if (data.result == 'error') {
                alert('진도율 반영에 오류가 발생했습니다.');
                goStudyList();
            }

            if (data.result == 'duplication') {
                clearTimeout(progressTimeout);
                clearTimeout(timerTimeout);
                document.removeEventListener('visibilitychange', tabVisibility);
                if (document.getElementById('video')) {
                    document.getElementById('video').pause();
                }

                try {
                    Swal.fire({
                        icon: 'info',
                        title: '한 과정만 수강 가능합니다.',
                        willClose: () => {
                            goStudyList();
                        }
                    })
                } catch (e) {
                    alert('한 과정만 수강 가능합니다.');
                    goStudyList();
                }

            }

            if (data.result == 'login') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '로그아웃 상태입니다. 로그인 후 이용해주세요.',
                        willClose: () => {
                            if (checkIfMobile()) {
                                window.location.replace(window.location.origin + '/m/login.php');
                            } else {
                                if (window.location.hostname.split('.').length > 2) {
                                    window.location.replace(window.location.origin + '/login.php');
                                } else {
                                    window.location.replace(window.location.origin +
                                        '/member/index.php?pid=1');
                                }
                            }
                        }
                    })
                } catch (e) {
                    alert('로그아웃 상태입니다. 로그인 후 이용해주세요.')
                    if (checkIfMobile()) {
                        window.location.replace(window.location.origin + '/m/login.php');
                    } else {
                        if (window.location.hostname.split('.').length > 2) {
                            window.location.replace(window.location.origin + '/login.php');
                        } else {
                            window.location.replace(window.location.origin + '/member/index.php?pid=1');
                        }
                    }
                }

            }

            if (data.result == 'timeLimit') {
                try {
                    Swal.fire({
                        icon: 'info',
                        title: data.message,
                        willClose: () => {
                            goStudyList();
                        }
                    })
                } catch (e) {
                    alert(data.message);
                    goStudyList();
                }

            }

            if (data.result == 'success') {
                if (data.message == 'update progress') {
                    updateProgressText(data.progress);
                    updateTotalProgressText(data.totalProgress);
                }
            }
        })
}

function moveChapter(link, chapter) {
    fetch(`${progressSegApi}?type=checkProgress&chapter=${chapter}&contentsCode=${param
      .contentsCode}&userID=${param.userID}&lectureOpenSeq=${param.lectureOpenSeq}&serviceType=${param.serviceType}`)
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                window.location.replace('/study/studyView.php?' + link);
            }

            if (data.result == 'error') {
                if (data.message == 'progress') {
                    try {
                        Swal.fire({
                            icon: 'warning',
                            title: '이전 차시 진도율이 100%가 아닙니다.',
                        })
                    } catch (e) {
                        alert('이전 차시 진도율이 100%가 아닙니다.')
                    }

                }

                if (data.message == 'fulfil') {
                    try {
                        Swal.fire({
                            icon: 'info',
                            title: '환급 과정은 하루에 8차시 수강 가능합니다.',
                        })
                    } catch (e) {
                        alert('환급 과정은 하루에 8차시 수강 가능합니다.');
                    }

                }

                if (data.message == 'midTest') {
                    try {
                        Swal.fire({
                            icon: 'info',
                            title: '중간평가 응시 후 수강 가능합니다.',
                        })
                    } catch (e) {
                        alert('중간평가 응시 후 수강 가능합니다.')
                    }

                }

            }
        })
}

// 사이드 차시 랜더링
function renderChapter() {
    let lists = '';
    lists += `<strong id="side_title">차시 보기</strong>`;
    progressData.chapter.forEach(c => {
        let href =
            `studySeq=${param.studySeq}&contentsCode=${param.contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&userID=${param.userID}&serviceType=${param.serviceType}&chapter=${c.chapter}`;
        lists += `<div class="flex justify-between gap-x-4 bg-white p-2 rounded-md">
                <div class="flex flex-col gap-y-2 w-2/3">
                <a class="truncate">${c.chapter}. ${c.chapterName}</a>
                <p class="text-gray-400" data-id="${c.chapter}">
                    <span>${c.chapterTime ? makeTimeString(c.chapterTime) : progressData.progress.passTime}</span> /
                    <span id="chapterProgress">진도율: ${c.progress ?? 0}%</span>
                </p>
                </div>`;
        if (progressData.progress.chapter == c.chapter) {
            lists += `<button class="bg-gray-300 rounded-md px-2">수강하기</button>`
        } else {
            lists += `<button class="bg-[#F6B618] rounded-md px-2  cursor-pointer" onclick="moveChapter('${href}', '${c.chapter}')
            ">수강하기</button>`
        }


        lists += '</div>';
    })

    document.getElementById('chapterList').innerHTML = lists;
}

//현재 사용안함 24.02.02
function renderRecommendContents(a) {
    let lists = '';

    if (param.serviceType != 4) {
        lists = `<li><span>추천 콘텐츠</span><div class="py-5"></div><div class="bg-white rounded-md p-2">추천 콘텐츠가 없습니다
            .</div></li>`;
    } else {
        lists = `<li>
                    <span>추천 콘텐츠</span>
                    <div class="py-5"></div>
                    <div class="bg-white rounded-md flex">
                    <img src="../attach/contents/Python을 활용한 빅데이터 분석과 시각화.jpg" class="w-[100px]">
                    <span class="px-2">Python을 활용한 빅데이터 분석과 시각화</span>
                    </div>
                    <div class="py-5"></div>
                    <div class="bg-white rounded-md flex">
                    <img src="../attach/contents/01_35_07.jpg" class="w-[100px]">
                    <span class="px-2">인공지능을 스마트하게 만드는 기술, 빅데이터</span>
                    </div>
                    <div class="bg-white rounded-md flex">
                    <img src="../attach/contents/01_35_02.jpg" class="w-[100px]">
                    <span class="px-2">구글의 머신러닝, 혁신을 거듭하다</span>
                    </div>
                    </li>`;
    }

    // document.getElementById('contentsList').innerHTML = lists;
}

function statusNtext() {
    return `<span class='text-red-600 text-2xl'>미응시</span>`;
}

function statusVtext() {
    return `<span class='text-blue-600 text-2xl'>응시중</span>`;
}

function statusTimeOverText() {
    return `<span class='text-blue-600 text-2xl'>시간 만료</span>`;
}

function statusYtext() {
    return `<span class='text-green-600 text-2xl'>채점대기중</span>`;
}

function statusCtext() {
    return `<span class='text-green-600 text-2xl'>응시완료</span>`;
}

function statusNullText() {
    return `<span class='text-black text-2xl'>평가없음</span>`;
}

// 평가 랜더링
function renderExam() {
    let lists = '';
    lists += '<strong id="side_title">평가보기</strong>';
    lists += `<div class='flex justify-start gap-x-4'>`;
    lists += `<div class='bg-white w-1/3 h-fit text-2xl text-gray-700 p-2 rounded-md text-center'>`;
    lists += `<div>중간평가<br>`;
    if (progressData.study.midStatus == 'N' && progressData.contents.countMidExam > 0) {
        lists += statusNtext();
    }

    if (progressData.study.midStatus == 'V') {
        lists += statusVtext();
    }

    if (progressData.study.midStatus == 'C' || progressData.study.midStatus == 'Y') {
        lists += statusCtext();
    }

    if (progressData.study.midStatus == null || progressData.contents.countMidExam == 0) {
        lists += statusNullText();
    }
    lists += '</div>';

    if (['N', 'V'].includes(progressData.study.midStatus) && progressData.contents.countMidExam > 0) {
        lists += `<button class="bg-[#F6B618] p-2 rounded-md" onclick="goExam('mid')">평가보기</button>`;
    }

    lists += '</div>';


    lists += `<div class='bg-white w-1/3 h-fit text-2xl text-gray-700 p-2 rounded-md
            text-center'>`;
    lists += `<div>최종평가<br>`;
    if (progressData.study.testStatus == 'N' && progressData.contents.countFinalExam > 0) {
        lists += statusNtext();
    }

    if (progressData.study.testStatus == 'V') {
        if (progressData.study.testOverTime == 'Y') {
            lists += statusTimeOverText();
        } else {
            lists += statusVtext();
        }
    }

    if (progressData.study.testStatus == 'Y') {
        lists += statusYtext();
    }

    if (progressData.study.testStatus == 'C') {
        lists += statusCtext();
    }

    if (progressData.study.testStatus == null || progressData.contents.countFinalExam == 0) {
        lists += statusNullText();
    }

    lists += '</div>';
    if (param.serviceType == '5' &&
        progressData.contents.passScore > progressData.study.testScore &&
        (['C'].includes(progressData.study.testStatus) || (progressData.study.testStatus == 'V' && progressData.study
            .testOverTime == 'Y'))) {

        lists += setRetakenBtn('test', progressData.study.seq, progressData.company.retakenWay);
    } else if (['N', 'V'].includes(progressData.study.testStatus) && progressData.contents.countFinalExam > 0) {
        lists += `<button class="bg-[#F6B618] p-2 rounded-md" onclick="goExam('final')">평가보기</button>`;
    }
    lists += '</div>';


    lists += `<div class='bg-white w-1/3 h-fit text-2xl text-gray-700 p-2 rounded-md text-center'>`;
    lists += `<div>과제평가<br>`;
    if (progressData.study.reportStatus == 'N' && progressData.contents.countReportExam > 0) {
        lists += statusNtext();
    }

    if (progressData.study.reportStatus == 'V') {
        lists += statusVtext();
    }

    if (progressData.study.reportStatus == 'Y') {
        lists += statusYtext();
    }

    if (progressData.study.reportStatus == 'C') {
        lists += statusCtext();
    }

    if (progressData.study.reportStatus == null || progressData.contents.countReportExam == 0) {
        lists += statusNullText();
    }

    lists += '</div>';

    if (['N', 'V'].includes(progressData.study.reportStatus) && progressData.contents.countReportExam > 0) {
        lists += `<button class="bg-[#F6B618] p-2 rounded-md" onclick="goExam('report')">평가보기</button>`;
    }

    lists += '</div>';

    lists += '</div>';
    document.getElementById('examArea').innerHTML = '';
    document.getElementById('examArea').insertAdjacentHTML('beforeend', lists);
}

async function reRenderExam() {
    await fetch(studyInfoApi + window.location.search)
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                progressData = data.message;
                renderExam();
            }
        })
}

// 평가보러 가기
function goExam(type) {
    fetch(`${checkTestApi}?type=${type}&seq=${param.studySeq}`)
        .then(res => res.json())
        .then(data => {

            if (data.result == 'access') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '평가가 없는 과정입니다.'
                    })
                } catch (e) {
                    alert('평가가 없는 과정입니다.')
                }

            }

            if (data.result == 'already') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '이미 평가를 응시하셨습니다.'
                    })
                } catch (e) {
                    alert('이미 평가를 응시하셨습니다.');
                }

            }

            if (data.result == 'progress') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: `총 진도율 ${data.message}% 이상 응시 가능합니다.`,
                    })
                } catch (e) {
                    alert(`총 진도율 ${data.message}% 이상 응시 가능합니다.`)
                }

            }

            if (data.result == 'expired') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: `응시시간: ${data.message}<br>응시 시간이 지났습니다.`,
                    })
                } catch (e) {
                    alert(`응시시간: ${data.message}, 응시 시간이 지났습니다.`)
                }

            }

            if (data.result == 'cert') {
                try {
                    if (type == 'final' && progressData.study.survey == 'N') {
                        setEmonFormValue()
                        getSurveyChk(`/auth/userCert.php?type=${type}&contentsCode=${param
                .contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&chapter=${progressData.progress.chapter}`);
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: '인증 후 평가 응시 가능합니다.',
                            willClose: () => {
                                window.location.replace(`/auth/userCert.php?type=${type}&contentsCode=${param
                    .contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&chapter=${progressData.progress.chapter}`)
                            }
                        })
                    }

                } catch (e) {
                    if (type == 'final' && progressData.study.survey == 'N') {
                        setEmonFormValue()
                        getSurveyChk(`/auth/userCert.php?type=${type}&contentsCode=${param
                .contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&chapter=${progressData.progress.chapter}`);
                    } else {
                        alert('인증 후 평가 응시 가능합니다.')
                        window.location.replace(`/auth/userCert.php?type=${type}&contentsCode=${param
                .contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&chapter=${progressData.progress.chapter}`)
                    }

                }

            }

            if (data.result == 'success') {
                if (type == 'final' && progressData.study.survey == 'N' && progressData.study.serviceType == '1') {
                    setEmonFormValue()
                    getSurveyChk(
                        `/study/userTestPage.php?contentsCode=${param
              .contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&like=${type}&studySeq=${param.studySeq}&serviceType=${param.serviceType}`
                    )
                } else {
                    window.location.replace(
                        `/study/userTestPage.php?contentsCode=${param
              .contentsCode}&lectureOpenSeq=${param.lectureOpenSeq}&like=${type}&studySeq=${param.studySeq}&serviceType=${param.serviceType}`
                    )
                }

            }
        })
}

// 시간 변환
function makeTimeString(inputSeconds) {
    let hour = Math.floor(inputSeconds / 3600);
    let minutes = Math.floor((inputSeconds % 3600) / 60);
    let seconds = inputSeconds % 60;

    let hourString = (hour < 10) ? "0" + hour : hour;
    let minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let secondString = (seconds < 10) ? "0" + seconds : seconds;
    return hourString + ":" + minutesString + ":" + secondString;
}

/*
HTML
 */
function renderHTML(progressData) {
    const videoArea = document.getElementById('videoArea');
    const iframe = document.createElement('iframe');
    iframe.id = 'frame';
    iframe.src = progressData.progress.lastPage;
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay';
    if (progressData.contents.conWidth == 0) {
        iframe.width = '1024px';
    } else {
        iframe.width = progressData.contents.conWidth;
    }

    if (progressData.contents.conHeight == 0) {
        iframe.height = '724px';
    } else {
        iframe.height = progressData.contents.conHeight;
    }

    if (iframe.width > 1180) {
        sideMoveToBelow();
    }

    videoArea.insertAdjacentElement('afterbegin', iframe);
    iframe.onload = () => {
        // history.pushState({}, '', window.location.origin + sessionStorage.getItem('referrer'))
        // window.onpopstate = () => {
        //     location.href = window.location.origin + sessionStorage.getItem('referrer');
        // }

    }

    if (progressTimeout == null) {
        updateTimeout('Y'); // 진도율 반영 스케줄러
    }

    if (timerTimeout == null) {
        updateTimer(); // 학습시간 타이머
    }
}

// 사이드 메뉴 반응형처럼 아래로 내리기
function sideMoveToBelow() {
    document.querySelector('.video-wrap').style.flexWrap = 'wrap';
    document.querySelector('.video-wrap').style.alignContent = 'flex-start';
    document.querySelector('.video-wrap .video').style.width = '100%';
    document.querySelector('.video-tab').style.width = '100%';
    document.querySelector('.video-wrap .video .video-in').style.padding = '20px 0 50px';
    document.querySelector('.video-wrap .video .video-in').style.position = 'static';
    document.querySelector('.video-wrap .video .video-in').style.transform = 'translate(0, 0)';
    document.querySelector('.tab-wrap .active .video-tab-in').style.maxHeight = 'none';
    document.querySelector('.tab-wrap .active .video-tab-in').style.overflow = 'hidden';
    document.querySelector('.tab-wrap-box .video-tab-in > li').style.padding = '3%';
    document.querySelector('.tab-wrap-box .video-tab-in > li').style.margin = '3%';
}

/*
MP4
 */

// video tag render
function renderVideo(progressData) {
    let previousTime = 0;

    const videoArea = document.getElementById('videoArea');
    const btnDiv = document.querySelector('.next-btn');
    const video = document.createElement('video');
    video.id = 'video';

    if (['1898702199', '2148121976', '3108103219'].includes(companyCode)) {
        video.controlsList = 'nodownload noplaybackrate';
    } else {
        video.controlsList = 'nodownload';
    }

    video.src = progressData.progress.mobileLastPage;
    video.currentTime = progressData.progress.timeCursor;

    video.autoplay = true;
    video.controls = true;
    video.classList.add('border', 'border-gray-200');
    video.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
    videoArea.insertAdjacentElement('afterbegin', video);

    highestPage = progressData.progress.chapterPage;
    maxChapterSize = progressData.progress.chapterSize;

    if (progressData.progress.progress == 100) {
        highestPage = maxChapterSize;
    }

    currentUrl = video.src; // 현재 url
    frontUrl = currentUrl.split('/').filter(u => !u.includes('.mp4')).join('/'); // 영상을 제외한 url
    fileName = currentUrl.split('/').at(-1).split('.')[0];

    currentPage = getVideoPage();

    if (progressData.progress.chapterSize > 1) {
        let btn = '';
        btn += '<div class="flex justify-between w-full">';
        btn += '<button id="prev" class="bg-[#F6B618] py-3 w-1/3">이전</button>';
        btn += `<div class="text-center text-3xl w-1/4 py-3 rounded-sm bg-[#2c3e50] text-gray-50"><span
            id="currentPagePos">${Number(currentPage)}</span> / <span>${maxChapterSize}</span></div>`;
        btn += '<button id="next" class="bg-[#F6B618] py-3 w-1/3">다음</button>';
        btn += '</div>';
        btnDiv.insertAdjacentHTML('beforeend', btn);
    }

    initPageObj(progressData);

    if (param.serviceType == '5' || progressData.contents.progressCheck == 'pageCheck') {

        video.addEventListener('timeupdate', () => {
            if (!video.seeking) {
                previousTime = video.currentTime;
                const index = findPageObjIndex(Number(currentPage));

                if (index == -1) return;

                if (previousTime > pageObj[index].highestTime) {
                    pageObj[index].highestTime = previousTime;
                }

                if (video.currentTime == video.duration) {
                    sendProgress('N');
                }
            }

        })

        video.addEventListener('seeking', () => {
            const index = findPageObjIndex(Number(currentPage));

            if (index == -1) return;

            let diff = pageObj[index].highestTime - video.currentTime;

            if (diff < -1 && currentPage == highestPage) {
                video.currentTime = previousTime;
                try {
                    Swal.fire({
                        icon: 'info',
                        title: '학습한 시간 이후로는 재생할 수 없습니다.'
                    })
                } catch (e) {
                    alert('학습한 시간 이후로는 재생할 수 없습니다.')
                }

            }
        })
    }

    if (localStorage.getItem('moduVolume')) {
        video.volume = localStorage.getItem('moduVolume');
    }

    video.onvolumechange = (e) => {
        localStorage.setItem('moduVolume', video.volume);
    }


    video.addEventListener('ended', () => {
        // 자동재생
        if (progressData.contents.autoplay == 'Y') {
            if (progressData.progress.chapterSize > 1) {
                movePage('next');
            }
        }

    })

    video.addEventListener('play', () => {
        if (progressTimeout == null) {
            updateTimeout('Y'); // 진도율 반영 스케줄러
        }

        if (timerTimeout == null) {
            updateTimer(); // 학습시간 타이머
        }
    })

    // 다음
    if (document.getElementById('next')) {
        document.getElementById('next').addEventListener('click', () => {
            movePage('next');
        });
    }

    // 이전
    if (document.getElementById('prev')) {
        document.getElementById('prev').addEventListener('click', () => {
            movePage('prev');
        })
    }


}

function findPageObjIndex(searchPage) {
    return pageObj.findIndex(p => p.page == searchPage);
}

// 산업안전, 페이지체크 진도제어 초기��용
function initPageObj() {
    if (progressData.progress.progress == 100) {
        for (var i = 1; i <= highestPage; i++) {
            pageObj.push({
                'page': i,
                'highestTime': 6000
            });
        }
        return;
    }

    if (param.serviceType == '5' || progressData.contents.progressCheck == 'pageCheck') {
        for (var i = 1; i <= highestPage; i++) {
            if (i == currentPage) {
                pageObj.push({
                    'page': i,
                    'highestTime': progressData.progress.timeCursor
                });
            } else if (i < highestPage) {
                pageObj.push({
                    'page': i,
                    'highestTime': 6000
                });
            } else {
                pageObj.push({
                    'page': i,
                    'highestTime': 0
                });
            }
        }
        return;
    }
}

function addToPageObj(searchPage) {
    // pageObj에 없는 경우
    if (param.serviceType == '5' || progressData.contents.progressCheck == 'pageCheck') {
        let time = 0;

        if (currentPage < highestPage) {
            time = document.getElementById('video').duration;

            if (!pageObj.find(p => p.page == searchPage)) {
                pageObj.push({
                    'page': searchPage,
                    'highestTime': Number(time)
                })
            } else {
                const index = findPageObjIndex(searchPage);
                pageObj[index].highestTime = Number(time);
            }
        }

        if (currentPage >= highestPage) {
            if (!pageObj.find(p => p.page == searchPage)) {
                pageObj.push({
                    'page': searchPage,
                    'highestTime': 0
                })
            }
        }
    }
}

// 나눴을때 요소 값이 같은 경우가 있어서 분리
function excludeLastIndex(arr) {
    var tempArr = [];
    for (var i = 0; i < arr.length - 1; i++) {
        tempArr.push(arr[i])
    }
    tempArr.push('');
    return tempArr;
}

function setHighestPage() {
    if (Number(currentPage) > Number(highestPage)) {
        highestPage = currentPage;
    }
}

function getVideoPage() {
    let fileType = Number(fileName);

    if (/-|_/.test(fileName)) {
        const separator = fileName.includes('-') ? '-' : '_';
        let fileArr = fileName.split(separator);
        return Number(fileArr.at(-1));
    }

    if (Number.isNaN(fileType)) {
        return Number(fileName.match(/([a-zA-Z]+)(\d+)/)[2]);
    }

    // 파일명에 문자가 포함되지 않은 경우
    if (!Number.isNaN(fileType)) {
        if (fileName.length >= 4) {
            return fileName.slice(-2)
        }
    }

    return Number(fileName);
}

// 길이가 안맞는 경우 0 추가
function padZeroToName(beforeLen, afterLen, fileName) {
    if (afterLen < beforeLen) {
        fileName = String(fileName).padStart(beforeLen, '0');
    }
    return String(fileName);
}


function seperateFileName() {
    let fileType = Number(fileName);
    let nameLength = fileName.length;
    let newFileNum = '';

    // -,_ 특수문자가 들어가는 경우
    if (/-|_/.test(fileName)) {
        const separator = fileName.includes('-') ? '-' : '_';
        const fileArr = fileName.split(separator);
        const fileFront = excludeLastIndex(fileArr).join(separator);
        const fileBehind = fileArr.at(-1);

        return {
            'fileFront': String(fileFront),
            'fileBehindNum': Number(fileBehind),
            'fileName': String(fileBehind)
        };
    }

    // 문자가 들어가는 경우
    if (Number.isNaN(fileType)) {
        let fileArr = fileName.match(/([a-zA-Z]+)(\d+)/);
        let fileFront = fileArr[1];
        let fileBehind = fileArr[2];

        return {
            'fileFront': String(fileFront),
            'fileBehindNum': Number(fileBehind),
            'fileName': String(fileBehind)
        };
    }

    // 파일명에 문자가 포함되지 않은 경우
    if (!Number.isNaN(fileType)) {
        let fileFront = '';
        let fileBehind = fileName;
        if (fileName.length >= 4) {
            fileFront = fileName.slice(0, 2)
            fileBehind = fileName.slice(-2)
        }

        return {
            'fileFront': String(fileFront),
            'fileBehindNum': Number(fileBehind),
            'fileName': String(fileBehind)
        }
    }
}

// mp4 페이지 이동
function movePage(type) {
    let nameInfo = seperateFileName();
    let willMovePage = '';

    previousTime = 0;

    if (type == 'next') {
        if (maxChapterSize == Number(nameInfo.fileBehindNum)) {
            try {
                Swal.fire({
                    icon: 'warning',
                    title: '마지막 영상입니다.'
                });
            } catch (e) {
                alert('마지막 영상입니다.');
            }

            return;
        }

        if (param.serviceType == '5' || progressData.contents.progressCheck == 'pageCheck') {
            // let curPageHighestTime = pageObj.find(p => p.page === currentPage)
            if (highestPage < (currentPage + 1) && (Math.floor(video.currentTime) < Math.floor(video.duration))) {
                // console.log(pageObj.find(p => p.page === currentPage).highestTime)
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '현재 영상 수강 후 넘어갈 수 있습니다.',
                    });
                } catch (e) {
                    alert('현재 영상 수강 후 넘어갈 수 있습니다.')
                }

                return;
            }
        }

        currentPage = Number(currentPage) + 1;
        setHighestPage();
    }

    if (type == 'prev') {
        if (Number(nameInfo.fileBehindNum) == 1) {
            try {
                Swal.fire({
                    icon: 'warning',
                    title: '처음 영상입니다.'
                });
            } catch (e) {
                alert('처음 영상입니다.')
            }

            return;
        }
        currentPage = Number(currentPage) - 1;
    }

    document.getElementById('currentPagePos').innerText = currentPage;

    willMovePage = currentPage;
    let newFileName = padZeroToName(String(nameInfo.fileName).length, String(willMovePage).length,
        willMovePage);

    fileName = String(nameInfo.fileFront) + String(newFileName);
    document.getElementById('video').src = frontUrl + '/' + fileName + '.mp4';
    sendProgress('N');

    document.getElementById('video').addEventListener('loadeddata', () => {
        addToPageObj(willMovePage);
    }, {
        once: true
    })

}


// 산업안전 모바일용 함수 시작
let options = {
    enableHighAccuracy: false,
    timeout: 60000,
    maximumAge: 120000
};

function startTracking() {
    try {
        navigator.geolocation.getCurrentPosition(function(position) {
            if (!startPos) {
                startPos = position;
                return;
            }

            const lat1 = startPos.coords.latitude;
            const lon1 = startPos.coords.longitude;
            const lat2 = position.coords.latitude;
            const lon2 = position.coords.longitude;

            distance = calculateDistance(lat1, lon1, lat2, lon2);

            if (Math.floor(distance) >= 200) {
                startPos = position;
                countViolations++;
            }

            if (countViolations === 1 && Math.floor(distance) >= 200) {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        html: `이동 중에 수강 불가능합니다.<br>경고 누적시에 수강종료 됩니다.`,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                    })
                } catch (e) {
                    alert('이동 중에 수강 불가능합니다. 경고 누적시에 수강종료 됩니다.')
                }

            }

            if (countViolations === 2) {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        text: `경고 누적으로 수강종료 됩니다.`,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(trackingInterval);
                            window.location.replace(window.location.origin + sessionStorage.getItem(
                                'referrer'))
                        }
                    })
                } catch (e) {
                    alert('경고 누적으로 수강종료 됩니다.')
                    clearInterval(trackingInterval);
                    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
                }

            }

        }, function(error) {
            if (error.code === error.PERMISSION_DENIED) {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        html: '위치 권한 요청을 허용해야 합니다.<br>수강을 종료합니다.',
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(trackingInterval);
                            window.location.replace(window.location.origin + sessionStorage.getItem(
                                'referrer'))
                        }
                    })
                } catch (e) {
                    alert('위치 권한 요청을 허용해야 합니다. 수강을 종료합니다.')
                    clearInterval(trackingInterval);
                    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
                }

            } else if (error.code === error.POSITION_UNAVAILABLE) {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        html: '위치 정보 가져오는데 실패했습니다.<br>인터넷이 원할한 곳에서 다시 시도해주세요.',
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(trackingInterval);
                            window.location.replace(window.location.origin + sessionStorage.getItem(
                                'referrer'))
                        }
                    })
                } catch (e) {
                    alert('위치 정보 가져오는데 실패했습니다. 인터넷이 원할한 곳에서 다시 시도해주세요.')
                    clearInterval(trackingInterval);
                    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
                }

            } else if (error.code === error.TIMEOUT) {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        html: '시간이 초과되어 위치정보를 가져오지 못했습니다.<br>인터넷이 원할한 곳에서 다시 시도해주세요.',
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(trackingInterval);
                            window.location.replace(window.location.origin + sessionStorage.getItem(
                                'referrer'))
                        }
                    })
                } catch (e) {
                    alert('시간이 초과되어 위치정보를 가져오지 못했습니다. 인터넷이 원할한 곳에서 다시 시도해주세요.')
                    clearInterval(trackingInterval);
                    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
                }

            } else {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        html: '위치 정보를 가져오는데 오류가 발생했습니다.',
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(trackingInterval);
                            window.location.replace(window.location.origin + sessionStorage.getItem(
                                'referrer'))
                        }
                    })
                } catch (e) {
                    alert('위치 정보를 가져오는데 오류가 발생했습니다.')
                    clearInterval(trackingInterval);
                    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
                }

            }

        }, options);
        setTimeout(startTracking, 10000);
    } catch (e) {
        try {
            Swal.fire({
                icon: 'warning',
                title: '경고',
                html: e.message,
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                    clearInterval(trackingInterval);
                    window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
                }
            })
        } catch (e) {
            alert(e.message)
            clearInterval(trackingInterval);
            window.location.replace(window.location.origin + sessionStorage.getItem('referrer'))
        }

    }

}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const a1 = lat1 * Math.PI / 180;
    const a2 = lat2 * Math.PI / 180;
    const ca = (lat2 - lat1) * Math.PI / 180;
    const cd = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(ca / 2) * Math.sin(ca / 2) +
        Math.cos(a1) * Math.cos(a2) *
        Math.sin(cd / 2) * Math.sin(cd / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


function renderMemo() {
    fetch(memoApi + `?userID=${param.userID}&lectureOpenSeq=${param.lectureOpenSeq}`)
        .then(res => res.json())
        .then(data => {
            let memoList = '';
            if (data.totalCount > 0) {
                data.note.forEach(m => {
                    memoList += `<li id="${m.seq}" class="memo flex flex-col gap-4">
                        <div id="memo_${m.seq}" class="min-h-fit break-words">
                            ${m.content}
                        </div>
                        <div class="meno-btn">
                            <button type="button" onclick="editMemo(${m.seq})">수정</button>
                            <button type="button" onclick="deleteMemo(${m.seq})">삭제</button>
                        </div>
                    </li>`;
                })

                document.querySelector('.memo-app').style.display = 'none';
                document.getElementById('memo-save').innerHTML = memoList;
            } else {
                document.querySelector('.memo-app').style.display = 'block';
                document.getElementById('memo-save').innerHTML = '<li class="memo-x"><p>저장된 메모가 없습니다.</p></li>';
            }
        })
}

function saveMemo() {
    const memo = document.getElementById('memo-input');
    const formData = new FormData();

    formData.append('noteContent', memo.value);
    formData.append('lectureOpenSeq', param.lectureOpenSeq);

    fetch(memoApi + `?userID=${param.userID}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                try {
                    Swal.fire({
                        icon: 'success',
                        title: '저장됐습니다.',
                        willClose: () => {
                            memo.value = '';
                            renderMemo()
                        }
                    })
                } catch (e) {
                    alert('저장됐습니다.')
                    memo.value = '';
                    renderMemo()
                }

            }

            if (data.result == 'error') {
                try {
                    Swal.fire({
                        icon: 'info',
                        title: '오류가 발생했습니다.',
                    })
                } catch (e) {
                    alert('오류가 발생했습니다.')
                }

            }
        })
}

function editMemo(seq) {
    const memo = document.getElementById(seq);
    const memoText = document.getElementById(`memo_${seq}`).innerText;
    const memoHTML = memo.innerHTML;
    memoObj = memo.innerHTML;
    memo.innerHTML = `<textarea id="m${seq}_input" class="min-h-[200px] xl:min-h-[250px] p-2 border border-black
        rounded-md resize-none">${memoText}</textarea>
            <div class="meno-btn">
                <button type="button" onclick="updateMemo(${seq})">수정</button>
                <button type="button" onclick="cancelEdit(${seq})">취소</button>
            </div>
        `;
}

function updateMemo(seq) {
    const memo = document.getElementById(`m${seq}_input`).value
    const formData = new FormData();
    formData.append('noteContent', memo);
    formData.append('seq', seq);

    fetch(memoApi + `?userID=${param.userID}&lectureOpenSeq=${param.lectureOpenSeq}`, {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                try {
                    Swal.fire({
                        icon: 'success',
                        title: '수정되었습니다.',
                        didOpen: () => {
                            renderMemo();
                        }
                    })
                } catch (e) {
                    alert('수정되었습니다');
                    renderMemo();
                }

            }

            if (data.result == 'error') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '오류가 발생했습니다.',
                    })
                } catch (e) {
                    alert('오류가 발생했습니다.');
                }

            }
        })
}

function deleteMemo(seq) {
    const formData = new FormData();
    formData.append('seq', seq);
    formData.append('userID', param.userID);
    fetch(memoApi + `?userID=${param.userID}&lectureOpenSeq=${param.lectureOpenSeq}`, {
            method: 'DELETE',
            body: new URLSearchParams({
                'userID': param.userID,
                'seq': seq,
            }).toString(),
        })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                try {
                    Swal.fire({
                        icon: 'success',
                        title: '삭제되었습니다.',
                        didOpen: () => {
                            if (document.getElementById(seq)) {
                                document.getElementById(seq).remove();
                            }
                            renderMemo();
                        }
                    })
                } catch (e) {
                    alert('삭제되었습니다.')
                    if (document.getElementById(seq)) {
                        document.getElementById(seq).remove();
                    }
                    renderMemo();
                }

            }

            if (data.result == 'error') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '오류가 발생했습니다.',
                    })
                } catch (e) {
                    alert('오류가 발생했습니다.');
                }
            }
        })
}

function cancelEdit(seq) {
    const memo = document.getElementById(seq);
    memo.innerHTML = memoObj;
    memoObj = '';
}

function saveConsult() {
    const form = document.getElementById('consultForm');
    const consult = document.getElementById('consult');
    const consultInput = document.getElementById('consult-input');
    if (consult.value == '') {
        try {
            Swal.fire({
                icon: 'info',
                title: '문의 종류를 선택해주세요.'
            })
        } catch (e) {
            alert('문의 종류를 선택해주세요.')
        }

        return;
    }

    if (consultInput.value == '') {
        try {
            Swal.fire({
                icon: 'info',
                title: '문의 내용을 입력해주세요.'
            })
        } catch (e) {
            alert('문의 내용을 입력해주세요.')
        }

        return;
    }

    const formData = new FormData(form);
    formData.append('subject', `[${progressData.contents.contentsName}]과정 ${progressData.progress.chapter}차시
        질문입니다.`)

    // 학원연합회 문의
    if (['sjhy', 'cbhy', 'cnhy', 'djhy'].includes(window.location.hostname.split('.')[0])) {
        formData.append('flag', window.location.hostname.split('.')[0]);
    }

    fetch(consultApi, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json)
        .then(data => {
            if (data == 'error') {
                try {
                    Swal.fire({
                        icon: 'warning',
                        title: '오류가 발생했습니다.',
                    })
                } catch (e) {
                    alert('오류가 발생했습니다.');
                }
            } else {
                try {
                    Swal.fire({
                        icon: 'success',
                        title: '등록되었습니다.',
                    })
                } catch (e) {
                    alert('등록되었습니다');
                }

            }
        })
}

function retaken(userID, seq, testType, retakenWay) {
    let testTxt = testType == 'mid' ? '중간' : testType == 'test' ? '최종' : '과제'

    if (retakenWay == 0) {
        if (confirm(`${testTxt}평가를 재응시 하시겠습니까?`)) {
            $.ajax({
                url: '/api/apiStudyV1.php',
                type: 'POST',
                data: {
                    'userID': userID,
                    'seq': seq,
                    'retaken': 'Y',
                    'testType': testType
                },
                dataType: "text",
                success: function() {
                    alert('재응시 요청처리 되었습니다.');
                    reRenderExam();
                },
                fail: function() {
                    alert('변경실패.');
                }
            })
        }
    }


    if (retakenWay == 1) {
        if (confirm(`${testTxt}평가를 재응시 요청하시겠습니까?`)) {
            fetch('/api/apiStudyRetaken.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'userID': userID,
                        'studySeq': seq,
                        'testType': testType
                    }).toString()
                })
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    } else {
                        alert('요청에러')
                    }
                })
                .then(data => {
                    if (data.result == 0) {
                        alert('요청완료')
                    } else if (data.result == 1) {
                        alert('이미 요청되어 승인 대기중입니다. 문의사항은 기업의 교육담당자에게 연락바랍니다.')
                    } else {
                        alert('알 수 없는 에러')
                    }
                })
                .catch(e => console.log(e))
        }
    }
}

function setRetakenBtn(type, seq, retakenWay) {
    if (retakenWay == 0) {
        return `<button type="button" class="text-[14px] p-2 mr-0 bg-[#F6B618] rounded-md"
                onclick="retaken('${param.userID}','${seq}','${type}',${retakenWay})">재응시</button>`;
    }

    if (retakenWay == 1) {
        return `<button type="button" class="text-[14px] p-2 mr-0 bg-[#F6B618] rounded-md"
                onclick="retaken('${param.userID}','${seq}','${type}',${retakenWay})">재응시 요청</button></td>`;
    }
}

function makeEmonForm() {
    document.body.insertAdjacentHTML('beforeend',
        `<form name="frmData" id="frmData" method="post" target="emon" action="https://emon.hrdkorea.or.kr/common/SurveyEpTraPop">
            <input type="hidden" name="agent_pk" value="kiraedu">
            <input type="hidden" name="course_agent_pk" value="">
            <input type="hidden" name="class_agent_pk" value="">
            <input type="hidden" name="user_agent_pk" value="">
            <input type="hidden" name="tracse_id" value="">
            <input type="hidden" name="tracse_tme" value="">
        </form>`)
}

function setEmonFormValue() {
    document.querySelector('input[name="course_agent_pk"]').value = progressData.study.contentsCode
    document.querySelector('input[name="class_agent_pk"]').value = progressData.study.contentsCode + ',' +
        progressData.study.lectureOpenSeq
    document.querySelector('input[name="user_agent_pk"]').value = progressData.study.userID
    document.querySelector('input[name="tracse_id"]').value = progressData.contents.hrdCode
    document.querySelector('input[name="tracse_tme"]').value = progressData.study.openChapter
}

function getSurveyChk(redirectLink) {
    $.ajax({
        url: "https://emon.hrdkorea.or.kr/common/SurveyReponseChk",
        type: "post",
        data: $('#frmData').serialize(),
        dataType: "jsonp",
        jsonp: "reponseCallback",
        success: function(reponse) {
            var result = reponse.response_yn;
            if (result == "Y") {
                updateSurveyStatus(redirectLink)
            } else {
                alert("산업인력공단 규정으로 만족도 조사를 실시합니다.");
                openEmonSurvey();
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("오류 발생");
        }
    });
}

function openEmonSurvey() {
    window.open("", "emon", "width=960px,height=1000px,top=100,left=100, scrollbars=yes");
    var frmData = document.frmData;
    frmData.target = "emon";
    frmData.action = "https://emon.hrdkorea.or.kr/common/SurveyEpTraPop";
    frmData.submit();
}

function updateSurveyStatus(redirectLink) {
    const formData = new FormData();
    formData.append('userID', progressData.study.userID)
    formData.append('lectureOpenSeq', progressData.study.lectureOpenSeq)
    formData.append('survey', 'Y');


    fetch('/api/v1/apiSurveyStatus.php', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                window.location.href = redirectLink;
            } else {
                alert('오류가 발생했습니다.')
            }

        })

}

function sendChat() {
    const chatInput = document.getElementById('chat-input').value.trim();
    const chatContainer = document.getElementById('chat-container');
    const contentsCode = param.contentsCode; // 현재 콘텐츠 코드

    if (!chatInput) {
        alert('메시지를 입력해주세요.');
        return;
    }

    // 사용자 메시지 추가
    appendMessage(chatInput, 'user');

    // 입력 필드 초기화
    document.getElementById('chat-input').value = '';

    // 챗봇 응답 대기 메시지 추가
    const botTyping = appendMessage('AI 튜터가 답변을 작성 중입니다...', 'bot');

    // AJAX 요청
    $.ajax({
        url: '/chatbot/chatbot.php',
        method: 'POST',
        data: {
            question: chatInput,
            contentsCode: contentsCode
        },
        success: function(response) {
            let jsonResponse;
            try {
                // JSON 응답 파싱
                jsonResponse = JSON.parse(response);
            } catch (e) {
                console.error('응답이 JSON 형식이 아닙니다.', e);
                botTyping.querySelector('.message').textContent = '서버 응답 오류가 발생했습니다.';
                return;
            }

            // 응답 데이터 확인 및 메시지 출력
            if (jsonResponse.message) {
                botTyping.querySelector('.message').textContent = jsonResponse.message;
            } else {
                botTyping.querySelector('.message').textContent = '답변을 찾을 수 없습니다.';
            }
        },
        error: function() {
            // 에러 처리
            botTyping.querySelector('.message').textContent = '오류가 발생했습니다. 나중에 다시 시도해주세요.';
        },
    });
}



// 엔터 키 지원 추가
document.getElementById('chat-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // 줄바꿈 방지
        sendChat();
    }
});


function loadChatHistory() {
    const chatContainer = document.getElementById('chat-container');
    const contentsCode = param.contentsCode; // 현재 콘텐츠 코드

    // AJAX 요청으로 대화 데이터 가져오기
    $.ajax({
        url: '/chatbot/chatbot.php',
        method: 'POST',
        data: {
            action: 'getChatHistory',
            contentsCode: contentsCode
        },
        success: function(response) {
            const chatHistory = JSON.parse(response); // JSON 데이터를 파싱
            if (Array.isArray(chatHistory) && chatHistory.length > 0) {
                chatHistory.forEach(chat => {
                    appendMessage(chat.question, 'user');
                    appendMessage(chat.answer, 'bot');
                });
            } else {
                appendMessage('이전 대화 기록이 없습니다.', 'bot');
            }
        },
        error: function() {
            appendMessage('대화 기록을 불러오는 중 오류가 발생했습니다.', 'bot');
        }
    });
}

function appendMessage(message, type) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type === 'user' ? 'user' : 'bot'}`;

    // bot 타입일 때만 프로필 이미지 추가
    messageDiv.innerHTML = type === 'bot' ?
        `<div class="bot__profile"><img src="/images/study/img_chatbot.png" alt="모두리 프로필"></div>
            <div class="message">${message}</div>` :
        `<div class="message">${message}</div>`;

    chatContainer.appendChild(messageDiv);

    // 새로운 메시지 표시를 위해 스크롤 맨 아래로 이동
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return messageDiv;
}



// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', loadChatHistory);
</script>
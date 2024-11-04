<div id="LNB">
    <div class="menuArea">
        <h1>내 강의실<br/><span>Study Room</span></h1>
        <ul>
            <li onclick="top.location.href='/study/'">진행중인과정</li>
            <li onclick="top.location.href='/study/reTest.php'">재응시과정</li>
            <li onclick="top.location.href='/study/history.php'">학습종료과정</li>
            <li onclick="top.location.href='/study/studyOrder.php'">수강신청내역</li>
            <li onclick="top.location.href='/study/mantoman.php'">상담신청내역</li>
            <li onclick="top.location.href='/study/arguementSubject.php?boardCode=20'">토론게시판</li>
            <li onclick="top.location.href='/study/studyNote.php'">나만의 학습노트</li>
            <li onclick="top.location.href='/study/customPayList.php'">개인/추가 결제</li>
            <li onclick="top.location.href='/certify/index.php'">인증방법</li>
            <li onclick="top.location.href='/certify/ipin_certify.php'">아이핀 인증방법</li>
            <li onclick="top.location.href='/certify/ipin.php'">아이핀 발급방법</li>
        </ul>
    </div>
    <div class="quickHelp">
        <h1>Quick Menu</h1>
        <button type="button" onclick="helpDesk()"><img src="../images/global/btn_lnbhelp.png" alt="학습도움말"/><br/>학습도움말
        </button>
        <button type="button" onclick="window.open('https://939.co.kr/kiraedu')"><img
                    src="../images/global/btn_lnbremote.png" alt="원격지원"/><br/>원격지원
        </button>
        <!--<button type="button" onclick="alert('준비중입니다.')"><img src="../images/global/btn_lnbremote.png" alt="원격지원" /><br />원격지원</button>-->
    </div>
    <!--
      <div class="CSCenter">
        <h1>고객센터</h1>
        <h2></h2>
        <h3>팩 스 <strong></strong></h3>
        <ul>
          <li>
            <h1>운영시간</h1>
            <h2>
              평 &nbsp;일 09 : 00 ~ 18 : 00<br/>
              (점심시간 12 : 00 ~ 13 : 00)
            </h2>
          </li>
          <li>
            <h1><img src="/images/global/img_cscenter02.png" alt="문화가 있는날" style="margin-top:2px;"></h1>
            <h2>
              <strong>매월 마지막 수요일</strong><br/>
              09 : 00 ~ 14 : 00
            </h2>
          </li>
        </ul>
      </div>-->
    <? include '../include/csCenter.php' ?>
</div>

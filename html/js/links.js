
var links = { 
	//소개
	"/main/page.jsp?pid=intro.intro01" : { GNB : "GNB_INTRO" , LNB : "intro01" }
	, "/main/page.jsp?pid=intro.intro02" : { GNB : "GNB_INTRO" , LNB : "intro02" }
	, "/main/page.jsp?pid=intro.intro03" : { GNB : "GNB_INTRO" , LNB : "intro03" }
	, "/main/page.jsp?pid=intro.intro04" : { GNB : "GNB_INTRO" , LNB : "intro04" }
	, "/main/page.jsp?pid=intro.intro05" : { GNB : "GNB_INTRO" , LNB : "intro05" }
	, "/main/page.jsp?pid=intro.intro06" : { GNB : "GNB_INTRO" , LNB : "intro05" }
	
	//사업주
	, "/main/page.jsp?pid=owner.greeting" : { GNB : "GNB_OWNER" , LNB : "greeting" }
	, "/main/page.jsp?pid=owner.greeting2" : { GNB : "GNB_OWNER" , LNB : "greeting2" }
	, "/main/page.jsp?pid=owner.greeting3" : { GNB : "GNB_OWNER" , LNB : "greeting3" }
	, "/main/page.jsp?pid=owner.greeting4" : { GNB : "GNB_OWNER" , LNB : "greeting4" }
	, "/main/page.jsp?pid=owner.greeting5" : { GNB : "GNB_OWNER" , LNB : "greeting5" }
	, "/main/page.jsp?pid=owner.greeting6" : { GNB : "GNB_OWNER" , LNB : "greeting6" }

	//근로자
	, "/main/page.jsp?pid=worker.worker01" : { GNB : "GNB_WORKER" , LNB : "worker01" }
	, "/main/page.jsp?pid=worker.worker02" : { GNB : "GNB_WORKER" , LNB : "worker02" }
	, "/main/page.jsp?pid=worker.worker03" : { GNB : "GNB_WORKER" , LNB : "worker03" }
	, "/main/page.jsp?pid=worker.worker04" : { GNB : "GNB_WORKER" , LNB : "worker04" }
	, "/main/page.jsp?pid=worker.worker05" : { GNB : "GNB_WORKER" , LNB : "worker05" }
	

	, "/main/page.jsp?pid=board.worker06" : { GNB : "GNB_CS" , LNB : "worker06" }
	, "/main/page.jsp?pid=board.worker07" : { GNB : "GNB_CS" , LNB : "worker07" }
	, "/main/page.jsp?pid=board.support5" : { GNB : "GNB_CS" , LNB : "support5" }

	//법정필수교육
	, "/main/page.jsp?pid=law.law1" : { GNB : "GNB_LAW" , LNB : "law1" }
	, "/main/page.jsp?pid=law.law2" : { GNB : "GNB_LAW" , LNB : "law2" }
	, "/main/page.jsp?pid=law.manager" : { GNB : "GNB_LAW" , LNB : "law3" }

	//정부지원사업
	, "/main/page.jsp?pid=gov.gov" : { GNB : "GNB_GOV" , LNB : "gov" }

	//수강신청
	, "/course/course_list.jsp" : { GNB : "GNB_COURSE" , LNB : "LNB_COURSE" }
	, "/course/course_view.jsp" : { GNB : "GNB_COURSE" , LNB : "LNB_COURSE" }
	, "/main/page.jsp?pid=course.course_step" : { GNB : "GNB_COURSE" , LNB : "LNB_PROCESS" }
	
	//수강신청
	, "/webtv/webtv_list.jsp" : { GNB : "GNB_WEBTV" , LNB : "LNB_WEBTV" }
	, "/webtv/webtv_view.jsp" : { GNB : "GNB_WEBTV" , LNB : "LNB_WEBTV" }
	
	//고객센터
	, "/board/index.jsp?code=notice" : { GNB : "GNB_CS" , LNB : "notice" } //공지사항
	, "/board/read.jsp?code=notice" : { GNB : "GNB_CS" , LNB : "notice" }
	, "/board/index.jsp?code=pds" : { GNB : "GNB_CS" , LNB : "pds" } //자료실
	, "/board/read.jsp?code=pds" : { GNB : "GNB_CS" , LNB : "pds" }
	
	, "/board/index.jsp?code=event" : { GNB : "GNB_CS" , LNB : "event" } //공지사항
	, "/board/read.jsp?code=event" : { GNB : "GNB_CS" , LNB : "event" }
	, "/board/index.jsp?code=info" : { GNB : "GNB_CS" , LNB : "info" } //자료실
	, "/board/read.jsp?code=info" : { GNB : "GNB_CS" , LNB : "info" }
	, "/board/index.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "qna" } //QNA
	, "/board/read.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "qna" }
	, "/board/write.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "qna" }
	, "/board/modify.jsp?code=qna" : { GNB : "GNB_CS" , LNB : "qna" }
	, "/board/index.jsp?code=faq" : { GNB : "GNB_CS" , LNB : "faq" } //FAQ

	, "/course/review_list.jsp" : { GNB : "GNB_CS" , LNB : "review" } //수강후기
	, "/course/review_view.jsp" : { GNB : "GNB_CS" , LNB : "review" }
	, "/course/review_insert.jsp" : { GNB : "GNB_CS" , LNB : "review" }
	
	, "/main/page.jsp?pid=board.remote" : { GNB : "GNB_CS" , LNB : "LNB_REMOTE" } //원격지원
	, "/main/page.jsp?pid=board.program" : { GNB : "GNB_CS" , LNB : "LNB_PROGRAM" } //학습지원
	, "/main/checkspec.jsp" : { GNB : "GNB_CS" , LNB : "LNB_CHECKSPEC" } //학습지원
	
	//마이페이지
	, "/mypage/index.jsp" : { GNB : "GNB_MY" , LNB : "LNB_MAIN" }
	, "/mypage/course_list.jsp" : { GNB : "GNB_MY" , LNB : "mycourse" }
	, "/mypage/book_list.jsp" : { GNB : "GNB_MY" , LNB : "LNB_BOOK" }
	, "/mypage/certificate_list.jsp" : { GNB : "GNB_MY" , LNB : "certificate" }
	, "/order/cart_list.jsp" : { GNB : "GNB_MY" , LNB : "cart" }
	, "/mypage/order_list.jsp" : { GNB : "GNB_MY" , LNB : "myorder" }
	, "/mypage/order_view.jsp" : { GNB : "GNB_MY" , LNB : "myorder" }
	, "/mypage/coupon_list.jsp" : { GNB : "GNB_MY" , LNB : "coupon" }
	, "/mypage/message_list.jsp" : { GNB : "GNB_MY" , LNB : "message" }
	, "/mypage/message_view.jsp" : { GNB : "GNB_MY" , LNB : "message" }
	, "/mypage/modify.jsp" : { GNB : "GNB_MY" , LNB : "profile" }
	, "/mypage/out.jsp" : { GNB : "GNB_MY" , LNB : "profile" }
	
	//강의실
	, "/classroom/index.jsp" : { GNB : "" , LNB : "LNB_MAIN" }
	, "/classroom/course_info.jsp" : { GNB : "" , LNB : "LNB_COURSE" }
	, "/classroom/cpost_list.jsp?code=notice" : { GNB : "" , LNB : "LNB_NOTICE" } //공지사항
	, "/classroom/cpost_view.jsp?code=notice" : { GNB : "" , LNB : "LNB_NOTICE" }
	, "/classroom/curriculum.jsp" : { GNB : "" , LNB : "LNB_CURRI" }

	, "/classroom/exam.jsp" : { GNB : "" , LNB : "LNB_EXAM" }
	, "/classroom/exam_view.jsp" : { GNB : "" , LNB : "LNB_EXAM" }

	, "/classroom/homework.jsp" : { GNB : "" , LNB : "LNB_HOMEWORK" }
	, "/classroom/homework_view.jsp" : { GNB : "" , LNB : "LNB_HOMEWORK" }

	, "/classroom/forum.jsp" : { GNB : "" , LNB : "LNB_FORUM" }
	, "/classroom/forum_view.jsp" : { GNB : "" , LNB : "LNB_FORUM" }
	, "/classroom/forum_read.jsp" : { GNB : "" , LNB : "LNB_FORUM" }

	, "/classroom/survey.jsp" : { GNB : "" , LNB : "LNB_SURVEY" }
	, "/classroom/survey_view.jsp" : { GNB : "" , LNB : "LNB_SURVEY" }

	, "/classroom/library.jsp" : { GNB : "" , LNB : "LNB_LIBRARY" }
	, "/classroom/library_view.jsp" : { GNB : "" , LNB : "LNB_LIBRARY" }

	, "/classroom/cpost_list.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" } //QNA
	, "/classroom/cpost_insert.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" }
	, "/classroom/cpost_modify.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" }
	, "/classroom/cpost_view.jsp?code=qna" : { GNB : "" , LNB : "LNB_QNA" }
	
	, "/classroom/cpost_list.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" } //수강후기
	, "/classroom/cpost_insert.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" }
	, "/classroom/cpost_modify.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" }
	, "/classroom/cpost_view.jsp?code=review" : { GNB : "" , LNB : "LNB_REVIEW" }

	//회원서비스
	, "/member/login.jsp" : { GNB : "" , LNB : "login" }
	, "/member/agreement.jsp" : { GNB : "" , LNB : "join" }
	, "/member/join.jsp" : { GNB : "" , LNB : "join" }
	, "/member/join_success.jsp" : { GNB : "" , LNB : "join" }
	, "/member/find.jsp" : { GNB : "" , LNB : "findpw" }
	, "/member/privacy.jsp" : { GNB : "" , LNB : "privacy" }
	, "/member/terms.jsp" : { GNB : "" , LNB : "terms" }
	, "/main/page.jsp?pid=member.notemail" : { GNB : "" , LNB : "notemail" }
	, "/main/page.jsp?pid=member.refund" : { GNB : "" , LNB : "refund" }

};


var modules = { 
	"/main/page.jsp" : "pid"
	, "/board/index.jsp" : "code" 
	, "/board/read.jsp" : "code" 
	, "/board/write.jsp" : "code" 
	, "/board/modify.jsp" : "code" 
	, "/classroom/cpost_list.jsp" : "code" 
	, "/classroom/cpost_insert.jsp" : "code" 
	, "/classroom/cpost_modify.jsp" : "code" 
	, "/classroom/cpost_view.jsp" : "code" 
}; 

$(document).ready(function() {
	var currUrl = decodeURIComponent(location.href);
	var currDomain = document.domain;
	var currPath = currUrl.replace("http://" + currDomain, "").replace("https://" + currDomain, "").replace(location.hash, "");
	
	var query = currUrl.slice(currUrl.indexOf('?') + 1, currUrl.length).replace(location.hash, "");
	var path = currPath.replace("?" + query, "");
	
	try {
		if(path in modules) {
			var parameters = query.split('&');
			for(var i = 0 ; i < parameters.length ; i++) {
				var key = parameters[i].split('=')[0];
				if(key.toLowerCase() == modules[path]) {
					value = parameters[i].split('=')[1];
					path += "?" + key + "=" + value;
					break;
				}
			}
		}

		var gnb = links[path].GNB ? links[path].GNB : "" ;
		var lnb = links[path].LNB ? links[path].LNB : "" ;
		//console.log(gnb)
		if(gnb) {
			var classNameGnb = document.getElementById(gnb).className;
			document.getElementById(gnb).className = classNameGnb + " on";
		}
		if(lnb) {
			var classNameLnb = document.getElementById(lnb).className;
			document.getElementById(lnb).className = classNameLnb + " on";
		}

	} catch(e) { }
	
});
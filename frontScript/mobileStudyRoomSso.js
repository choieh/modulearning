$(document).ready(function(){
	ajaxAct();
})

function ajaxAct(){
		if(page == 'progress'){
			var listAjax = $.get(useApi, function(data){
				var totalCount = data.totalCount;
				var lists = '';
				if(totalCount != 0){
					lists += '<div class="tab_con">';
					$.each(data.study, function(){
						lists += '<div class="mypage_lclist">';
						lists += '<div class="contentinfo1">';
						lists += '<strong class="info_title">';
						lists += this.contentsName;
						lists += '</strong>';
						if (this.passOK == 'Y') {
							var passT = '수료';
						} else {
							var passT = '미수료';
						}
						lists += `<p class="info_date">
							<span class="tc_blue">상시</span>${this.lectureStart}~${this.lectureEnd} | <b>${this.progress}% | ${passT}</b>
							</p>`;

						lists += '</div>';
						lists += '<div class="my_btn_wrap">';
						if((this.serviceType != '5' && this.mobile == 'Y') || (this.mobile == 'Y' && this.serviceType == '5' && new Date(this.lectureStart) > new Date('2023-05-01'))){
							if(totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5' )){
								lists += '<button type="button" class="my_btn_join" onclick="alert(\'환급 과정 완료 후 다음과정 수강 할 수 있습니다.\')">강의실 입장</button>';
							} else {
								lists += '<a href="studyDetail.php?seq='+this.seq+'&contentsCode='+this.contentsCode+'&lectureOpenSeq='+this.lectureOpenSeq+'"><button type="button" class="my_btn_join">강의실 입장</button></a>';
							}
						} else {
							lists += '<button type="button" class="my_btn_join">모바일을 지원하지 않는 과정입니다.</button>';
						}
						lists += '</div>';
						lists += '</div>';
						lists += '</div>';
					})
				} else {
					lists += '<div class="mypage_lclist">등록된 과정이 없습니다.</div>	';
					lists += '</div>';
				}
				$('.progress').append(lists);
			})
		} else if(page == 'terminate'){
			var listAjax = $.get(endApi, function(data){
				var totalCount = data.totalCount;
				var lists = '';
				if(totalCount != 0){
					lists += '<div class="tab_con">';
					$.each(data.study, function(){
						lists += '<div class="mypage_lclist">';
						lists += '<div class="contentinfo1">';
						lists += '<strong class="info_title">';
						lists += this.contentsName;
						lists += '</strong>';
						lists += '<p class="info_date"><span class="tc_blue">상시</span>'+this.lectureStart+'~'+this.lectureEnd+'</p>';
						lists += '</div>';
						lists += '<div class="my_btn_wrap">';
						lists += '<a href="studyDetail.php?seq='+this.seq+'&contentsCode='+this.contentsCode+'&lectureOpenSeq='+this.lectureOpenSeq+'"><button type="button" class="my_btn_join">강의실 입장</button></a>';
						lists += '</div>';
						lists += '</div>';
						lists += '</div>';
					})
				} else {
					lists += '<div class="mypage_lclist">등록된 과정이 없습니다.</div>	';
					lists += '</div>';
				}
				$('.terminate').append(lists);
			})
		}
}

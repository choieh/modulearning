let siteObject = {
			modu:{name:'모두의러닝',url:'https://modulearning.kr/main/'},
			kcls:{name:'한국사이버진흥원(사업)',url:'http://ekcls.kr/main/'},
			kclsN:{name:'한국사이버진흥원(국가)',url:'https://ekcls.co.kr/'},
			kclsP:{name:'한국사이버진흥원(민간)',url:'https://ekcls.com/'},
			itboard:{name:'요청게시판',url:'http://work.modugroup.kr/g5/bbs/login.php'}
		};
let searchBar='';
let registrationBar='';
let siteManagerList='';
let horizonBar=`<hr style="border-top: 1px dashed #fff">`;

//template list
searchBar=`
<div class="searchArea">
	<form class="searchForm" action="javascript:searchManager();">
		<select name="searchType">
			<option value>구분</option>
			<option value="service">서비스</option>
			<option value="url">URL</option>
			<option value="name">담당자</option>
			<option value="phone">연락처</option>
			<option value="email">이메일</option>				
		</select>
		<input type="text" name="searchData">
		<button type="button" onclick="searchManager();">검색하기</button>		
		<button type="button" id="regBtn" class="fRight" onClick="showRegistDialog()">담당자 등록</button>
	</form>
</div>
`;


siteManagerList=`
<div class="BBSList">
	<table>
		<thead>
			<th>idx</th>
			<th>서비스</th>
			<th>URL</th>
			<th>담당자</th>
			<th>연락처</th>
			<th>Email</th>
			<th>등록 일</th>
			<th>메모</th>
			<th>삭제</th>
		</thead>
	<tbody id="managerList">
	</tbody>
	</table>
</div>
`;

deleteDialog=`
<dialog id="delDialog">
<h3> 사이트 담당자 삭제 </h3>
  <form method="dialog">
    <p id="dialogMessage">정말 삭제하시겠습니까?</p>
    <menu>      
      <button id="confirmBtn" value="default">확인</button>
      <button value="cancel">취소</button>
    </menu>
  </form>
</dialog>
`;


registDialog=`
<dialog id="regDialog">
  <h3> 사이트 담당자 등록 </h3>
<div class="inputArea" style="marginTop:10px;">
	<form class="registForm" name="registForm" method="dialog">
		<table>
			<tbody>
				<tr>
					<th>서비스(*)</th>
					<th>URL(*)</th>
					<th>담당자(*)</th>
					<th>연락처(*)</th>
					<th>이메일</th>
					<th>메모</th>
					<th rowspan="2"><button type="button" onclick="registManager()">등록</button>	</th>
				</tr>
				<tr>
					<td>
						<select id="service" name="service" onchange="writeURL()">
							<option value="">구분</option>
							${Object.keys(siteObject).reduce((str,cur)=>str+=`<option value="${cur}">${siteObject[cur].name}</option>`,0)}							
						</select>
					</td>
					<td>
						<input id="url" type="text" name="url" placeholder="choose the service" readonly>						
					</td>
					<td><input type="text" name="name" required></td>
					<td><input type="tel" name="phone" required></td>
					<td><input type="email" name="email" style='border-collapse: collapse; box-sizing: border-box; height: 28px; padding-left: 5px; width: 90%; padding-right: 5px;'></td>
					<td>
						<input type="text" name="comment">
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>
</dialog>
`;


function setTable(data){
	let managerTable = document.getElementById('managerList');
	let tableSetter = '';
	managerTable.innerHTML='';
	for(x of data.managers){
		tableSetter = `
		<td>${x.idx}</td>
		<td>${x.service}</td>
		<td>${x.url}</td>
		<td>${x.name}</td>
		<td>${x.phone}</td>
		<td>${x.email}</td>
		<td>${x.regDate}</td>
		<td>${x.comment}</td>
		<td>		
		<button onclick="showDeleteDialog(${x.idx})">삭제</button>
		</td>
		`;
		managerTable.innerHTML+=tableSetter;
	}
}

function showDeleteDialog(idx){
	let delDialog=document.getElementById('delDialog');
	let confirmBtn=document.getElementById('confirmBtn');
	let dialogMsg=document.getElementById('dialogMessage');
	let inputArea=document.querySelector('.inputArea');

	if(typeof delDialog.showModal === 'function') {
		confirmBtn.value=idx;
		dialogMsg.innerText=`정말 삭제하시겠습니까?(idx:${idx})`
		delDialog.showModal();
		inputArea.addEventListener('click', ()=>{
			closeModal(delDialog);
		});
	}
	else alert("The <dialog> API is not supported by this browser");

}

function showRegistDialog(){
	let regDialog=document.getElementById('regDialog');		

	if(typeof regDialog.showModal === 'function')
		regDialog.showModal();
	else 
		alert("The <dialog> API is not supported by this browser");
}

function writeURL(){
		
	let selected = document.getElementById('service');
	let setUrl = document.getElementById('url');
	let {[selected.value]:selectedService}=siteObject;
	
	if(selectedService!=undefined) setUrl.value=selectedService.url;
	else setUrl.value='';
	
}

function registManager(){
	
	let registrationUrl='/api/apiSiteManagerRegist.php'
	let selected = document.getElementById('service');
	let params=$('.registForm').serialize();
	//params=params.replace(selected.value,selected.options[selected.selectedIndex].text);
	
	fetch(registrationUrl,{
		method:'POST',
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body:params})
	.then((response) => response.json())
	.then((data) =>{
		if(data.message!='success'){		
			alert(data.message);
		} else {
			alert('등록 되었습니다.');
		}
	})
	.catch((error)=> alert('can regist a manager\n error => ',error) );
}

function searchManager(){
	
	let params=$('.searchForm').serialize();
	
	if(params.length==23){
		location.reload();
	}
	
	fetch(`/api/apiSiteManagerList.php?${params}`)
	.then((response)=>response.json())
	.then((data)=>{
		if(data.message!=undefined){
			alert(data.message);
			location.reload();
			return;
		}
		setTable(data);
	})
	.catch((error)=> alert('can get the managersList\n error:',error) );
}


function newDeleteManager(idx){		
	if(isNaN(idx)) return;
	fetch(`/api/apiSiteManagerDelete.php?idx=${idx}`)
	.then((response)=>response.json())
	.then((data)=>{
		if(data.message!=undefined){
			alert(data.message);
			location.reload();
			return;
		}
	})
	.catch((error)=>{
		alert('deleteManager error:',error);
	})

}

function writePage(page){		
	let divContents=document.querySelector('#contents');

	divContents.innerHTML=searchBar;
	divContents.innerHTML+=siteManagerList;
	document.body.innerHTML+=deleteDialog;
	document.body.innerHTML+=registDialog;
	getManagers();
}

function getManagers(){
	fetch('/api/apiSiteManagerList.php')
	.then((response)=>response.json())
	.then((data)=>{
		setTable(data);
	})
	.catch((error)=>{
		alert('can get the managersList\n error:',error);
	})
}

function isIndialog(dom,event){
	let rect=dom.getBoundingClientRect();
	let indialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
          && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
	if (indialog) {
		return true;
	}
	return false;
}


window.onload=()=>{	
	location.hash='';
	writePage();
	//add modal
	let delDialog=document.getElementById('delDialog');
	let regDialog=document.getElementById('regDialog');

  
	delDialog.addEventListener('close', function (event){
		if(isIndialog(this,event)){
        	newDeleteManager(delDialog.returnValue);
    }
	});

	regDialog.addEventListener('close', function (event){						
		if(isIndialog(this,event)){
        	getManagers();
        }		
	});
  
	delDialog.addEventListener('click', function (event){				
        if(!isIndialog(this,event)){
        	this.close();
        }
        if(event.target.tagName == 'BUTTON'){
          newDeleteManager(delDialog.returnValue);
        }
	});

	
	regDialog.addEventListener('click', function (event){		
		if(!isIndialog(this,event)){
        	this.close();
        }
	});

}

/*
window.addEventListener('hashchange', function () {	
	if(location.hash==''){
		writePage();
	} else if(location.hash=='#regist'){
		writePage('regist');
	}
});
*/
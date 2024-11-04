/*********************************************************
	common.js - &.202406
**********************************************************/

//////////////////////////////////////////////////
// vh동적 설정
//////////////////////////////////////////////////
function setVh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// Initial setting
setVh();
// Recalculate on resize
window.addEventListener('resize', setVh);


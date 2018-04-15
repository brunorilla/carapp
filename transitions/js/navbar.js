
let header = document.querySelector('#header');
let navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener('click', function(){
	toggleClass(header, "open");
})


function addClass(element, className){
	let classList = element.className.split(" ");
	classList.push(className);
	element.className = classList.join(" ");
}

function removeClass(element, className){
	let classList = element.className.split(" ");
	classList = classList.filter(function(e){
		console.log(e);
		return e !== className;
	});
	element.classList = classList;
}

function toggleClass(element, className){
	let classList = element.className.split(" ");
	if( (classList.indexOf(className)) !== -1){
		console.log("true");
		removeClass(element, className);
	}else {
		console.log("false");
		addClass(element, className);
	}
}
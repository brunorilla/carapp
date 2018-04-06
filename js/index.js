"use strict";

addEventListener('DOMContentLoaded', function(){
	fetchImages();

});


function fetchImages(){
	var url = "https://pixabay.com/api/?key=8571840-7bbd0461a8a0060bcf0e3a83f&q=cars&image_type=photo&per_page=10&orientation=horizontal";	
	fetch(url).then(function(response){
		return response.json();
	}).then(function(json){
		var data = json["hits"];
		var img = [];
		data.forEach(function(element){
			img.push(element.previewURL);
		})
		return img;
	}).then(function(img){
		renderImg(img);
		
	}).catch(function(error){
		console.log(error);
	});
}


function renderImg(img){
	var imgWrapper = document.querySelector('.img-wrapper');
	
	for (var i = 0; i < img.length; i++) {
		var div = document.createElement('div');
		div.classList.add('car-image');
		div.style.backgroundImage = 'url('+img[i]+')';
		imgWrapper.appendChild(div); 
	}

}

var form = document.querySelector('#infoForm');

	form.addEventListener('submit', function(e){
		e.preventDefault();
		deleteWarning();
		var target = e.target;
		console.dir(target);
		let sectionAbout = document.querySelector('.about');
		sectionAbout.innerHTML = "";
		var values = [];
		for (var i = 0; i < target.length; i++) {			
			values.push(target[i].value); 
		}
		fetchCarInfo(values);
	});

function fetchCarInfo(values){
	var inputs = [];
	for (var i = 0; i < values.length; i++) {
		if(values[i] != 'Consult'){
			inputs.push(values[i]);
		}		
	}
	values.pop();
	console.log("Popped values"+values);
	var make = values.slice(0,1);
	var make = filterNumbers(make);
	var make = encodeURIComponent(make);
	var model = values.slice(1);	
	let url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/"+make+"?format=json";
	fetch(url).then(function(response){
		return response.json();

	})
	.then(function(response){
		var count = response.Count;
		var	resultsArray = response.Results;
		renderResults(resultsArray,count);
	})
	.catch(function(error){
		console.log(error);
	})
}

function renderResults(data, count){
	console.log(data);
	console.log(count);
	//var = document.querySelector()
	var header = `
					<div class="response-header">
						<h2 class="response-heading">Your consult has given ${count} results</h2>
					</div>
				`;
	var sectionAbout = document.querySelector('.about');
	var resultsDiv = document.createElement('div');
	resultsDiv.classList.add('results');
	var toRender = []
	for (var i = 0; i < data.length; i++) {
					data[i]
		var template =	`	
							<article class="data-set">
								<h3 class="data-title">Make</h3>
								<p class="result">${data[i].Make_Name}</p>

								<h3 class="data-title">Model</h3>
								<p class="result">${data[i].Model_Name}</p>
							</article>
								
			`;
		toRender.push(template);	
				}			
		console.log(toRender);
		var toRender = toRender.join(" ");
		resultsDiv.innerHTML = header+toRender;
		sectionAbout.appendChild(resultsDiv);
}


function filterNumbers(string){

	var regEx = /[^0-9]/;

	if (regEx.test(string)){
		return string;
	}else {
		return tryAgain();
	};
}

function tryAgain(){
	console.log("TryAgain function is being executed");
  	let warning = document.createElement('p');
 	warning.classList.add('warning');
	warning.innerText="No numbers are allowed. Please try again."
	let form = document.querySelector('#infoForm');
	form.appendChild(warning);
}

function deleteWarning(){
	var warning = document.querySelector('.warning');
	if (warning){
		warning.remove();
	} else {
		return false;
	}
}

/*



*/
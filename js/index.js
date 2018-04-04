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
		var target = e.target;
		console.dir(target);
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
}
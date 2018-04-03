

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

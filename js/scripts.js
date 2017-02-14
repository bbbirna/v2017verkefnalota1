$(function() {

	$(document).foundation();	

});


let searchInput = "";

$(document).ready(function() {
	$(".search-bar").keyup(function() {
       searchInput = this.value;
       console.log("vuhu");
	});

	// $(".slider-handle").click(function() {
	// 	console.log($(".aria-valuenow").value);
	// 	console.log(handle.attr('aria-valuenow'));
	// });

	$('#slider-handle1').on('moved.zf.slider', function(e){
	  let handleValue = this.attr('aria-valuenow');
	  console.log(handleValue);
	  $("#testSpan").innerHTML = handleValue;
	  document.getElementById("slider-handle-num1").innerHTML = handleValue;
	});

	$('#slider-handle2').on('moved.zf.slider', function(e, handle){
	  let handleValue = handle.attr('aria-valuenow');
	  console.log(handleValue);
	  $("#testSpan").innerHTML = handleValue;
	  document.getElementById("slider-handle-num2").innerHTML = handleValue;
	});

	// $('.slider').on('moved.zf.slider', function(e, handle){
	//   let handleValue = handle.attr('aria-valuenow');
	//   console.log(handleValue);
	//   $("#testSpan").innerHTML = handleValue;
	//   document.getElementById("slider-handle-num3").innerHTML = handleValue;
	// });



	let svgDot = "<svg width='13px' height='13px' viewBox='0 0 13 13' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='dot' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Page-1' fill-rule='nonzero' fill='#e6e6e6'><circle id='Oval' cx='6.5' cy='6.5' r='6.5'></circle></g></g></svg>";
	let lineDots = "";

	let test = function() {
		for (let i = 0; i < 22; i++) {
			lineDots += svgDot;

		}
	}();

	

	$(".slider").append(lineDots);


});



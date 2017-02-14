$(function() {

	$(document).foundation();	

});

let showHandleValue = function(handleValue, slider, span) {
		if (handleValue !== $(slider).attr('data-initial-start') && handleValue !== $(slider).attr('data-initial-end')) {
			$(span).fadeIn();
			console.log("rgddwdwdwdwd")
			return;
		}
		else {
			$(span).fadeOut();
			return;
		}
		if (handleValue === $(slider).attr('data-initial-end')) {
			$(span).fadeOut();
			console.log("rgddwdwdwdwd")
			return;
		}
		else {
			$(span).fadeIn();
			return;
		}
	}




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

	$('.slider1').on('moved.zf.slider', function(){
	  let handleValue1 = $("#slider-handle1").attr('aria-valuenow');
	  console.log(handleValue1);
	  document.getElementById("sh-num1").innerHTML = handleValue1;
	  let handleValue2 = $("#slider-handle2").attr('aria-valuenow');
	  console.log(handleValue2);
	  document.getElementById("sh-num2").innerHTML = handleValue2;
	  showHandleValue(handleValue1, ".slider1", "#sh-num1");
	  showHandleValue(handleValue2, ".slider1", "#sh-num2");
	});

	$('.slider2').on('moved.zf.slider', function(){
	  let handleValue3 = $("#slider-handle3").attr('aria-valuenow');
	  console.log(handleValue3);
	  document.getElementById("sh-num3").innerHTML = handleValue3;
	  let handleValue4 = $("#slider-handle4").attr('aria-valuenow');
	  console.log(handleValue4);
	  document.getElementById("sh-num4").innerHTML = handleValue4;
	  showHandleValue(handleValue3, ".slider2", "#sh-num3");
	  showHandleValue(handleValue4, ".slider2", "#sh-num4");
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
		for (let i = 0; i < $(".slider").width()/37; i++) {
			lineDots += svgDot;
		}
	}();

	
	// $( window ).resize(function() {
	//   for (let i = 0; i < $(".slider").width()/33; i++) {
	// 		lineDots -= svgDot - svgDot;
	// 	}
	// });

	$(".slider").append(lineDots);

});


$( window ).resize(function() {
  console.log($( window ).width() + "fjfjfjjfjfj");
});



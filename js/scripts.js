$(function() {

	$(document).foundation();	

});

let showHandleValue = function(handleValue, slider, span) {
		if (handleValue !== $(slider).attr('data-initial-start') && handleValue !== $(slider).attr('data-initial-end')) {
			$(span).fadeIn();
			return;
		}
		else {
			$(span).fadeOut();
			return;
		}
		if (handleValue === $(slider).attr('data-initial-end')) {
			$(span).fadeOut();
			return;
		}
		else {
			$(span).fadeIn();
			return;
		}
	}

class SearchResult {
	constructor(image, name, tags, text) {
		this.image = image;
		this.name = name;
		this.tags = tags;
		this.text = text;
	}

	createCard() {
		let searchResultsDiv = document.getElementById("search-results-div");

		let searchResultsCard = document.createElement("div");
		searchResultsCard.className = "row search-results-card";
		searchResultsDiv.appendChild(searchResultsCard);


		let searchResultsImgDiv = document.createElement("div");
		searchResultsImgDiv.className = "columns small-2";
		searchResultsCard.appendChild(searchResultsImgDiv);

		let searchResultsImg = document.createElement("img");
		searchResultsImg.className = "search-img";
		searchResultsImgDiv.appendChild(searchResultsImg);
		searchResultsImg.src = this.image;


		let searchResultsInfoDiv = document.createElement("div");
		searchResultsInfoDiv.className = "columns small-10 search-results-info";
		searchResultsCard.appendChild(searchResultsInfoDiv);

		searchResultsInfoDiv.innerHTML = '<h3>' + this.name + '</h3>' + '<p class="search-results-tags">' + this.tags + '</p> <p class="search-results-text">' + this.text + '</p>';

		// let searchResultsInfo = '<h1> + this.name + </h1>';
		// searchResultsInfoDiv.appendChild(searchResultsInfo);

	}
}


let searchInput = "";

$(document).ready(function() {
	$(".search-bar").keyup(function() {
		document.getElementById("search-results-div").innerHTML = "";
		searchInput = this.value;
		console.log("vuhu");
		var r = new XMLHttpRequest();
		r.open("GET", "https://api.themoviedb.org/3/search/person?api_key=7fd909842e93334fc23e423083861d34&query=" + encodeURI(searchInput), true);
		r.onreadystatechange = function () {

			if (r.readyState != 4 || r.status != 200) return;
			let response = JSON.parse(r.responseText);
			console.log(response);

			for (let i = 0; i < response.results.length; i++) {
				console.log(response.results[i].name)

				let imageURL = "http://image.tmdb.org/t/p/w185/" + response.results[i].profile_path;

				
				console.log(imageURL);
				
					
				// $.get(imageURL)
			 //    .done(function() { 
			 //        // Do something now you know the image exists.
			 //        console.log(":D")

			 //    }).fail(function() { 
			 //        // Image doesn't exist - do something else.
			 //        console.log(":(")
			 //    })
				


				let newResultsCard = new SearchResult(imageURL, response.results[i].name, "Actor | Writer | Producer", "Paul Stephen Rudd was born in Passaic, New Jersey. His parents, Michael and Gloria, both from Jewish families...");
			
				newResultsCard.createCard();
	
			


			};

		};
		r.send();

	});






	// $(".slider-handle").click(function() {
	// 	console.log($(".aria-valuenow").value);
	// 	console.log(handle.attr('aria-valuenow'));
	// });




	$('.slider1').on('moved.zf.slider', function(){
	  let handleValue1 = $("#slider-handle1").attr('aria-valuenow');
	  // console.log(handleValue1);
	  document.getElementById("sh-num1").innerHTML = handleValue1;
	  let handleValue2 = $("#slider-handle2").attr('aria-valuenow');
	  // console.log(handleValue2);
	  document.getElementById("sh-num2").innerHTML = handleValue2;
	  showHandleValue(handleValue1, ".slider1", "#sh-num1");
	  showHandleValue(handleValue2, ".slider1", "#sh-num2");
	});

	$('.slider2').on('moved.zf.slider', function(){
	  let handleValue3 = $("#slider-handle3").attr('aria-valuenow');
	  // console.log(handleValue3);
	  document.getElementById("sh-num3").innerHTML = handleValue3;
	  let handleValue4 = $("#slider-handle4").attr('aria-valuenow');
	  // console.log(handleValue4);
	  document.getElementById("sh-num4").innerHTML = handleValue4;
	  showHandleValue(handleValue3, ".slider2", "#sh-num3");
	  showHandleValue(handleValue4, ".slider2", "#sh-num4");
	});

	$(window).on('resize', function() {
		$('.slider1, .slider2').foundation('_reflow');
	})


	// $('.slider').on('moved.zf.slider', function(e, handle){
	//   let handleValue = handle.attr('aria-valuenow');
	//   console.log(handleValue);
	//   $("#testSpan").innerHTML = handleValue;
	//   document.getElementById("slider-handle-num3").innerHTML = handleValue;
	// });


	//punktar á slider
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



	// let genreRows = $("#genre-rows");
	// let rowGenre = document.createElement("div");
	// rowGenre.className = "row row-genre";
	// genreRows.append(rowGenre);
	
	// let genreCol = document.createElement("div");
	// genreCol.className = "columns small-4";
	// rowGenre.append(genreCol);

	// let genreBtn = document.createElement("button");
	// genreBtn.className = "btn-genre";
	// genreCol.append(genreBtn);
	// genreBtn.innerHTML = "hhah";

	// '<div class="columns small-4"><button class="btn-genre">Action</button></div><div class="columns small-4"><button class="btn-genre">Adventure</button></div><div class="columns small-4"><button class="btn-genre">Animation</button></div>'
	// rowGenre.innerHTML = grenreBtn;



});








$(document).ready(function() {
	$("#btn-showmore").click( function() {
		
		if ($("#btn-showmore").hasClass("showmore-closed")) {
		
			console.log("opna");

			$("#genre-rows .row-genre").show();
			$("#btn-showmore").html("Show less");
		};

		if ($("#btn-showmore").hasClass("showmore-open")) {
			
			console.log("loka");
			$("#genre-rows .row-genre").hide();
			$("#genre-rows .row-genre:nth-child(-n + 3)").show();
			$("#btn-showmore").html("Show more");
		};

		$("#btn-showmore").toggleClass("showmore-closed showmore-open");
	
	});

	

	//til að fá genres í search

	var r = new XMLHttpRequest();
	r.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=7fd909842e93334fc23e423083861d34&language=en-US", true);
	r.onreadystatechange = function () {

		if (r.readyState != 4 || r.status != 200) return;
		let response = JSON.parse(r.responseText);
		for (let i = 0; i < response.genres.length; i++) {
			//console.log(response.genres[i].name);
			console.log(response);
			let genreRows = $("#genre-rows");

			if (i % 3 == 0) {
				var rowGenre = document.createElement("div");
				rowGenre.className = "row row-genre";
				genreRows.append(rowGenre);
			}
			
			let genreCol = document.createElement("div");
			genreCol.className = "columns small-4";
			rowGenre.append(genreCol);

			let genreBtn = document.createElement("button");
			genreBtn.className = "btn-genre";
			genreCol.append(genreBtn);
			genreBtn.innerHTML = response.genres[i].name;
			$(genreBtn).attr("id", response.genres[i].id);
			$(genreBtn).attr("onclick", testfunciton);


			// $(genreBtn).click(console.log($(genreBtn).attr("id")));

			// $("#genre-rows").hide();
			// $("#genre-rows:nth-child(2)").show();
			$("#genre-rows .row-genre").hide();
			$("#genre-rows .row-genre:nth-child(-n + 3)").show();

		}

		
		
	
	};
	r.send();
	// let genreRows = $("#genre-rows");
	// let rowGenre = document.createElement("div");
	// rowGenre.className = "row row-genre";
	// genreRows.append(rowGenre);
	
	// let genreCol = document.createElement("div");
	// genreCol.className = "columns small-4";
	// rowGenre.append(genreCol);

	// let genreBtn = document.createElement("button");
	// genreBtn.className = "btn-genre";
	// genreCol.append(genreBtn);
	// genreBtn.innerHTML = "hhah";



});


let testfunciton = function() {
	console.log(this.id);
}


// document.getElementById("btn-showmore").addEventListener("click", function() {
// 	console.log("jfjfjfjfjf");
// 	$("#genre-rows .row-genre").show();
// });


$(document).ready(function(){

	// class SearchResult {
	// 	constructor(image, name, tags, text) {
	// 		this.image = image;
	// 		this.name = name;
	// 		this.tags = tags;
	// 		this.text = text;
	// 	}

	// 	createCard() {
	// 		let searchResultsDiv = document.getElementById("search-results-div");

	// 		let searchResultsCard = document.createElement("div");
	// 		searchResultsCard.className = "row search-results-card";
	// 		searchResultsDiv.appendChild(searchResultsCard);


	// 		let searchResultsImgDiv = document.createElement("div");
	// 		searchResultsImgDiv.className = "columns small-2";
	// 		searchResultsCard.appendChild(searchResultsImgDiv);

	// 		// let searchResultsImg = document.createElement("img");
	// 		// searchResultsImg.attr("src", this.image);

	// 		// searchResultsImgDiv.appendChild(searchResultsImg);


	// 		let searchResultsInfoDiv = document.createElement("div");
	// 		searchResultsInfoDiv.className = "columns small-10 search-results-info";
	// 		searchResultsCard.appendChild(searchResultsInfoDiv);

	// 		searchResultsInfoDiv.innerHTML = '<h3>' + this.name + '</h3>' + '<p class="search-results-tags">' + this.tags + '</p> <p class="search-results-text">' + this.text + '</p>';

	// 		// let searchResultsInfo = '<h1> + this.name + </h1>';
	// 		// searchResultsInfoDiv.appendChild(searchResultsInfo);

	// 	}
	// }


	// let newResultsCard = new SearchResult("mynd", "Paul Rudd", "Actor | Writer | Producer", "Paul Stephen Rudd was born in Passaic, New Jersey. His parents, Michael and Gloria, both from Jewish families...");
	// //console.log(newResultsCard);
	// newResultsCard.createCard();
	// // let searchResultsDiv = document.getElementById("search-results-div");
	// // searchResultsDiv.appendChild(newResultsCard);



	// // ÞETTA BÝR TIL RESULTSKORT VIRKAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// let searchResultsDiv = document.getElementById("search-results-div");
	// let searchResultsCard = document.createElement("div");
	// searchResultsCard.className = "row search-results-card";
	// searchResultsDiv.appendChild(searchResultsCard);

	// let searchResultsImgDiv = document.createElement("div");
	// searchResultsImgDiv.className = "columns small-2";
	// searchResultsCard.appendChild(searchResultsImgDiv);

	// let searchResultsInfoDiv = document.createElement("div");
	// searchResultsInfoDiv.className = "columns small-10 search-results-info";
	// searchResultsCard.appendChild(searchResultsInfoDiv);


});


















































$(function() {
    $(document).foundation();   
});

// show and hide value on slider
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
// display search results
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
    }
}



// search by keywords
let searchInput = "";
let filterSearchInfo = {};
$(document).ready(function() {
    $(".search-bar").keyup(function() {
        document.getElementById("search-results-div").innerHTML = "";
        searchInput = this.value;
        console.log(searchInput);
        
        if (searchInput == '') {
            $("#filter-search").show();
        }

        else {
        $("#filter-search").hide();
        var r = new XMLHttpRequest();
        r.open("GET", "https://api.themoviedb.org/3/search/person?api_key=7fd909842e93334fc23e423083861d34&query=" + encodeURI(searchInput), true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            let response = JSON.parse(r.responseText);
            console.log(response);
            for (let i = 0; i < response.results.length; i++) {
                let imageURL = "http://image.tmdb.org/t/p/w185/" + response.results[i].profile_path;
                if (response.results[i].profile_path == null) {
                    imageURL = "images/noImage.jpg"
                }
                let knownFor = [];
                for (let j = 0; j < response.results[i].known_for.length; j++) {
                    knownFor.push(response.results[i].known_for[j].title);
                }
                console.log(knownFor);
                let newResultsCard = new SearchResult(imageURL, response.results[i].name, "Known for: " + knownFor, "Paul Stephen Rudd was born in Passaic, New Jersey. His parents, Michael and Gloria, both from Jewish families...");
            
                newResultsCard.createCard();
    
            
            };
        };
        r.send();
        }
    });

    // get values on sliders
    $('.slider1').on('moved.zf.slider', function(){
      let handleValue1 = $("#slider-handle1").attr('aria-valuenow');
      // console.log(handleValue1);
      document.getElementById("sh-num1").innerHTML = handleValue1;
      let handleValue2 = $("#slider-handle2").attr('aria-valuenow');
      // console.log(handleValue2);
      document.getElementById("sh-num2").innerHTML = handleValue2;
      showHandleValue(handleValue1, ".slider1", "#sh-num1");
      showHandleValue(handleValue2, ".slider1", "#sh-num2");
      filterSearchInfo.ratingLo = handleValue1;
      filterSearchInfo.ratingHi = handleValue2;
      
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
      filterSearchInfo.yearLo = handleValue3;
      filterSearchInfo.yearHi = handleValue4;
    });

    // make sliders scalable
    $(window).on('resize', function() {
        $('.slider1, .slider2').foundation('_reflow');
    })

    // dots on sliders
    let svgDot = "<svg width='13px' height='13px' viewBox='0 0 13 13' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='dot' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Page-1' fill-rule='nonzero' fill='#e6e6e6'><circle id='Oval' cx='6.5' cy='6.5' r='6.5'></circle></g></g></svg>";
    let lineDots = "";
    let createDots = function() {
        for (let i = 0; i < $(".slider").width()/37; i++) {
            lineDots += svgDot;
        }
    }();
    $(".slider").append(lineDots);
});

// show more button
$(document).ready( function() {
    $("#btn-showmore").click( function() {
        
        if ($("#btn-showmore").hasClass("showmore-closed")) {
            $("#genre-rows .row-genre").show();
            $("#btn-showmore").html("Show less");
        };
        if ($("#btn-showmore").hasClass("showmore-open")) {
            $("#genre-rows .row-genre").hide();
            $("#genre-rows .row-genre:nth-child(-n + 3)").show();
            $("#btn-showmore").html("Show more");
        };
        $("#btn-showmore").toggleClass("showmore-closed showmore-open");
    
    });
    
    // add genres to search
    var selectedGenres = [];
    var r = new XMLHttpRequest();
    r.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=7fd909842e93334fc23e423083861d34&language=en-US", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        let response = JSON.parse(r.responseText);
        for (let i = 0; i < response.genres.length; i++) {
            //console.log(response.genres[i].name);
            //console.log(response);
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
            $(genreBtn).attr("data-id", response.genres[i].id);
            //$(genreBtn).attr("onclick", testfunciton);
            $("#genre-rows .row-genre").hide();
            $("#genre-rows .row-genre:nth-child(-n + 3)").show();
        }
        // genres on click
        $(".btn-genre").click( function() {
                if ($(this).hasClass("btn-genre-fill")) {
                    var btnIndex = selectedGenres.indexOf($(this).data("id"));
                    selectedGenres.splice(btnIndex, 1)
                }
                else {
                    selectedGenres.push($(this).data("id"));
                    filterSearchInfo.genres = selectedGenres;
                    console.log($(this).data("id"));
                }
                $(this).toggleClass("btn-genre-fill");
            
        });        
    
    };
    r.send();
    
});
// filter search
let filterSearchTemp = [];
let filterSearchTemp2 = [];
let filterSearchResults = [];
let filterSearchId = [];
filterMovieId = "";
$(document).ready(function(){

    $("#btn-filter-search").click(function() {
        filterSearchTemp = [];
        filterSearchTemp2 = [];
        filterSearchId = [];
        
        var r = new XMLHttpRequest();
        r.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=7fd909842e93334fc23e423083861d34&query=" + encodeURI(searchInput), true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            let response = JSON.parse(r.responseText);
            
            for (let i = 0; i < response.results.length; i++) {
                if (filterSearchInfo.ratingLo < response.results[i].vote_average && response.results[i].vote_average < filterSearchInfo.ratingHi) {
                    filterSearchTemp.push(response.results[i]);
                }
        
            }


            for (let i = 0; i < filterSearchTemp.length; i++) {

                if (filterSearchInfo.yearLo < filterSearchTemp[i].release_date.substr(0, 4) && filterSearchTemp[i].release_date.substr(0, 4) < filterSearchInfo.yearHi) {
                    //console.log(filterSearchTemp[i].release_date.substr(0, 4));
                    filterSearchTemp2.push(filterSearchTemp[i]);
                    
                }

            }


            
            // console.log(filterSearchInfo);
            // console.log(filterSearchInfo.genres);
            // console.log(filterSearchTemp);
            // console.log(filterSearchTemp2);
            for (let i = 0; i < filterSearchTemp2.length; i++) {
               
                for (let j = 0; j < filterSearchTemp2[i].genre_ids.length; j++) {
                  
                    for (let x = 0; x < filterSearchInfo.genres.length; x++) {
                        if (filterSearchTemp2[i].genre_ids[j] === filterSearchInfo.genres[x]) {
                            filterSearchResults.push(filterSearchTemp2[i]);

                        }
                    }
                }
            }
            
            console.log(filterSearchResults);
            
            
        };
        r.send();
        
    });
});









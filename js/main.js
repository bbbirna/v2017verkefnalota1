
class MovieAPI {

  constructor(APIName){
    this.APIName = APIName;
    
    if (this.APIName=="themoviedb") {
      this.rootURL="https://api.themoviedb.org/3/movie/";
      // this.actorRootURL="https://api.themoviedb.org/3/person/287/";
      this.token ="6c6774fdc0da477c7a3f3f7c03048117";
    }
  }

  getPopularMovies(callback){
    this.getData('popular', function(results) {
      callback(results);
    });
  }

  getRecentMovies(callback){
    this.getData('now_playing', function(results) {
      callback(results);
    });
  }

  getComedyMovies(callback){//getter becomes an attribute when you an instance
    this.getData('upcoming', function(results) {
      callback(results);
    });
  }

  getActorName(callback){//getter becomes an attribute when you an instance
    this.getActorData('/credits', function(actorResults) {
      callback(actorResults);
    });
  }

  // getActorName(callback){//getter becomes an attribute when you an instance
  //   this.getData('movie_id', function(results) {
  //     callback(results);
  //   });
  // }


  getData(queryCategory, callback){//callback is a parameter that is a function that is used whenever getData is called
    let AJAX = new XMLHttpRequest();
    AJAX.open("GET", this.rootURL + queryCategory + '?api_key=' + this.token);
    // AJAX.setRequestHeader("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGExN2FiNjk1ODFhYzcwMmM0YmM4ZjciLCJnbG9iYWxhZG1pbiI6ZmFsc2UsImFkbWluIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJmdWxsbmFtZSI6Ikp1ZHkgTmplcnUiLCJlbWFpbCI6Im5qZXJ1anVkeTg3QHltYWlsLmNvbSIsInVzZXJuYW1lIjoianVkeV9uamVydSIsInBhc3N3b3JkIjoiJDJhJDA4JGNpbVlsY3V3WHViaEI0T2c3Q3BQRmVFMVJjaENBOGdSQ2tLNWszZDFHUkx6YkVsYXF3WjdDIiwiZG9tYWluIjoidmVmc2tvbGkuaXMiLCJtZXNzYWdlIjoic3R1ZHkgcHJvamVjdFxyXG5cclxuIiwiaWF0IjoxNDg3MDg3Nzg5LCJleHAiOjE0ODcxNzQxODl9.uejVEAYnZGQurhnztGLwdkonAP_YEenVraevyaGeTpc");
    
    AJAX.onreadystatechange = function(){

      if(AJAX.readyState != 4 || AJAX.status != 200){
        return;
      }

      let results = JSON.parse(AJAX.responseText).results;
        callback(results);
    };
    AJAX.send();
  }

  getActorData(queryCategory, callback) {
    let AJAX = new XMLHttpRequest();
      AJAX.open("GET", this.rootURL  + queryCategory + '?api_key=' + this.token);
      AJAX.onreadystatechange = function() {
        if (AJAX.readyState != 4 || AJAX.status != 200) {
         return;
        }
        let actorResults = JSON.parse(AJAX.responseText).cast;
        console.log(actorResults);
        callback(actorResults);
      };
      AJAX.send();

  }
}




const image_path = "http://image.tmdb.org/t/p/original";
let theMovieDBInstance = new MovieAPI('themoviedb');






theMovieDBInstance.getPopularMovies(function(results) {
    console.log(results);
 
    for( let i=0; i< results.length; i++){
      let genres = [];
      let genreString = "";
      results[i].genre_ids.forEach(function(id){
        genres = APIS.genres.filter(function(genre){
          return genre.id === id;
        });
      });//close forEach
      genres.forEach(function(genre){
        genreString += "<h4>" +genre.name +"</h4>";
      });

      let title = results[i].title;
      let image = results[i].poster_path;
      let rating = results[i].vote_average;
      let movieId = results[i].id;
     

      let movieTitle = '<div class="skew slide-single columns small-12 large-5 medium-5">\
                          <img class="image" id="'+movieId+'"src="'+image_path + image+'"/> <div id="rogue">\
                          <h2>'+title+'</h2><h3 class="movie-actors"></h3>\
                          <h4>'+genreString+'</h4></div>\
                          <div id="floating-button">\
                            <h2>'+rating+'</h2>\
                          </div>\
                        </div>'

      let wrapper = document.getElementById('popularwrapper');
      wrapper.innerHTML += movieTitle;
    }//close for loop


    theMovieDBInstance.getActorName(function(actorResults) {
      console.log(actorResults);
      for(let i=0; i<actorResults.length; i++){

        $('.movie-actors').html (actorResults[i].character + " | ");
      }

     
    });


// RENDER ABOUT-MOVIE PAGE
    $('.image').click(function() {
      let AJAX = new XMLHttpRequest();
      AJAX.open("GET", 'https://api.themoviedb.org/3/movie/'+ this.id +'?api_key=6c6774fdc0da477c7a3f3f7c03048117&language=en-US');
      AJAX.onreadystatechange = function(){
        if(AJAX.readyState != 4 || AJAX.status != 200){
          return;
        }
        let results = JSON.parse(AJAX.responseText);
        console.log(results);

        let movieId = results.id;
        let title = results.title;
        let image = results.poster_path;
        let rating = results.vote_average;
        let year = results.release_date;
        let duration = results.runtime;
        let plot = results.tagline;
        let storyline = results.overview;
       

        let movieDetails = 
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Movie Info</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css?family=Oswald:300,400,700" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:400,700" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="css/foundation.min.css">
          <link rel="stylesheet" type="text/css" href="css/styles.css">
        </head>
        <body>
        <header id="header" class=" zindex movieinfo-header"><img class="image" src="${image_path + image}"/>
            <div class="top-bar ">
                <div class="top-barleft small-1">
                  <ul class="menu">
                      <li class="menu-text">
                        <a href="#">
                          <img class="header-logo" src="images/Moviebox-logo.png">
                        </a>
                      </li>
                  </ul>
                </div>
              <div class="top-barright small-1">
                  <ul class="menu">
                      <li>
                        <img class="search-icon" src="images/search.png">
                      </li>
                  </ul>
              </div>
            </div><!--close top-bar-->
        </header>     
        <div class="skeww"></div>

        <div class="rating small-3 medium-2 large-4">
          <p id="rate-number">${rating}</p>
            <p id="out-of">out of 10</p>
        </div><!--close rating-->
        <div class="row movie-poster small-5 medium-6 large-6 "><img class="image" src="${image_path + image}"/></div>
        <div class="mobile-year small-6">
            <div class="row">
              <h3 class="column small-6">Year</h3>
              <h3 class="column small-6">Duration</h3>
          </div>
          <div class="row ">
              <h4 class="column small-6">${year}</h4>
              <h4 class="column small-6">${duration}</h4>
          </div>
        </div><!--close mobile-year-->
        <div class="info">
            <div class="wrapper small-6 medium-6 large-6">
                <div class="row">
                  <h1 class="font">
                    <span class="bold">${title}</span>
                    <span class="bold"></span>
                  </h1>
                </div>
              <div class="row">
                <h2> ${year}</h2>
              </div>
              <div class="row">
                <h3>
                  <span class="bold-title">Director:</span>
                  <span class="regular-name">Gareth Edwards</span>
                </h3>
              </div>
              <div class="row writers">
                <h3>
                  <span class="bold-title">Writers:</span>
                  <span class="regular-name">Chris Weitz and Tony Gilroy</span>
                </h3>
              </div>
            </div><!--wrapper-->
        </div><!--close info-->
        <div class="more-info-wrapper">
            <div class="row">
              <h3 class="column small-6"><span class="bold-font">Duration: </span><span class="regular-font">${duration}</span></h3>
            </div>
            <div class="row">
              <h3 class="column small-6"><span class="bold-font">Genre: </span><span class="regular-font">Action, Adventure, Sci-Fi</span></h3>
            </div>
        </div><!--close more-info-wrapper-->
        <!---
        class mobile-storyline  and mobile-main-cast is only displayed in mobile devices
        -->
        <div class="mobile-storyline">
          <div class="row">
              <h3 class="column small-6">Storyline</h3>
          </div>
          <div class="row">
              <div class="column small-12"">
                  <div class="mobile-storyline-info">${storyline}</div> 
              </div>
          </div>
        </div><!--close mobile-storyline-->
        <div class="mobile-main-cast">
          <div class="row">
              <h3 class="column small-6">Cast</h3>
          </div>
          <div class="row ">
                <div class="small-3 columns image-padding">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Felicity Jones</div>
                    </div>
                </div>
                <div class="small-3 columns image-padding">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Diego Luna</div>
                    </div>
                </div>
                <div class="small-3 columns image-padding">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Forest Whitaker</div>
                    </div>
                </div>
                <div class="small-3 columns image-padding">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Wen Jiang</div>
                    </div>
                </div>
            </div>
        </div> <!--close mobile-main-cast-->
        <div class="movie-summary">
          <div class="row">
              <h3 class="column small-6">Stills</h3>
              <h3 class="column small-6 plot-heading">Plot</h3>
          </div>
          <div class="row">
              <div class="small-12 medium-6 large-6 columns movie-stills">
                  <img class="small-6 columns" src="${image_path + image}">
                  <img class="small-6 columns" src="${image_path + image}">
              </div>
              <div class="small-12 medium-6 large-6 columns">
                  <div class="plot">${plot}</div> 
                  <h3 class="storyline">Storyline</h3>
              </div>
          </div>
        </div><!--close movie-summary-->
        <div class="movie-summary-2">
          <div class="row">
              <div class="small-6 columns movie-stills-2">
                  <img class="small-3 columns" src="${image_path + image}">
                  <img class="small-3 columns" src="${image_path + image}">
              </div>
              <div class="small-6 columns">
                  <div class="storyline-info">
                  ${storyline}
                  </div>   
              </div>
          </div>
        </div><!--close movie-summary-2-->
        <div class="main-cast">
          <div class="row">
              <h3 class="column small-6">Cast</h3>
          </div>
          <div class="row ">
                <div class="small-3 columns image-padding-1">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Felicity Jones</div>
                    </div>
                </div>
                <div class="small-3 columns">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Diego Luna</div>
                    </div>
                </div>
                <div class="small-3 columns image-padding-3">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Forest Whitaker</div>
                    </div>
                </div>
                <div class="small-3 columns image-padding-4">
                    <img src="http://www.newsarama.com/images/i/000/173/307/i02/000344938756500.jpg">
                    <div class="row labelrow">
                        <div class="small-12 columns cast-name">Wen Jiang</div>
                    </div>
                </div>
            </div>
        </div><!--close main-cast-->
          <div id="myId">
            
          </div>
        <footer>
          <div class="row align-center">
            <img class="footer-logo" src="images/Moviebox-logo.png">
          </div>
          <div class="row align-center">
            <div class="columns large-2 medium-2 small-12">
              <h4>About</h4>
            </div>
            <div class="columns large-2 medium-2 small-12">
              <h4>Term of Use</h4> 
            </div>
            <div class="columns large-2 medium-2 small-12">
              <h4>FAQ</h4>
            </div>
            <div class="columns large-2 medium-2 small-12">
              <h4>Privacy</h4> 
            </div>
            <div class="columns large-2 medium-2 small-12">
              <h4>Contact Us</h4> 
            </div>
          </div>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        </footer>
        </body>
        </html>`

        document.body.innerHTML = movieDetails;

      };
      AJAX.send();
    });
});







theMovieDBInstance.getRecentMovies(function(results) {
    console.log(results);
    for( let i=0; i< results.length; i++){
      let genres = [];
      let genreString = "";
      results[i].genre_ids.forEach(function(id){
        genres = APIS.genres.filter(function(genre){
          return genre.id === id;
        });
      });//close forEach
      genres.forEach(function(genre){
        genreString += "<h4>" +genre.name +"</h4>";
      });

      let title = results[i].title;
      let image = results[i].poster_path;
      let rating = results[i].vote_average;
     

      let movieTitle = '<div class="skew slide-single columns small-12 large-5 medium-5">\
                          <img class="image" src="'+image_path + image+'"/> <div id="rogue">\
                          <h2>'+title+'</h2><h3>Felicity Jones | Diego Luna | Forest Whitaker</h3>\
                          <h4>'+genreString+'</h4></div>\
                          <div id="floating-button">\
                            <h2>'+rating+'</h2>\
                          </div>\
                        </div>'

      let wrapper = document.getElementById('recentmovieswrapper');
      wrapper.innerHTML += movieTitle;
    }//close for loop
});


theMovieDBInstance.getComedyMovies(function(results) {
    console.log(results);
    for( let i=0; i< results.length; i++){
      let genres = [];
      let genreString = "";
      results[i].genre_ids.forEach(function(id){
        genres = APIS.genres.filter(function(genre){
          return genre.id === id;
        });
      });//close forEach
      genres.forEach(function(genre){
        genreString += "<h4>" +genre.name +"</h4>";
      });

      let title = results[i].title;
      let image = results[i].poster_path;
      let rating = results[i].vote_average;
     

      let movieTitle = '<div class="skew slide-single columns small-12 large-5 medium-5">\
                          <img class="image" src="'+image_path + image+'"/> <div id="rogue">\
                          <h2>'+title+'</h2><h3>Felicity Jones | Diego Luna | Forest Whitaker</h3>\
                          <h4>'+genreString+'</h4></div>\
                          <div id="floating-button">\
                            <h2>'+rating+'</h2>\
                          </div>\
                        </div>'

      let wrapper = document.getElementById('comedywrapper');
      wrapper.innerHTML += movieTitle;
    }//close for loop
});







// Authenticate themoviedatabase with a key

// var AJAX = new XMLHttpRequest();
// AJAX.open("GET", "https://api.themoviedb.org/3/movie/550?api_key=6c6774fdc0da477c7a3f3f7c03048117");
// AJAX.onreadystatechange = function(){
//  if(AJAX.readyState != 4 || AJAX.status != 200){
//      return;
//  }
//  const response = JSON.parse(AJAX.responseText)
//  // data = AJAX.responseText;
//  console.log(response);
// }
// AJAX.send();



// Authenticate kvikmyndir with a key

// $.ajax({
//     url : 'http://api.kvikmyndir.is/authenticate',
//     type : 'POST',
//     data : {
//         username : "judy_njeru",
//         password : "1timberlake"
//     },
//     dataType : 'json',
//     success : function (response) {
//         console.log(response);
//     }
// });









        



   
                        

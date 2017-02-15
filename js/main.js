
class MovieAPI {

  constructor(APIName){
    this.APIName = APIName;
    
    if (this.APIName=="themoviedb") {
      this.rootURL="https://api.themoviedb.org/3/movie/";
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
     

      let movieTitle = '<div class="skew slide-single columns small-12 large-5 medium-5">\
                          <img class="image" src="'+image_path + image+'"/> <div id="rogue">\
                          <h2>'+title+'</h2><h3>Felicity Jones | Diego Luna | Forest Whitaker</h3>\
                          <h4>'+genreString+'</h4></div>\
                          <div id="floating-button">\
                            <h2>'+rating+'</h2>\
                          </div>\
                        </div>'

      let wrapper = document.getElementById('popularwrapper');
      wrapper.innerHTML += movieTitle;
    }//close for loop
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








        



   
                        

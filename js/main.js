// var r = new XMLHttpRequest();
// r.open("GET", "https://api.themoviedb.org/3/movie/550?api_key=3c2e3323fb6685239c36ee9312c7bcb0", true);
// r.onreadystatechange = function () {
//   if (r.readyState != 4 || r.status != 200) return;
//   const response = JSON.parse(r.responseText)
//   const container = document.createElement("div");
//   const image = document.createElement("img");
//   const title = document.createElement("h1");
//   image.src = "http://image.tmdb.org/t/p/original" + response.backdrop_path
//   title.innerHTML = response.original_title;
//   container.append(image);
//   container.append(title);
//   document.body.append(container);
// };
// r.send("banana=yellow");



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





//MOVIE LIST
let movieDatabases = [];



// get data fromkvikmyndir
let AJAX = new XMLHttpRequest();
AJAX.open("GET", "http://api.kvikmyndir.is/upcoming");
AJAX.setRequestHeader("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGExN2FiNjk1ODFhYzcwMmM0YmM4ZjciLCJnbG9iYWxhZG1pbiI6ZmFsc2UsImFkbWluIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJmdWxsbmFtZSI6Ikp1ZHkgTmplcnUiLCJlbWFpbCI6Im5qZXJ1anVkeTg3QHltYWlsLmNvbSIsInVzZXJuYW1lIjoianVkeV9uamVydSIsInBhc3N3b3JkIjoiJDJhJDA4JGNpbVlsY3V3WHViaEI0T2c3Q3BQRmVFMVJjaENBOGdSQ2tLNWszZDFHUkx6YkVsYXF3WjdDIiwiZG9tYWluIjoidmVmc2tvbGkuaXMiLCJtZXNzYWdlIjoic3R1ZHkgcHJvamVjdFxyXG5cclxuIiwiaWF0IjoxNDg2OTgxMzE3LCJleHAiOjE0ODcwNjc3MTd9.A3CS_PEWOhuas0dt5_cxBBAeiNqJ5XCXYdp515O55KA");
const renderMovies = function(){
    if(AJAX.readyState != 4 || AJAX.status != 200){
        return;
    }
    let movieList = JSON.parse(AJAX.responseText)
    console.log(movieList);

    // movieDB = response;
    getMovie(movieList);
    
}
AJAX.onreadystatechange = renderMovies
AJAX.send();



class Movie {
    constructor(info){
        $.extend(this,info);
    }

    // get title(){
    //  return this.title;
    // }
}


function getMovie (movieList){

    for( let movieInfo of movieList){
        let movieDatabase =new Movie(movieInfo); //create new movie from movie class
        movieDatabases.push(movieDatabase)//push movieDataBase into the movie databases array
    }

    for( let movieDatabase of movieDatabases){
        displayMovie(movieDatabase);
    }

    console.log(movieDatabases);
    console.log(movieList[0].title);

function displayMovie(movieDatabase){

// for(i=0; i < 1; i++) {
    let poster = movieDatabase.poster;

    let moviePoster = '<div class="skew columns small-12 large-5 medium-5"><img class="image" src="'+poster+'"/> <div id="rogue"><h2>Rogue One: Star Wars</h2><h3>Felicity Jones | Diego Luna | Forest Whitaker</h3><h4>Action, Adventure, Sci-FI</h4></div></div>'

    let wrapper = document.getElementById('imagewrapper');

    console.log(moviePoster);

    wrapper.innerHTML += moviePoster;


 // let image = document.createElement("img");

 //  image.src = movieDatabase.poster;
 //  document.querySelector("#movie-poster").appendChild(image);

    // let title = document.createElement("h1");
    // title.innerHTML = movieDatabase.title;
    // document.querySelector("#myId").appendChild(title);
}
}



   
                        



   
                        

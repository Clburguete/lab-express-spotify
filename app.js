/* jshint esversion: 6*/
const express = require('express');
const SpotifyWebApi   = require('spotify-web-api-node');
const spotify         = new SpotifyWebApi();
const morgan     = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// We create our own server named app
// Express server handling requests and responses
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layouts/main_layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(morgan('dev'));

//homepage route

app.get('/', (request, response) => {

  response.render('index');
});

//artist controller
let controller = (req, res) =>{
  
  console.log(req.body);
  spotify.searchArtists(req.body.artist, {}, (err, data) => {
    if (err) throw err;
    let artists = data.body.artists.items;
    //console.log(artists);
    res.render('artist', {artists});
  });

};
//artist route
app.post('/artists', controller);


// spotify.searchArtists("The Beatles", {}, (err, data) => {
//   if (err) throw err;
//
//   let artists = data.body.artists.items;
//   console.log(artists);
// });






//Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});

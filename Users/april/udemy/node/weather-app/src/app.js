const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');


//define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'me'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'me'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'help me........'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'article not found'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'page not found'
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
});

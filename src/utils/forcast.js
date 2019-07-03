const request = require('request');


const forcast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/83ef1a450cb2a3073a5833a5d026792f/${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    const { temperature, precipProbability, summary } = body.currently;
    if (error) {
      callback('The weather app could not be reached', undefined)
    } else if (body.error) {
      callback('Could not find the weather in your area, Please check again', undefined)
    } else {
      callback(undefined, `Today is ${summary} and currently ${temperature} degrees out. There is a ${precipProbability} % of rain.`)
    }
  })
}
module.exports = forcast

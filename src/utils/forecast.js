const request = require('request')

const forecast = (lat,lon,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=6c7448077126f752ea0300dbc66a0daa&query=' + lat + ',' + lon

    request({ url, json: true}, (error, { body } = {}) => {

        if(error) {
            callback('Unable to connect to forecast services!',undefined)
        }
        else if(body.error){
            callback('unable to find your location!',undefined)
        }
        else {
            const current = body.current
            callback(undefined, current.weather_descriptions[0] + '. it is currently ' +
             current.temperature + ' degress out. It feels like ' + current.feelslike +
              ' degress out. The humidity is ' + current.humidity + '%')
        }
    })
}

module.exports = forecast
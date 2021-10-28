const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaW1yeSIsImEiOiJja3Y3d2sxb2cyamlvMnJscDBhNjgwZGE4In0.RIexUS_wcoGUoqTs-iVwmw&limit=1'
    
    request({ url, json: true}, (error, { body } = {}) => {
        
        if(error) {
            callback('Unable to connect to location services!',undefined)
        } else if(body.features.length === 0) {
            callback("Unable to find your location, please try again!",undefined)
        } else {
            const location = body.features[0]
            callback(undefined,{
                lat: location.center[1],
                lon: location.center[0],
                placeName: location.place_name
            })
        }
    })
}
module.exports = geocode
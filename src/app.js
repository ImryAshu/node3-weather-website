const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express configs
const directory = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handelbars engine and view location
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// if we change the name of the folder from 'views' we need to explain node the new folder name
const viewPaths = path.join(__dirname, '../templates/views')
app.set('views',viewPaths)


//setup static directory to serve
app.use(express.static(directory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Imry Ashur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Imry Ashur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!',
        name: 'Imry Ashur',
        text: 'some helpful text...'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.search
    geocode(address, (error,{lat,lon,placeName} = {}) => {

        if(error) {
            return res.send({ error })
        }

        forecast(lat,lon, (error, response) => {

            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: response,
                placeName,
                address
            })
        })
    })  
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: [{
            search: req.query.search
        }]
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: 'Help article not found.',
        title: '404',
        name: 'Imry Ashur'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorText: 'Page not found.',
        title: '404',
        name: 'Imry Ashur'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
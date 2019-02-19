const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var col1, col2, col3, col4 = null
var predicted = null

app.get('/', function (req, res) {
    res.render("index.ejs", {predicted: predicted})
})

app.post('/test', function (req, res) {
    col1 = req.body.col1
    col2 = req.body.col2
    col3 = req.body.col3
    col4 = req.body.col4
    var url = 'https://ussouthcentral.services.azureml.net/workspaces/df84624865ec4fb09ed1e7efd40f12ee/services/35cd24c793b3452a9c16f59f4a9a4355/execute?api-version=2.0&format=swagger'
    var data = {
        "Inputs": {
            "input1":
                [
                    {
                        'Col1': col1.toString(),
                        'Col2': col2.toString(),
                        'Col3': col3.toString(),
                        'Col4': col4.toString(),
                        'Col5': "###",
                    }
                ],
        },
        "GlobalParameters": {
        }
    }

    var params = {
        headers: {
            'content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer Do59mTPFFbyuKj8ZqjUiiugMhLx3Y5gg9B/EeD1D5DHwh79GqLV1otkNn2k9ujfVvD6by4cU8gZJE+ZoUkAaOw=='
        },
        body: JSON.stringify(data),
        method: 'POST'
    }

    fetch(url, params)
        .then(data => (data.json()))
        .then(resx => {console.log(resx.Results.output1)
                    predicted = resx.Results.output1[0]['Scored Labels']
                    console.log('PREDICTED', predicted)
                    res.redirect('/')}
                    )
        .then()
        
})


app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Server started')
})


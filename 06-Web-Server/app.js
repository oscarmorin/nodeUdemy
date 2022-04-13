const hbs = require('hbs');
const express = require('express')

const app = express()
const port = 3000


//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials');

//Servir contenido estatico
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render( 'home', {
        nombre: ' Oscar Morin ',
        titulo: 'Curso de Node'
    } );
  })

app.get('/generic', (req, res) => {
    res.render( 'generic', {
        nombre: ' Oscar Morin ',
        titulo: 'Curso de Node'
    } );
  })

app.get('/elements', (req, res) => {
    res.render( 'elements', {
        nombre: ' Oscar Morin ',
        titulo: 'Curso de Node'
    } );
  })

app.get('/*', (req, res) => {
    res.sendFile( __dirname + '/public/error.html' );
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
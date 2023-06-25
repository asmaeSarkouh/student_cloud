// import express
const express = require("express");
const studentRoute=require('./router/RouteStudent')
const userRoute = require('./router/RouteUser')
const produitRoute = require('./router/RouteProduit')
const utilisateurRoute=require('./router/RouteUtilisateur')
const app = express();
const ejs = require('ejs')
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine','ejs')
// import Connect
require("./DBconnect");

app.use(express.json());
app.use(bodyParser.urlencoded())
app.use('/api/v1/students/',studentRoute)
app.use('/api/v1/users/', userRoute)
app.use('/api/v1/produits/', produitRoute)
app.use('/api/v1/utilisateur/', utilisateurRoute)
//server produit 
app.get('/', async(req, res) => {
  const produit = await axios.get('http://localhost:5000/api/v1/produits')
  console.log(produit);
  res.render('home',{produit:produit.data})
})
app.post('/add', async (req, res) => {
  const response = await axios.post('http://localhost:5000/api/v1/produits/add', req.body)
  res.redirect('/')
})
app.get('del/:code', async (req, res) => {
  console.log(req.params.code)
})
app.get('edit/:code', async (req, res) => {
  const response = await axios.get('http://localhost:5000/api/v1/produits/' + req.params.code)
  const produit = response.data
  res.render('editS', { produit: produit })
})
app.get('/edit', async (req, res) => {
  const response = await axios.put('http://localhost:5000/api/v1/produits/' + req.params.code + '/edit', req.body)
  res.redirect('/')
})
//server :path
app.get('/', async(req, res) => {
  const title = "conextion"
  const response = await axios.get('http://localhost:5000/api/v1/students')
  const student = response.data
  console.log(student);
  res.render('home',{title,student:student})
})
app.post('/add',async (req, res) => {
  const response = await axios.post('http://localhost:5000/api/v1/students/add', req.body)
  res.redirect('/')
  console.log(response.message);

})
app.get('del/:code', async(req, res) => {
  const response = await axios.delete('http://localhost:5000/api/v1/students/'+req.params.code)
  res.redirect('/')
})
app.get('editS/:code', async (req, res) => {
  const title = "edit form"
  const response = await axios.get('http://localhost:5000/api/v1/students/'+req.params.code)
  const student = response.data
  console.log(student);
  res.render('editS', { title, student: student.data })
})
app.post('/editS', async (req, res) => {
  const response =await axios.put('http://localhost:5000/api/v1/students/'+ req.params.code +'/edit',req.body)
  res.redirect('/')
  console.log(response.message);
})
// Server :  path
app.listen(5000, () => {
  console.log("__Server Word__");
});
 
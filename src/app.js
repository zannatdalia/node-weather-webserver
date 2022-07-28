const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express()

//define path for express
const publicDirectoryPath=path.join(__dirname,'../public')
const templatePath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',templatePath)
hbs.registerPartials(partialPath)

//set staticdirrectory to serve
app.use(express.static(publicDirectoryPath))

//home
app.get('',(req,res)=>{
  res.render('index',{
    title:'weather',
    name:'zannat'
  })
})

//help
 app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is a helpful text',
        title:'help',
        name:'zannat'
    })
})
 //about
 app.get('/about',(req,res)=>{
     res.render('about',{
        title:'about me',
        name:'zannat'
     })
 })


//weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
            return res.send({
                Error:'You must have to provide address'
            })
    }

    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lattitude, longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                     forecast: forecastData,
                     location,
                     address:req.query.address
                 })
        })
    
     })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'You must have to provide search term'
        })
    }
    res.send({
        products:[]
    })
})


 //404 page 
 app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'zannat',
        errorMassage:'page not found'
    })
 })

 app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'zannat',
        errorMassage:'text not found'
    })
 })

app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})
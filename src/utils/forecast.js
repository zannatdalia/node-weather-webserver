const request=require('request')
const forecast=(lattitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/c91acf5d43272001916e562b38c0484f/'+lattitude+','+longitude+'?units=si'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Network error',undefined) 
        }
        else if(response.body.error){
            callback('unable to find location',undefined) 
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+'It is currently '+response.body.currently.temperature+' degrees out.There is '+response.body.currently.precipProbability+' % chance to rain'+'.') 

        }
    })
}
module.exports=forecast
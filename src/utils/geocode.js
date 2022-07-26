const request=require('request')

 const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZGFyay1wYWNpZmljIiwiYSI6ImNqdjR3dm50cjB4czY0NG41ZG45Ym5iN3oifQ.IneVdbYeRu3w_O16X2wtzg&limit=1'
   
    request({url:url,json:true},(error,response)=>{
        //console.log(response.body)
        //console.log(response.body.features.center[0])
        if(error){
            callback('unable to connect server',undefined)
        }
        else if(response.body.features.length===0){
            callback('unable to find location.try another search', undefined)
            
        }
        else{
        callback(undefined,{
            lattitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name,
        })
         
        }

    })
 }
module.exports=geocode
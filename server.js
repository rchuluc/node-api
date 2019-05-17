const express = require('express')
const app = express() 

const db = require('./data/data.json')
const data = db.data

const filterBy = (req, res, next) =>{
    filteredData = []
    
    if(req.query.up){
        data.forEach((item) => {
            const value = item.mkt_variation.split('$')[1]
            if(value >= 0){
              filteredData.push(item)    
            }
        })
        req.data = filteredData
        next()

    } else if(req.query.down){
        data.forEach((item) => {
            const value = item.mkt_variation.split('$')[1]
            if(value < 0){
                filteredData.push(item)
            }
        })
        req.data = filteredData
        next()
        
    } else {
        req.data = data
        next()
    }
}

app.use(filterBy);
app.get('/', (req,res) => {
    res.send(req.data) 
})

app.listen(3000, ()=> console.log('Listen to 3000'))
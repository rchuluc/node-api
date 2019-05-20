const express = require('express')
const cors = require('cors')
const app = express() 
const db = require('./data/data.json')


const filterByName = (data, query) =>{
    data.length == 0 ? data = db.data : data = filteredData

    data.forEach((item) => {
        name = item.name.toLowerCase()
        query.toLowerCase()
        if(name.search(query) != -1){
            filteredData.push(item)
        }
    })
}

const filterByPositive = (data) =>{
    data.length == 0 ? data = db.data : data = filteredData
    positiveData = []

    data.forEach((item) => {
        const value = item.mkt_variation.split('$')[1]
        if(value >= 0){
          positiveData.push(item)    
        }
    })

    filteredData = positiveData
}

const filterByNegative = (data) =>{
    data.length == 0 ? data = db.data : data = filteredData
    negativeData = []

    data.forEach((item) => {
        const value = item.mkt_variation.split('$')[1]
        if(value < 0){
            negativeData.push(item)
        }
    })

    filteredData = negativeData
}

const orderAscending = (data) =>{
    data.length == 0 ? data = db.data : data = filteredData
    orderedData = []

    filteredData = data.sort((a,b) => {
        return a.mkt_variation.split('$')[1] - b.mkt_variation.split('$')[1]
    })
}

const orderDescending = (data) =>{
    data.length == 0 ? data = db.data : data = filteredData
    orderedData = []

    filteredData = data.sort((a,b) => {
        return b.mkt_variation.split('$')[1] - a.mkt_variation.split('$')[1]
    })
}

const filters = (req, res, next) =>{
    filteredData = []

    if(req.query.name){
        filterByName(filteredData, req.query.name)
    }

    if(req.query.up){
        filterByPositive(filteredData)
    } 
    
    if(req.query.down){
        filterByNegative(filteredData)
    } 
    
    if(req.query.order == 'asc'){
        orderAscending(filteredData)
    } 
    
    if(req.query.order == 'dec'){
        orderDescending(filteredData)
    }
    if(req.query.all){
        filteredData = db.data
    }

    req.data = filteredData
    next()
}

app.use(cors())
app.use(filters)

app.get('/', (req,res) => {
    if(req.data.length == 0){ //Check if array is empty
        res.json({data : null}) 

    } else {
        res.json(req.data) 
    }
})

app.listen(3000, ()=> console.log('Listen to 3000'))
const express = require('express')
const app = express() 

const db = require('./data/data.json')
const data = db.data

const filterBy = (req, res, next) =>{

    filteredData = []
    
    if(req.query.up){ //Positive values
        
        data.forEach((item) => {
            const value = item.mkt_variation.split('$')[1]
            if(value >= 0){
              filteredData.push(item)    
            }
        })

        if(req.query.order == 'asc'){ //Crescent order
            
            filteredData.sort((a,b) => {
                return a.mkt_variation.split('$')[1] - b.mkt_variation.split('$')[1]
            })

            req.data = filteredData
            next()
        }

        else if(req.query.order == 'des'){ //Decreasing order

            filteredData.sort((a,b) => {
                return b.mkt_variation.split('$')[1] - a.mkt_variation.split('$')[1]
            })

            req.data = filteredData
            next()
        }

        req.data = filteredData
        next()

    } else if(req.query.down){ //Negative values

        data.forEach((item) => {
            const value = item.mkt_variation.split('$')[1]
            if(value < 0){
                filteredData.push(item)
            }
        })
        
        req.data = filteredData
        next()

     
        
    } else if(req.query.name){ //Search by name

        data.forEach((item) => {
            name = item.name.toLowerCase()
            query = req.query.name.toLowerCase()
            if(name.search(query) != -1){
                filteredData.push(item)
            }
        })

        req.data = filteredData
        next()

    } else { //All Values
    
        req.data = data
        next()
    }
}

app.use(filterBy);

app.get('/', (req,res) => {
    res.send(req.data) 
})

app.listen(3000, ()=> console.log('Listen to 3000'))

window.onload = () => {

    
    const storage = window.localStorage
    
    if(storage.getItem('wallet') == null ){
        document.getElementById('tableContainer').style.display= 'none'

        
    } else {
        document.getElementById('tableContainer').style.display= 'block'

    }
   
    
   /* storage.setItem( 'data' , JSON.stringify({
        "name": "Intra-Cellular Therapies Inc.",
        "mkt_code": "ITCI",
        "mkt_sector": "Health Care",
        "mkt_cap": "$471.11M",
        "mkt_variation": "$-4.50"
      }))
*/
    
    document.getElementById('searchField').addEventListener('keyup', (event)=> {
        const inputValue = event.target.value
        if(inputValue.length > 3){
            getDataByName(inputValue)
        }
    })

    document.getElementById('searchForActions').addEventListener('click', () =>{
        console.log('clicked')
    })



} 
    
const getData = () =>{
    fetch('http://localhost:3000/?all=true',{
        method: 'GET',
        mode : 'cors'
    })
    .then(response => {
        return response.json() 
    })
    .then(data => {
        console.log(data)
        populateData(data)
    })
}

const getDataByName = (name) =>{
    fetch(`http://localhost:3000/?name=${name}`,{
        method: 'GET',
        mode : 'cors'
    })
    .then(response => {
        return response.json() 
    })
    .then(data => {
        console.log(data)
        return data
    })
}

const populateData = (data) =>{
    
    const tableBody = document.getElementById('walletData')
    let table = ''
    let index = 1
    const arrowUp = 'fas fa-long-arrow-alt-up text-success ml-2'
    const arrowDown = 'fas fa-long-arrow-alt-down text-danger ml-2'
    
    data.forEach(item => {
        const tableRow = `<tr>
        <th scope="row">${index}</th>
        <td>${item.mkt_code}</td>
        <td>${item.name}</td>
        <td>${item.mkt_cap}</td>
        <td>
        <p>${item.mkt_variation}<i class="${item.mkt_variation.split('$')[1] > 0 ? arrowUp : arrowDown}"></i></p>
        </td>
        </tr>`
        table += tableRow
        index ++
    })
    
    tableBody.insertAdjacentHTML('afterbegin', table )
    
}





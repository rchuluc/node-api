const storage = window.localStorage

window.onload = () => {

    updateWallet()

    document.getElementById('searchField').addEventListener('keyup', (event)=> {
        const inputValue = event.target.value
        if(inputValue.length >= 3){

            document.getElementById('home').classList.add('d-none')
            document.getElementById('search').classList.remove('d-none')
            document.getElementById('searchTableContainer').classList.remove('d-none')
            document.getElementById('searchData').innerHTML = ''
            getDataByName(inputValue, 'searchData')

        } else {
            document.getElementById('home').classList.remove('d-none')
            document.getElementById('search').classList.add('d-none')
        
        }
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

        return data
    })
}

const getDataByName = (name, container) =>{
    fetch(`http://localhost:3000/?name=${name}`,{
        method: 'GET',
        mode : 'cors'
    })
    .then(response => {
        return response.json() 
    })
    .then(data => {

        populateData(data, container)
    })
}

const getDataByCode = (code) =>{
    fetch(`http://localhost:3000/?code=${code}`,{
        method: 'GET',
        mode : 'cors'
    })
    .then(response => {
        return response.json() 
    })
    .then(data => {
        openBuyModal(data[0])
    })
}

const populateData = (data, container) =>{
    
    const tableBody = document.getElementById(container)
    let table = ''
    let index = 1
    const arrowUp = 'fas fa-long-arrow-alt-up text-success ml-2'
    const arrowDown = 'fas fa-long-arrow-alt-down text-danger ml-2'

    data.forEach(item => {
        const buyButton = `<td><button id="${item.mkt_code}" onclick="handleClick(this.id)" class="btn btn-outline-primary">add to wallet</button></td>`
       
        const tableRow = `<tr>
        <th scope="row">${index}</th>
        <td>${item.mkt_code}</td>
        <td>${item.name}</td>
        <td>${item.mkt_cap}</td>
        <td>
        <p>${item.mkt_variation}<i class="${item.mkt_variation.split('$')[1] > 0 ? arrowUp : arrowDown}"></i></p>
        </td>
        ${container === 'searchData' ? buyButton : ''}
        </tr>
        `
        table += tableRow
        index ++
    })
    
    tableBody.insertAdjacentHTML('afterbegin', table )
    
}

const handleClick = (id) =>{
    getDataByCode(id.toLowerCase())
}

const openBuyModal = (data) =>{
    
    const wallet = storage.getItem('wallet')

    if(wallet == null) {

        storage.setItem('wallet', JSON.stringify([data]))

    } else {
        const walletData = JSON.parse(wallet)
        walletData.push(data)
        storage.setItem('wallet', JSON.stringify(walletData))
    }
    
    updateWallet()
}

const updateWallet = () =>{

    const wallet = storage.getItem('wallet')
    
    if(wallet == null ){
        document.getElementById('emptyWallet').classList.remove('d-none')

    } else {
        
        document.getElementById('emptyWallet').classList.add('d-none')
        document.getElementById('tableContainer').classList.remove('d-none')
        document.getElementById('walletData').innerHTML = ''
        populateData(JSON.parse(wallet), 'walletData')
    }
}


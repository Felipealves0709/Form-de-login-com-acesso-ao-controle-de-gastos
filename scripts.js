const incomedisplay = document.querySelector('#money-plus')
const expensedisplay = document.querySelector('#money-minus')
const balancedisplay = document.querySelector("#balance")
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const transactionsUl = document.querySelector('#transactions')

const localstorageTransactions = JSON.parse(localStorage
.getItem('transactions'))

let transactions = localStorage
.getItem('transactions')!== null? localstorageTransactions :[]

const removeTransaction = ID => {
     transactions = transactions
        .filter(transaction => transaction.id !== ID)
        updateLocalStorage()
        init()
    }

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount <0? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)

    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `${transaction.name} <span>${operator} R$ ${amountWithoutOperator}
    </span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`

    transactionsUl.append(li) //primeira filha prepend =ultimo filho = vai opra baixo e append pra cima
    console.log(transaction)
}



const getexpenses = transactionsAmount =>
        Math.abs( transactionsAmount
        .filter(value => value < 0)
        .reduce((accumulator, value)=> accumulator + value, 0))
        .toFixed(2)


const getincome = transactionsAmount =>
    transactionsAmount
        .filter(value => value > 0)
        .reduce((accumulator, value)=> accumulator + value, 0).toFixed(2)

const getTotal = transactionsAmount => transactionsAmount
.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)



const updateBalanceValues = ()=>{
    const transactionsAmount = transactions
    .map(transaction => transaction.amount)
    
        const total = getTotal(transactionsAmount)
        const income = getincome(transactionsAmount)
        const expense = getexpenses(transactionsAmount)

        balancedisplay.textContent = `R$ ${total}`
        incomedisplay.textContent = `R$ ${income}`
        expensedisplay.textContent = `R$ ${expense}`

}

const init = ()=>{
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}
    init()

    const updateLocalStorage = () => {
        localStorage.setItem('transactions',JSON.stringify(transactions))
    }

    const generateId = () => Math.round(Math.random() * 1000)

    const addTotransactionsArray = (transactionName, transactionsAmount) => {
        transactions.push({ 
            id: generateId(),
            name: transactionName,
            amount: Number(transactionsAmount) 
   })
    }

    const cleanInputs = () =>{
        inputTransactionName.value = ''
        inputTransactionAmount.value = ''
    }

    const handleFormSubmit =  event =>{
        event.preventDefault()

        const transactionName = inputTransactionName.value.trim()
        const transactionsAmount = inputTransactionAmount.value.trim()
        const issSomeInputEmpty = transactionName === '' || transactionsAmount === ''

        if (issSomeInputEmpty){
            alert(`Por favor, Preencha tanto o nome quanto o valor da transação`)
            return
        }

        addTotransactionsArray(transactionName,transactionsAmount)
        init()
        updateLocalStorage()

    }

    form.addEventListener('submit', handleFormSubmit)
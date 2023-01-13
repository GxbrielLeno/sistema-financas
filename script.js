const transactionsUl = document.querySelector('#transactions')

const SaldoNegativo = document.querySelector('#money-plus')
const SaldoPositivo = document.querySelector('#money-minus')
const SaldoAtual = document.querySelector('#balance')
const type = document.querySelector("#type");



const form = document.querySelector('#form')
const InputTransactionName = document.querySelector('#text')
const InputTransactionAmount = document.querySelector('#amount')


const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))
let transacoes = localStorage.getItem('transactions') !== null ? localStorageTransaction : []

const remove = ID => {
    transacoes = transacoes.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}
const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount == "Entrada" ? '+' : '-'
    const typeClass = transaction.type == "Entrada" ? 'plus' : 'minus'
    const ClassName = typeClass
    const amountWithoutOperator = Math.abs(transaction.amount) // Faz o amount virar um NUMBER sem os - e +
    const li = document.createElement('li')
    li.classList.add(ClassName)
    li.innerHTML = `
        ${transaction.name} <span> ${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick="remove(${transaction.id})">X</button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    const amountIncomes = transacoes
        .filter((item) => item.type === "Saída")
        .map((transaction) => Number(transaction.amount));

    const amountExpenses = transacoes
        .filter((item) => item.type === "Entrada")
        .map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);

    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

    const totalItems = (totalExpenses - totalIncomes).toFixed(2);

    SaldoPositivo.innerHTML = `R$ ${totalIncomes}`;
    SaldoNegativo.innerHTML = `R$ ${totalExpenses}`;
    SaldoAtual.innerHTML = `R$ ${totalItems}`;
}
function getTotals() {

}


const init = () => {
    transactionsUl.innerHTML = ''
    transacoes.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()


const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transacoes))
}
const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', evet => {
    evet.preventDefault()

    const transactionName = InputTransactionName.value.trim()
    const transactionAmount = InputTransactionAmount.value.trim()

    if (InputTransactionAmount.value.trim() === `` || InputTransactionName.value.trim() === ``) {
        alert('preencha todos os campos')
        return
    }
    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount),
        type: type.value,
    }
    transacoes.push(transaction)
    console.log(transaction.type)
    init()
    updateLocalStorage()

    InputTransactionName.value = ''
    InputTransactionAmount.value = ''

})
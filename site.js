const Modal = {
  open() {
    //Abrir Modal
    //Adicionar a class active ao Modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    //Fechar o Modal
    //Remover a class active do Modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Aniversário",
    amount: -50000,
    date: "18/12/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 500000,
    date: "11/12/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: 50000,
    date: "07/12/2021",
  },
];

let incomes = 0;
let expenses = 0;
const Transaction = {
  income() {
    transactions.forEach(function(item) {
      if (item.amount > 0) {
        incomes = incomes + item.amount;
      }
    });
    return Utils.formatCurrency(incomes);
  },
  expense() {
    transactions.forEach(item => {
      if (item.amount < 0) {
        expenses = expenses + item.amount;
      }
    });
    return Utils.formatCurrency(expenses);
  },
  total() {
    return Utils.formatCurrency(incomes + expenses);
  },
};
/*
let incomes = 0;
let expenses = 0;
let total = 0;*/
const DOM = {
  transactionsContainer: document.querySelector(".data-table tbody"),
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;
    return html;
  },
  updateBalance() {
    /*
    let orderType = "";
    if (transaction.amount > 0) {
      incomes = incomes + transaction.amount;
    } else {
      expenses = expenses + transaction.amount;
    }

    let incomesFmt = Utils.formatCurrency(incomes);
    let expensesFmt = Utils.formatCurrency(expenses);
    let totalFmt = Utils.formatCurrency(incomes + expenses);*/

    incomesDisplay: document.getElementById("incomesDisplay").innerHTML =
      Transaction.income();
    expensesDisplay: document.getElementById("expensesDisplay").innerHTML =
      Transaction.expense();
    totalDisplay: document.getElementById("totalDisplay").innerHTML =
      Transaction.total();
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
};

transactions.forEach((item) => {
  //DOM.addTransaction(transactions[item.id-1]);
  DOM.addTransaction(item);
  //DOM.updateBalance(item);
});

DOM.updateBalance();
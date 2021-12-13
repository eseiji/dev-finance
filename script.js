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

const Transaction = {
  all: [
    {
      description: "Aniversário",
      amount: -100000,
      date: "18/12/2021",
    },
    {
      description: "Website",
      amount: 500000,
      date: "11/12/2021",
    },
    {
      description: "Internet",
      amount: -50000,
      date: "07/12/2021",
    },
  ],
  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },
  income() {
    let incomes = 0;
    Transaction.all.forEach(function (item) {
      if (item.amount > 0) {
        incomes = incomes + item.amount;
      }
    });
    return incomes;
  },
  expense() {
    let expenses = 0;
    Transaction.all.forEach((item) => {
      if (item.amount < 0) {
        expenses = expenses + item.amount;
      }
    });
    return expenses;
  },
  total() {
    return Transaction.income() + Transaction.expense();
  },
};

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
    incomesDisplay: document.getElementById("incomesDisplay").innerHTML =
      Utils.formatCurrency(Transaction.income());
    expensesDisplay: document.getElementById("expensesDisplay").innerHTML =
      Utils.formatCurrency(Transaction.expense());
    totalDisplay: document.getElementById("totalDisplay").innerHTML =
      Utils.formatCurrency(Transaction.total());
  },
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
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

const Form = {
  description: document.getElementById("description"),
  amount: document.getElementById("amount"),
  date: document.getElementById("date"),
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },
  formatData() {},
  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((item) => {
      //DOM.addTransaction(transactions[item.id-1]);
      DOM.addTransaction(item);
      //DOM.updateBalance(item);
    });

    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();

Transaction.add({
  description: "Monitor",
  amount: -100000,
  date: "18/12/2021",
});

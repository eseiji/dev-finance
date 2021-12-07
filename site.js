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
    amount: 20000,
    date: "07/12/2021",
  },
];

const Transaction = {
  icomes() {},
  expense() {},
  total() {},
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
      <td class="${CSSclass}">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;
    return html;
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    console.log(value);
  },
};

transactions.forEach((item) => {
  //DOM.addTransaction(transactions[item.id-1]);
  DOM.addTransaction(item);
});

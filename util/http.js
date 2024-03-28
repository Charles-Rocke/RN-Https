import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://expense-tracker-195eb-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}

import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 60.12,
    date: new Date("2024-01-19"),
  },
  {
    id: "e2",
    description: "A pair of socks",
    amount: 12.99,
    date: new Date("2024-01-12"),
  },
  {
    id: "e3",
    description: "Chipotle",
    amount: 24.11,
    date: new Date("2024-02-15"),
  },
  {
    id: "e4",
    description: "Groceries",
    amount: 100.12,
    date: new Date("2024-03-01"),
  },
  {
    id: "e5",
    description: "A book",
    amount: 18.24,
    date: new Date("2024-03-24"),
  },
  {
    id: "e6",
    description: "A pair of socks",
    amount: 12.99,
    date: new Date("2024-01-12"),
  },
  {
    id: "e7",
    description: "Chipotle",
    amount: 24.11,
    date: new Date("2024-02-15"),
  },
  {
    id: "e8",
    description: "Groceries",
    amount: 100.12,
    date: new Date("2024-03-01"),
  },
  {
    id: "e9",
    description: "A book",
    amount: 18.24,
    date: new Date("2024-03-24"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "add":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "update":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "delete":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "add", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "delete", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "update", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

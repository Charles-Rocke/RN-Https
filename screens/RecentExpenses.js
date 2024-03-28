import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      setIsLoading(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses in the last 7 days"
    />
  );
}

export default RecentExpenses;

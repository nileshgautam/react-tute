import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const useExpenses = () => {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  /**
   * This function is used to store the expenses.
   *
   * @param   {object}  expenseData
   *
   * @return  {void}
   */
  const addExpenses = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  const removeExpense = (id) => {
    return setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id != id),
    );
  };

  /**
   *This functon is used to get total amount.
   *
   * @return  {decimal}  this is returning total calculated values.
   */
  const getTotalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  /**
   * This function is used to get filter data.
   *
   * @param   {string}  category category selected by user from select
   *
   * @return  {array} returned filtered value.
   */
  const getExpensesByCategory = (category) => {
    if (!category || category == "all") return expenses;
    return expenses.filter((expense) => expense.category === category);
  };

  return {
    expenses,
    addExpenses,
    removeExpense,
    getTotalAmount,
    getExpensesByCategory,
  };
};

export default useExpenses;

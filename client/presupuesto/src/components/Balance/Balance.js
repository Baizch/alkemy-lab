import React, { createContext, useContext } from "react";

//initial state
const initialState = {
  transactions: [],
};

//context creation
const GlobalContext = createContext(initialState);

//balance calculator
export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div>
      <h4>${total}</h4>
    </div>
  );
};

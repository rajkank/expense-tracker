import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Money formatter function for Indian Rupees
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');

  // Format the number with commas and prepend INR symbol
  return (
    '₹ ' + (p[0].split('')[0] === '-' ? '-' : '') +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 2) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );

  return (
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">{moneyFormatter(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{moneyFormatter(expense)}</p>
        </div>
      </div>
  );
};

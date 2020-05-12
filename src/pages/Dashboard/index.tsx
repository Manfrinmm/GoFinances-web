import React, { useState, useEffect, useCallback } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ResponseData {
  transactions: Transaction[];
  balance: Balance;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  async function loadTransactions(): Promise<ResponseData> {
    const { data } = await api.get<ResponseData>('/transactions');

    const transactionsFormatted = data.transactions.map(
      (transaction: Transaction) => ({
        ...transaction,
        formattedValue: formatValue(transaction.value, transaction.type),
        formattedDate: formatDate(transaction.created_at),
      }),
    );

    const balanceFormatted = Object.fromEntries(
      Object.entries(data.balance).map(([key, value]) => [
        key,
        formatValue(value),
      ]),
    ) as unknown;

    const parsedBalanceFormatted = balanceFormatted as Balance;

    return {
      transactions: transactionsFormatted,
      balance: parsedBalanceFormatted,
    };
  }

  useEffect(() => {
    loadTransactions().then(response => {
      setBalance(response.balance);
      setTransactions(response.transactions);
    });
  }, []);

  useEffect(() => {
    loadTransactions().then(response => {
      setBalance(response.balance);
    });
  }, [transactions]);

  const handleRemoveTransaction = useCallback(async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);

      setTransactions(state =>
        state.filter(transaction => transaction.id !== id),
      );
    } catch (error) {
      console.log(error.response.data);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveTransaction(transaction.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

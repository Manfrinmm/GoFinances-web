const formatValue = (value: number, type?: 'outcome' | 'income'): string => {
  const formattedNumber = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return type === 'outcome' ? `- ${formattedNumber}` : formattedNumber;
};

export default formatValue;

// transaction.type === 'outcome'
//   ? `- ${formatValue(transaction.value)}`
//   : formatValue(transaction.value);

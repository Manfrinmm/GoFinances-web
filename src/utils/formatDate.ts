export default (date: Date): string =>
  new Date(date).toLocaleString().split(' ')[0];

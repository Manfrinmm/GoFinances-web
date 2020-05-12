export default (date: Date): string =>
  new Date(date).toLocaleDateString('pt-br');

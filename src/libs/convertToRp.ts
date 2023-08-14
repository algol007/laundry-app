export const convertToRp = (total: number) => {
  const result = Number(total)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return `Rp ${result}`;
};

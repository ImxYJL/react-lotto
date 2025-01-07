export const checkIsInteger = (value: string | number) => {
  const numberValue = typeof value === 'number' ? value : Number(value);

  return Number.isInteger(numberValue);
};

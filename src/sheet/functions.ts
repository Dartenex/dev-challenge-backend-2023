export const isStringNumeric = (value: string): boolean => {
  const pattern = /^\+?-?\d+(\.\d+)?$/;
  return pattern.test(value);
}

export const calculate = (expression: string): number => {
  return Function(`return ${expression}`)();
}

export const isValueFormula = (value: string): boolean => {
  return value.charAt(0) === '=';
}
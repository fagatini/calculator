import { Fraction } from "../classes/fraction";
import { regexps } from "../shared/regexps";

export const stringToData = (input: string) => {
  const [first, second] = input.split(regexps.operations);
  const a = [
    new Fraction(stringToFraction(first)),
    second === undefined ? undefined : new Fraction(stringToFraction(second)),
  ]
  return a;
};

export const stringToFraction = (value: string) => {
  const result: any = {sign: value.includes("±") ? -1 : 1};
  value = value.replaceAll("±", "");

  const splitedValue = value.split('→')

  switch (splitedValue.length) {
    case 0: 
      break;
    case 1:
      result.integer = splitedValue[0]
      break;
    case 2:
      result.numerator = splitedValue[0]
      result.denominator = splitedValue[1]
      break;
    case 3: default:
      result.integer = splitedValue[0]
      result.numerator = splitedValue[1]
      result.denominator = splitedValue[2]
      break;
  }
  
  return result;
};

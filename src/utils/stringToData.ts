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

  const splitByArrow = value.split('→')
  let fractionSide = splitByArrow[0]
  
  if (splitByArrow.length === 2 || !value.includes('→') && !value.includes('÷')) {
    result.integer = splitByArrow[0]
    fractionSide = splitByArrow[1]
  } 

  if (fractionSide && fractionSide.length) {
    const splitByDiv = fractionSide.split('÷')
    result.numerator = splitByDiv[0]
    result.denominator = splitByDiv[1]
  }

  return result;
};

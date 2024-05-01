import { Fraction } from "../classes/fraction";
import { regexps } from "../shared/regexps";

export const stringToData = (input: string) => {
  const [first, second] = input.split(regexps.operations, 2);

  return [
    new Fraction(stringToFraction(first)),
    new Fraction(stringToFraction(second)),
  ];
  // return [stringToFraction(first), stringToFraction(second)];
};

const stringToFraction = (value: string) => {
  const result: any = {};
  if (value.includes("→")) {
    result.integer = value.slice(0, value.indexOf("→"));
  }
  if (value.includes("|")) {
    const start = value.includes("→") ? value.indexOf("→") + 1 : 0;

    [result.numerator, result.denominator] = value
      .slice(start, value.length)
      .split("|");
  }
  return result;
};

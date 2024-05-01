export class Fraction {
  constructor(fraction) {
    if (fraction.denominator) {
      this.numerator = +fraction.numerator + (fraction.integer ? fraction.integer * fraction.denominator : 0);
      this.denominator = fraction.denominator;
    } else {
      this.numerator = fraction.integer;
      this.denominator = 1;
    }
  }

  sum(fraction) {
    const newNumerator = this.numerator * fraction.denominator + this.denominator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    return new Fraction({ numerator: newNumerator, denominator: newDenominator });
  }

  sub(fraction) {
    const newNumerator = this.numerator * fraction.denominator - this.denominator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    return new Fraction({ numerator: newNumerator, denominator: newDenominator });
  }

  mult(fraction) {
    const newNumerator = this.numerator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    return new Fraction({ numerator: newNumerator, denominator: newDenominator });
  }

  div(fraction) {
    const newNumerator = this.numerator * fraction.denominator;
    const newDenominator = this.denominator * fraction.numerator;
    return new Fraction({ numerator: newNumerator, denominator: newDenominator });
  }

  nod() {
    let a = this.numerator,
      b = this.denominator;
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    this.numerator = this.numerator / a;
    this.denominator = this.denominator / a;
  }

  toString() {
    this.nod();
    if (this.denominator === 1) {
      return this.numerator.toString();
    } else {
      return this.numerator + "|" + this.denominator;
    }
  }
}

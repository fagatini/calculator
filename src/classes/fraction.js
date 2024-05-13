export class Fraction {
  constructor(fraction) {
    if (fraction.denominator) {
      this.numerator = +fraction.numerator + (fraction.integer ? fraction.integer * fraction.denominator : 0);
      this.denominator = fraction.denominator;
    } else {
      this.numerator = fraction.integer;
      this.denominator = 1;
    }

    if (fraction.sign) {
      this.numerator = fraction.sign * this.numerator;
    }
  }

  sum(fraction) {
    const newNumerator = this.numerator * fraction.denominator + this.denominator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    return this.nod();
  }

  sub(fraction) {
    const newNumerator = this.numerator * fraction.denominator - this.denominator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    return this.nod();
  }

  mult(fraction) {
    const newNumerator = this.numerator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    return this.nod();
  }

  div(fraction) {
    const newNumerator = Math.abs(this.numerator * fraction.denominator);
    const newDenominator = Math.abs(this.denominator * fraction.numerator);
    this.numerator = newNumerator * Math.sign(this.numerator) * Math.sign(fraction.numerator);
    this.denominator = newDenominator;
    return this.nod();
  }

  pow(integer) {
    const newNumerator = Math.abs(this.numerator) ** integer;
    this.numerator = newNumerator * Math.sign(this.numerator) ** integer;
    this.denominator = this.denominator ** integer;
    return this.nod();
  }

  nod() {
    let a = Math.abs(this.numerator),
      b = this.denominator;
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return new Fraction({ numerator: this.numerator / a, denominator: this.denominator / a });
  }

  toString() {
    if (this.denominator === 1) {
      return this.numerator.toString().replace("-", "±");
    } else {
      return this.numerator.toString().replace("-", "±") + "→" + this.denominator;
    }
  }
}

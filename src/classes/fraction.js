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
    const newNumerator = Math.abs(this.numerator * fraction.denominator);
    const newDenominator = Math.abs(this.denominator * fraction.numerator);
    return new Fraction({
      numerator: newNumerator * Math.sign(this.numerator) * Math.sign(fraction.numerator),
      denominator: newDenominator,
    });
  }

  nod() {
    let a = Math.abs(this.numerator),
      b = this.denominator;
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    this.numerator = this.numerator / a;
    this.denominator = this.denominator / a;
  }

  toString(vievType) {
    this.nod();
    if (this.denominator === 1) {
      return this.numerator.toString().replace("-", "±");
    } else {
      if (vievType === "improper") {
        return this.numerator.toString().replace("-", "±") + "|" + this.denominator;
      } else {
        const unSignedNumerator = Math.abs(this.numerator);
        const sign = Math.sign(this.numerator) === -1 ? "±" : "";
        const integer = Math.floor(unSignedNumerator / this.denominator);
        const vievedInteger = integer !== 0 ? integer + "→" : "";
        const numerator = unSignedNumerator - integer * this.denominator;
        const vievedFraction = unSignedNumerator !== 0 ? numerator + "|" + this.denominator : "";
        const result = sign + vievedInteger + vievedFraction;
        return result;
      }
    }
  }
}

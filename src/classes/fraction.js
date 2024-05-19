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
    return this.toString();
  }

  sub(fraction) {
    const newNumerator = this.numerator * fraction.denominator - this.denominator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    return this.toString();
  }

  mult(fraction) {
    const newNumerator = this.numerator * fraction.numerator;
    const newDenominator = fraction.denominator * this.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    return this.toString();
  }

  div(fraction) {
    const newNumerator = Math.abs(this.numerator * fraction.denominator);
    const newDenominator = Math.abs(this.denominator * fraction.numerator);
    this.numerator = newNumerator * Math.sign(this.numerator) * Math.sign(fraction.numerator);
    this.denominator = newDenominator;
    return this.toString();
  }

  pow(integer) {
    const newNumerator = Math.abs(this.numerator) ** integer;
    this.numerator = newNumerator * Math.sign(this.numerator) ** integer;
    this.denominator = this.denominator ** integer;
    return this.toString();
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

  toString(vievType = "to mixed") {
    if (this.denominator == 0) {
      return "error";
    }

    this.nod();

    if (this.denominator === 1) {
      return this.numerator.toString().replace("-", "±");
    } else {
      if (vievType === "to mixed") {
        return this.numerator.toString().replace("-", "±") + "÷" + this.denominator;
      } else {
        const unsignedNumenator = Math.abs(this.numerator);
        const integer = Math.floor(unsignedNumenator / this.denominator);
        const newNumerator = unsignedNumenator % this.denominator;
        return (
          (Math.sign(this.numerator) === -1 ? "±" : "") +
          (integer !== 0 ? integer + "→" : "") +
          (newNumerator !== 0 ? newNumerator + "÷" + this.denominator : "")
        );
      }
    }
  }
}

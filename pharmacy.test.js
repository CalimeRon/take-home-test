import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy - Regular drugs behavior", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });
  it("should decrease the benefit twice as fast after expiration date", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)]
    );
  });
  it("should not decrease the benefit below a zero value", () => {
    expect(new Pharmacy([new Drug("test", 1, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 0, 0)]
    );
  });
});

describe("Pharmacy - Herbal Tea behavior", () => {
  it("should increase the benefit by 1 before expiration date", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 1, 0)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 0, 1)]
    );
  });
  it("should increase the benefit by 2 after expiration date", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 0, 0)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -1, 2)]
    );
  });
  it("should not exceed a benefit of 50", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 1, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 0, 50)]
    );
    expect(new Pharmacy([new Drug("Herbal Tea", 0, 49)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -1, 50)]
    );
  });
});

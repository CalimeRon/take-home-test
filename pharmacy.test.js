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
});

import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy - Regular drugs behavior", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  });
  it("should decrease the benefit twice as fast after expiration date", () => {
    expect(
      new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 1)]);
  });
  it("should not decrease the benefit below a zero value", () => {
    expect(
      new Pharmacy([new Drug("test", 1, 0)]).updateBenefitValue()
    ).toEqual([new Drug("test", 0, 0)]);
  });
});

describe("Pharmacy - Herbal Tea behavior", () => {
  it("should increase the benefit by 1 before expiration date", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 1, 0)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 0, 1)]);
  });
  it("should increase the benefit by 2 after expiration date", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 0)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 2)]);
  });
  it("should not exceed a benefit of 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 1, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 0, 50)]);
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 49)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 50)]);
  });
});

describe("Pharmacy - Magic Pill behavior", () => {
  it("should never expire nor decrease in benefit", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 1, 0)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 1, 0)]);
    expect(
      new Pharmacy([new Drug("Magic Pill", 1, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 1, 50)]);
  });
});

describe("Pharmacy - Fervex behavior", () => {
  it("should increase benefit by 1 above 10 days before expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 11, 1)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 10, 2)]);
  });
  it("should increase the benefit by two 10 days before expiration date", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 2)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 9, 4)]);
  });
  it("should increase the benefit by three 5 days before expiration date", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 2)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 5)]);
  });
  it("should drop the benefit to 0 after expiration date", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });
});

describe("Pharmacy - Dafalgan behavior", () => {
  it("should decrease by 2 the benefit before expiration date", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 1, 1)]);
    expect(
      new Pharmacy([new Drug("Dafalgan", 2, 1)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 1, 0)]);
  });
  it("should decrease by 4 the benefit after expiration date", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 5)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -1, 1)]);
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 2)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -1, 0)]);
  });
});

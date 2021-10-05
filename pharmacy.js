export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];
      if (this.isSpecialDrug(drug.name)) this.solveSpecialDrug(drug);
      else
        drug.benefit = Math.max(
          0,
          (drug.benefit -= drug.expiresIn > 0 ? 1 : 2)
        );
      if (drug.name !== "Magic Pill") drug.expiresIn--;
    }
    return this.drugs;
  }

  isSpecialDrug(drugName) {
    const specialDrugs = ["Herbal Tea", "Fervex", "Magic Pill", "Dafalgan"];
    return specialDrugs.includes(drugName);
  }

  solveSpecialDrug(drug) {
    const expiresIn = drug.expiresIn;
    switch (drug.name) {
      case "Herbal Tea":
        expiresIn > 0
          ? this.changeBenefitValue(drug, 1)
          : this.changeBenefitValue(drug, 2);
        break;
      case "Fervex":
        if (expiresIn > 10) this.changeBenefitValue(drug, 1);
        else if (expiresIn > 5) this.changeBenefitValue(drug, 2);
        else if (expiresIn > 0) this.changeBenefitValue(drug, 3);
        else drug.benefit = 0;
        break;
      case "Dafalgan":
        expiresIn > 0
          ? this.changeBenefitValue(drug, -2)
          : this.changeBenefitValue(drug, -4);
        break;
      default:
        break;
    }
  }

  changeBenefitValue(drug, increment) {
    drug.benefit =
      increment > 0
        ? Math.min(50, drug.benefit + increment)
        : Math.max(0, drug.benefit + increment);
  }
}

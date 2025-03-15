import { calculateMonthlyPayment, getMortgageResults, getYearlyBreakdown } from "@/utils/MortgageCalculator/calculateRepayment";


describe("calculateMonthlyPayment", () => {
	test("should calculate the correct monthly payment with interest", () => {
		const result = calculateMonthlyPayment(300000, 60000, 3.5, 30);
		expect(result).toBeCloseTo(1077.71, 2);
	});

	test("should calculate the correct monthly payment without interest", () => {
		const result = calculateMonthlyPayment(300000, 60000, 0, 30);
		expect(result).toBeCloseTo(666.67, 2);
	});

	test("should calculate the correct monthly payment with a different term", () => {
		const result = calculateMonthlyPayment(300000, 60000, 3.5, 15);
		expect(result).toBeCloseTo(1715.72, 2);
	});
});

describe("getMortgageResults", () => {
	test("should calculate mortgage results correctly", () => {
		const propertyPrice = 200000,
			deposit = 20000,
			mortgageTermInYears = 2,
			annualInterestRate = 5;

		const results = getMortgageResults(
			propertyPrice,
			deposit,
			mortgageTermInYears,
			annualInterestRate
		);

		expect(results.monthlyPaymentAmount).toBe(7896.850152132347);
		expect(results.totalRepaymentAmount).toBe(189524.4036511763);
		expect(results.capitalAmount).toBe(180000.0);
		expect(results.totalInterestAmount).toBe(9524.403651176312);
		expect(results.affordabilityCheck).toBe(8140.912462113225);
	});
});

describe("getYearlyBreakdown", () => {
	test("should calculate the yearly breakdown correctly", () => {
		const propertyPrice = 200000,
			deposit = 20000,
			mortgageTermInYears = 2,
			annualInterestRate = 5;

		const breakdown = getYearlyBreakdown(
			propertyPrice,
			deposit,
			mortgageTermInYears,
			annualInterestRate
		);

		expect(breakdown).toHaveLength(3);
		expect(breakdown[0].year).toBe(0);
		expect(breakdown[0].remainingDebt).toBe(180000);
		expect(breakdown[1].year).toBe(1);
		expect(breakdown[2].year).toBe(2);
	});
});

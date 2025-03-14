import { calculateMonthlyPayment, calculateYearlyBreakdown, getMortgageResults } from "./calculateRepayment";

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

describe('getMortgageResults', () => {
	test('should calculate mortgage results correctly', () => {
		const loanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};

		const results = getMortgageResults(loanParameters);

		expect(results.monthlyPaymentAmount).toBe(7896.850152132347);
		expect(results.totalRepaymentAmount).toBe(189524.4036511763);
		expect(results.capitalAmount).toBe(180000.00);
		expect(results.totalInterestAmount).toBe(9524.403651176312);
		expect(results.affordabilityCheck).toBe(8140.912462113225);
	});
})

describe('calculateYearlyBreakdown', () => {
	test('should calculate the yearly breakdown correctly', () => {
		const loanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};

		const breakdown = calculateYearlyBreakdown(loanParameters);

		expect(breakdown).toHaveLength(3);
		expect(breakdown[0].year).toBe(0);
		expect(breakdown[0].remainingDebt).toBe(180000);
		expect(breakdown[1].year).toBe(1);
		expect(breakdown[2].year).toBe(2);
	})
})


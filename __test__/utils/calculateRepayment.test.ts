import { calculateCapitalAmount, calculateMonthlyPayment, calculateMortgageResults, calculateTotalRepaymentAmount, calculateYearlyBreakdown, filterNullFromLP } from "@/utils/MortgageCalculator/calculateRepayment";
import { LoanParameters, NonNullableLP } from "@/utils/types";


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

describe("calculateMortgageResults", () => {
	test("should calculate mortgage results correctly", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};


		const results = calculateMortgageResults(
			loanParameters
		);

		expect(results?.monthlyPaymentAmount).toBe(7896.850152132347);
		expect(results?.totalRepaymentAmount).toBe(189524.4036511763);
		expect(results?.capitalAmount).toBe(180000.0);
		expect(results?.totalInterestAmount).toBe(9524.403651176312);
		expect(results?.affordabilityCheck).toBe(8140.912462113225);
	});
	test("should calculate mortgage results as null when any field is null", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: null,
			annualInterestRate: 5,
		};


		const results = calculateMortgageResults(
			loanParameters
		);

		expect(results).toBe(null);
	})
});

describe("getYearlyBreakdown", () => {
	test("should calculate the yearly breakdown correctly", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};

		const breakdown = calculateYearlyBreakdown(
			loanParameters
		);
		if (!!breakdown) {
			expect(breakdown).toHaveLength(3);
			expect(breakdown[0].year).toBe(0);
			expect(breakdown[0].remainingDebt).toBe(180000);
			expect(breakdown[1].year).toBe(1);
			expect(breakdown[2].year).toBe(2);
		}
	});
	test("should calculate yearly breakdown as null when any field is null", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: null,
			annualInterestRate: 5,
		};


		const breakdown = calculateYearlyBreakdown(
			loanParameters
		);

		expect(breakdown).toBe(null);
	})
});

describe("filterNullFromLP", () => {
	test("should return loanParameters object when all properties are present and not null", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: 200000,
			deposit: 20000,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};

		const results = filterNullFromLP(loanParameters)
		expect(results).toEqual(loanParameters as NonNullableLP)
	})
	test("should return null  when all or one of the properties is null except deposit", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: null,
			deposit: 20000,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};

		const results = filterNullFromLP(loanParameters)
		expect(results).toBeNull()
	})
	test("should return loanParameters with deposit as zerp  when deposit is null", () => {
		const loanParameters: LoanParameters = {
			propertyPrice: 200000,
			deposit: null,
			mortgageTermInYears: 2,
			annualInterestRate: 5,
		};

		const results = filterNullFromLP(loanParameters)
		expect(results).toEqual({ ...loanParameters, deposit: 0 })
	})
})

describe("calculateTotalRepaymentAmount", () => {
	test("should calculate the total repayment amount correctly", () => {
		const monthlyPaymentAmount = 400, mortgageTermInYears = 10
		const repaymentAmount = calculateTotalRepaymentAmount(monthlyPaymentAmount, mortgageTermInYears)
		expect(repaymentAmount).toEqual(48000)
	})
	test("should calculate the total repayment amount to be zero when monthlyPaymentAmount is zero ", () => {
		const monthlyPaymentAmount = 0, mortgageTermInYears = 10
		const repaymentAmount = calculateTotalRepaymentAmount(monthlyPaymentAmount, mortgageTermInYears)
		expect(repaymentAmount).toEqual(0)
	})
	test("should calculate the total repayment amount to be zero when mortgageTermInYears is zero ", () => {
		const monthlyPaymentAmount = 300, mortgageTermInYears = 0
		const repaymentAmount = calculateTotalRepaymentAmount(monthlyPaymentAmount, mortgageTermInYears)
		expect(repaymentAmount).toEqual(0)
	})
})

describe("calculateCapitalAmount", () => {
	test("should calculate the capital amount correctly", () => {
		const propertyPrice = 500000, deposit = 50000
		const capital = calculateCapitalAmount(propertyPrice, deposit)
		expect(capital).toEqual(450000)
	})
	test("should calculate the capital amount to be zero when propertyPrice and deposit is zero ", () => {
		const propertyPrice = 400000, deposit = 400000
		const capital = calculateCapitalAmount(propertyPrice, deposit)
		expect(capital).toEqual(0)
	})

})

describe("calculateTotalInterestAmount", () => {
	test("should calculate total interest correctly", () => {
		const totalRepaymentAmount = 500000, capitalAmount = 450000
		const interest = calculateCapitalAmount(totalRepaymentAmount, capitalAmount)
		expect(interest).toEqual(50000)
	})
	test("should calculate the total interest to be zero when totalRepaymentAmount and capitalAmount are same", () => {
		const totalRepaymentAmount = 500000, capitalAmount = 500000
		const interest = calculateCapitalAmount(totalRepaymentAmount, capitalAmount)
		expect(interest).toEqual(0)
	})

})
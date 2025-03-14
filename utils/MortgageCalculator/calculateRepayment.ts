import { LoanParameters, MortgageResults, YearlyBreakdown } from "@/utils/types";
import { range } from "../util";

/**
 * Calculates the monthly mortgage payment.
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @param annualInterestRate - The annual interest rate.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The monthly mortgage payment.
 */
export function calculateMonthlyPayment(
	propertyPrice: number,
	deposit: number,
	annualInterestRate: number,
	mortgageTermInYears: number
): number {
	const adjustedLoanAmount = propertyPrice - deposit;
	const monthlyInterestRate = annualInterestRate / 100 / 12;
	const numberOfPayments = mortgageTermInYears * 12;

	if (monthlyInterestRate === 0) {
		return adjustedLoanAmount / numberOfPayments;
	}

	const monthlyPayment =
		(adjustedLoanAmount *
			monthlyInterestRate *
			Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
		(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

	return monthlyPayment;
}

/**
 * Calculates the yearly break down.
 *
 * @param loanParameters - All the values user entered through mortgage details form.
 * @returns An array containing the year and remaining debt for each year up to the selected maximum term
 */

export const calculateYearlyBreakdown = (loanParameters: LoanParameters): YearlyBreakdown[] => {
	const { propertyPrice, deposit, mortgageTermInYears, annualInterestRate } = loanParameters;
	const monthlyInterestRate = annualInterestRate / 100 / 12;
	const capitalAmount = calculateCapitalAmount(propertyPrice, deposit);
	const monthlyPaymentAmount = calculateMonthlyPayment(
		propertyPrice,
		deposit,
		annualInterestRate,
		mortgageTermInYears
	);
	let remainingBalance = capitalAmount;
	let breakdownResult = [
		{
			year: 0,
			remainingDebt: capitalAmount,
		},
	];
	for (let year = 1; year <= mortgageTermInYears; year++) {
		for (let month = 1; month <= 12; month++) {
			const monthlyInterest = remainingBalance * monthlyInterestRate;
			const monthlyPrincipal = monthlyPaymentAmount - monthlyInterest;
			remainingBalance -= monthlyPrincipal;
		}
		breakdownResult = [
			...breakdownResult,
			{ year: year, remainingDebt: Math.abs(Math.round(remainingBalance)) },
		];
	}
	return breakdownResult;
};

const calculateTotalRepaymentAmount = (monthlyPaymentAmount: number, mortgageTermInYears: number) =>
	monthlyPaymentAmount * mortgageTermInYears * 12;
const calculateCapitalAmount = (propertyPrice: number, deposit: number) => propertyPrice - deposit;
const calculateTotalInterestAmount = (totalRepaymentAmount: number, capitalAmount: number) =>
	totalRepaymentAmount - capitalAmount;

/**
 * Calculates the results to display on mortgage results section.
 *
 * @param loanParameters - All the values user entered through mortgage details form.
 * @returns An object contains  monthly payment amount, total repayment amount, capital, total interest and affordability check
 */
export const getMortgageResults = (loanParameters: LoanParameters): MortgageResults => {
	const { propertyPrice, deposit, mortgageTermInYears, annualInterestRate } = loanParameters;
	const monthlyPaymentAmount = calculateMonthlyPayment(
		propertyPrice,
		deposit,
		annualInterestRate,
		mortgageTermInYears
	)
	const totalRepaymentAmount = calculateTotalRepaymentAmount(
		monthlyPaymentAmount,
		mortgageTermInYears
	);
	const capitalAmount = calculateCapitalAmount(propertyPrice, deposit);
	const totalInterestAmount = calculateTotalInterestAmount(totalRepaymentAmount, capitalAmount);
	const affordabilityCheck = calculateMonthlyPayment(
		propertyPrice,
		deposit,
		annualInterestRate + 3,
		mortgageTermInYears
	);
	return {
		monthlyPaymentAmount,
		totalRepaymentAmount,
		capitalAmount,
		totalInterestAmount,
		affordabilityCheck,
	};
};

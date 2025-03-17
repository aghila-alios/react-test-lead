import { LoanParameters, MortgageResults, NonNullableLP, Nullable, YearlyBreakdown } from "@/utils/types";

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
 * check value is not null
 *
 * @param value - value can be any type
 * @returns boolean
//  */
export const isNotNull = <T>(value: T): boolean => value !== null

/**
 * Filter null values from loan parameters and return a non nullable loan parameters or null
 *
 * @param loanParameters - The object containing all the values user entered through mortgage details form.
 * @returns Non nullable loan parameters or null
//  */

export const filterNullFromLP = (lp: LoanParameters): Nullable<NonNullableLP> =>
	isNotNull(lp.propertyPrice) && isNotNull(lp.mortgageTermInYears) && isNotNull(lp.annualInterestRate) ?
		isNotNull(lp.deposit) ? lp as NonNullableLP : { ...lp, deposit: 0 } as NonNullableLP :
		null

/**
* Calculate the cumulative amount paid over the term of the mortgage, encompassing the loan amount and interest.
* @param monthlyPaymentAmount - The amount due each month to repay the mortgage, including both principal and interest.
* @param mortgageTermInYears - The mortgage term in years.
* @returns calculated total repament amount amount
//  */

export const calculateTotalRepaymentAmount = (monthlyPaymentAmount: number, mortgageTermInYears: number): number =>
	monthlyPaymentAmount * mortgageTermInYears * 12;

/**
* Calculate the original sum borrowed. This excludes any interest and deposit.
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
* @returns calculated capital
//  */
export const calculateCapitalAmount = (propertyPrice: number, deposit: number): number => propertyPrice - deposit;

/**
* Calculate the cost of borrowing money, calculated as a percentage of the principal loan amount and accumulated over the term of the mortgage.
 * @param totalRepaymentAmount - The cumulative amount paid over the term of the mortgage, encompassing the loan amount and interest.
 * @param capitalAmount - The original sum borrowed. This excludes any interest and deposit.
* @returns total interest
//  */
export const calculateTotalInterestAmount = (totalRepaymentAmount: number, capitalAmount: number): number =>
	totalRepaymentAmount - capitalAmount;




/**
 * Calculates the results to display on mortgage results section.
 *
 * @param loanParameters - The object containing all the values user entered through mortgage details form.
 * @returns An object contains  monthly payment amount, total repayment amount, capital, total interest and affordability check or null if any field contains null value
//  */

export const calculateMortgageResults = (
	loanParameters: LoanParameters
): Nullable<MortgageResults> => {
	const lp = filterNullFromLP(loanParameters)
	if (!lp) return null
	const { propertyPrice, deposit, mortgageTermInYears, annualInterestRate } = lp;
	const monthlyPaymentAmount = calculateMonthlyPayment(
		propertyPrice,
		deposit,
		annualInterestRate,
		mortgageTermInYears
	);
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


/**
 * Calculates the yearly break down.
 * @param loanParameters - The object containing all the values user entered through mortgage details form.
 * @returns An array containing the year and remaining debt for each year up to the selected maximum term or null
 */

export const calculateYearlyBreakdown = (
	loanParameters: LoanParameters
): Nullable<YearlyBreakdown[]> => {
	const lp = filterNullFromLP(loanParameters)
	if (!lp) return null
	const { propertyPrice, deposit, mortgageTermInYears, annualInterestRate } = lp;
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

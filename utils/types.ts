export type LoanParameters = {
	propertyPrice: number;
	deposit: number;
	mortgageTermInYears: number;
	annualInterestRate: number;
};

export type MortgageResults = {
	monthlyPaymentAmount: number;
	totalRepaymentAmount: number;
	capitalAmount: number;
	totalInterestAmount: number;
	affordabilityCheck: number;
};

export type YearlyBreakdown = {
	year: number;
	remainingDebt: number;
};
export type Nullable<T> = T | null;

export type LoanParameters = {
	propertyPrice: Nullable<number>;
	deposit: Nullable<number>;
	mortgageTermInYears: Nullable<number>;
	annualInterestRate: Nullable<number>;
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

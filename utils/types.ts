export type Nullable<T> = T | null;
export type LoanParameters = {
	propertyPrice: Nullable<number>;
	deposit: Nullable<number>;
	mortgageTermInYears: Nullable<number>;
	annualInterestRate: Nullable<number>;
};

export type NonNullableLP = {
	[K in keyof LoanParameters]: NonNullable<LoanParameters[K]>
}

export type LPErrorType = {
	[K in keyof LoanParameters]: string | undefined;
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


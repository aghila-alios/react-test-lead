import { LoanParameters, LPErrorType, Nullable } from "@/utils/types";


const ERROR_MESSAGE = "Value must be a positive number";
export const validatePropertyPrice = (value: Nullable<number>) => {
    if (value === null || value <= 0) {
        return ERROR_MESSAGE
    }
    return undefined;
};

export const validateDeposit = (value: Nullable<number>) => {
    if (value !== null && value < 0) {
        return ERROR_MESSAGE
    }

    return undefined;
};

export const validateMortgageTerm = (value: Nullable<number>) => {
    if (value === null || value <= 0) {
        return ERROR_MESSAGE
    }
    return undefined;
};

export const validateInterestRate = (value: Nullable<number>) => {
    if (value === null || value < 0) {
        return ERROR_MESSAGE
    }
    return undefined;
};

export const validateLoanParameters = (lp: LoanParameters): LPErrorType => ({
    propertyPrice: validatePropertyPrice(lp.propertyPrice),
    deposit: validateDeposit(lp.deposit),
    mortgageTermInYears: validateMortgageTerm(lp.mortgageTermInYears),
    annualInterestRate: validateInterestRate(lp.annualInterestRate)
})

export const hasErrors = (lp: LoanParameters) => Object.values(validateLoanParameters(lp)).some((error) => error !== void 0)
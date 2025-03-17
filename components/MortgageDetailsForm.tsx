"use client";
import { Col, Form, Button } from "react-bootstrap";
import NumberInput from "./NumberInput";
import { LoanParameters } from "@/utils/types";
import {
	hasErrors,
	validateDeposit,
	validateInterestRate,
	validateMortgageTerm,
	validatePropertyPrice,
} from "@/validation/validateMortgageFormFields";

type MortgageDetailsFormProps = {
	loanParameters: LoanParameters;
	onChange: (key: string, value: number) => void;
	onSubmit: () => void;
};

const MortgageDetailsForm = ({ loanParameters, onChange, onSubmit }: MortgageDetailsFormProps) => {
	const disableButton = hasErrors(loanParameters);
	return (
		<>
			<Col className="border-r" md="auto">
				<Form aria-label="Mortgage details form">
					<NumberInput
						id="price"
						name="price"
						label="Property Price"
						value={loanParameters.propertyPrice}
						className="no-spinner"
						step="any"
						groupText="£"
						groupTextBefore={true}
						onChange={(value) => onChange("propertyPrice", value)}
						validate={(value) => validatePropertyPrice(value)}
					/>
					<NumberInput
						id="deposit"
						name="deposit"
						label="Deposit"
						value={loanParameters.deposit}
						className="no-spinner"
						step="any"
						groupText="£"
						groupTextBefore={true}
						onChange={(value) => onChange("deposit", value)}
						validate={(value) => validateDeposit(value)}
					/>
					<NumberInput
						id="term"
						name="term"
						label="Mortgage Term"
						step="any"
						value={loanParameters.mortgageTermInYears}
						groupText="years"
						groupTextBefore={false}
						onChange={(value: number) =>
							onChange("mortgageTermInYears", value)
						}
						validate={(value) => validateMortgageTerm(value)}
					/>
					<NumberInput
						id="interest"
						name="interest"
						label="Interest rate"
						step="any"
						className="no-spinner"
						value={loanParameters.annualInterestRate}
						groupText="%"
						groupTextBefore={false}
						onChange={(value: number) =>
							onChange("annualInterestRate", value)
						}
						validate={(value) => validateInterestRate(value)}
					/>
					<Button
						className="w-full"
						variant="primary"
						aria-label="Calculate"
						onClick={onSubmit}
						disabled={disableButton}>
						Calculate
					</Button>
				</Form>
			</Col>
		</>
	);
};
export default MortgageDetailsForm;

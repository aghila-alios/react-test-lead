"use client";
import { Col, Form, Button } from "react-bootstrap";
import NumberInput from "./NumberInput";
import { LoanParameters } from "@/utils/types";
type MortgageDetailsFormProps = {
	loanParameters: LoanParameters;
	onChange: (key: string, value: number) => void;
	onSubmit: () => void;
};
const MortgageDetailsForm = ({ loanParameters, onChange, onSubmit }: MortgageDetailsFormProps) => {
	const buttonDisabled = Object.values(loanParameters).some((value) => value === null);
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
					/>
					<Button
						className="w-full"
						variant="primary"
						aria-label="Calculate"
						disabled={buttonDisabled}
						onClick={onSubmit}>
						Calculate
					</Button>
				</Form>
			</Col>
		</>
	);
};
export default MortgageDetailsForm;

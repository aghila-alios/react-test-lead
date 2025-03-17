import { render, screen, fireEvent } from "@testing-library/react";
import { LoanParameters } from "@/utils/types";
import "@testing-library/jest-dom";
import MortgageDetailsForm from "@/components/MortgageDetailsForm";

describe("MortgageDetailsForm Component", () => {
	const mockOnChange = jest.fn();
	const mockOnSubmit = jest.fn();

	const defaultLoanParameters: LoanParameters = {
		propertyPrice: 300000,
		deposit: 50000,
		mortgageTermInYears: 25,
		annualInterestRate: 3.5,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("verify form renders correctly with all inputs and button", () => {
		render(
			<MortgageDetailsForm
				loanParameters={defaultLoanParameters}
				onChange={mockOnChange}
				onSubmit={mockOnSubmit}
			/>
		);

		expect(screen.getByLabelText("Property Price")).toBeInTheDocument();
		expect(screen.getByLabelText("Deposit")).toBeInTheDocument();
		expect(screen.getByLabelText("Mortgage Term")).toBeInTheDocument();
		expect(screen.getByLabelText("Interest rate")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /calculate/i })).toBeInTheDocument();
		expect(screen.getByLabelText("Property Price")).toHaveValue(300000);
		expect(screen.getByLabelText("Deposit")).toHaveValue(50000);
		expect(screen.getByLabelText("Mortgage Term")).toHaveValue(25);
		expect(screen.getByLabelText("Interest rate")).toHaveValue(3.5);
	});

	test("calls onSubmit when calculate button is clicked", () => {
		render(
			<MortgageDetailsForm
				loanParameters={defaultLoanParameters}
				onChange={mockOnChange}
				onSubmit={mockOnSubmit}
			/>
		);

		const calculateButton = screen.getByRole("button", { name: /calculate/i });
		fireEvent.click(calculateButton);
		expect(mockOnSubmit).toHaveBeenCalled();
	});
});

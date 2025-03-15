import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MortgageResultsPage from "@/components/MortgageResultsPage";

describe("MortgageResultsPAge component", () => {
	const results = {
		monthlyPaymentAmount: 2753.98,
		totalRepaymentAmount: 495715.65,
		capitalAmount: 360000,
		totalInterestAmount: 135715.65,
		affordabilityCheck: 3337.24,
	};
	test("verify component renders with results", () => {
		render(<MortgageResultsPage results={results} />);

		expect(screen.getByRole("heading", { name: /Mortgage results/i })).toBeInTheDocument();
		expect(
			screen.getByRole("table", { name: /Mortgage results table/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole("row", { name: /Monthly Payment £2,753.98/i })
		).toBeInTheDocument();

		expect(screen.getByRole("cell", { name: /£2,753.98/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /£495,715.65/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /£360,000.00/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /£135,715.65/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /£3,337.24/i })).toBeInTheDocument();
	});
});

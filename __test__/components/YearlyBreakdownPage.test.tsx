import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import YearlyBreakdownPage from "@/components/YearlyBreakdownPage";

describe("YearlyBreakdownPage component", () => {
	const yearlyBreakdown = [
		{
			year: 0,
			remainingDebt: 10000,
		},
		{
			year: 1,
			remainingDebt: 5000,
		},
		{
			year: 2,
			remainingDebt: 0,
		},
	];

	test("verify YearlyBreakdownPage component correctly displays with yearly breakdown", () => {
		render(<YearlyBreakdownPage yearlyBreakdown={yearlyBreakdown} />);

		expect(screen.getByRole("heading", { name: /Yearly breakdown/i })).toBeInTheDocument();
		expect(screen.getByRole("table", { name: /Yearly breakdown/i })).toBeInTheDocument();
		expect(screen.getByRole("columnheader", { name: /Year/i })).toBeInTheDocument();
		expect(
			screen.getByRole("columnheader", { name: /Remaining Debt/i })
		).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /Year 0/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /Year 1/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /Year 2/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /£10,000/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /5,000/i })).toBeInTheDocument();
		expect(screen.getByRole("cell", { name: /£0/i })).toBeInTheDocument();
	});
});

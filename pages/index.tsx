import { useState } from "react";
import {
	calculateYearlyBreakdown,
	calculateMortgageResults,
} from "@/utils/MortgageCalculator/calculateRepayment";
import { LoanParameters, MortgageResults, Nullable, YearlyBreakdown } from "../utils/types";
import { Row, Container } from "react-bootstrap";
import MortgageDetailsForm from "@/components/MortgageDetailsForm";
import MortgageResultsPage from "@/components/MortgageResultsPage";
import YearlyBreakdownPage from "@/components/YearlyBreakdownPage";
import { GetServerSideProps } from "next";

let initLoanParameters: LoanParameters = {
	propertyPrice: null,
	deposit: null,
	mortgageTermInYears: null,
	annualInterestRate: null,
};

type BOEProps = {
	rate: number | null;
	error?: string;
};

export const getServerSideProps: GetServerSideProps<BOEProps> = async () => {
	const boeURL = "http://localhost:3000/api/rates";
	try {
		const res = await fetch(boeURL);
		if (!res.ok) throw new Error(`Failed to fetch Bank of England rate: ${res.statusText}`);
		const result = await res.json();
		return {
			props: { rate: result.success ? result.data : null, error: result.error || "" },
		};
	} catch (error) {
		return { props: { rate: null, error: (error as Error).message } };
	}
};

export default function MortgageCalculator({ rate }: BOEProps) {
	if (!!rate) initLoanParameters = { ...initLoanParameters, annualInterestRate: rate };
	const [loanParameters, setLoanParameters] = useState<LoanParameters>(initLoanParameters);
	const [results, setResults] = useState<Nullable<MortgageResults>>(null);
	const [yearlyBreakdown, setYearlyBreakdown] = useState<Nullable<YearlyBreakdown[]>>(null);

	const handleChange = (key: string, value: number) => {
		setLoanParameters({
			...loanParameters,
			[key]: value,
		});
	};

	const handleSubmit = () => {
		const mortgageResults = calculateMortgageResults(loanParameters);
		!!mortgageResults &&
			setResults({
				...results,
				...mortgageResults,
			});

		const breakdownResults = calculateYearlyBreakdown(loanParameters);
		!!breakdownResults && setYearlyBreakdown(breakdownResults);
	};
	return (
		<Container>
			<title>Mortgage Calculator Test</title>
			<Row className="gap-x-10 pt-3">
				<MortgageDetailsForm
					loanParameters={loanParameters}
					onChange={handleChange}
					onSubmit={handleSubmit}
				/>

				{!!results && <MortgageResultsPage results={results} />}
				{!!yearlyBreakdown && (
					<YearlyBreakdownPage yearlyBreakdown={yearlyBreakdown || []} />
				)}
			</Row>
		</Container>
	);
}

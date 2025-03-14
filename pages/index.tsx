import { useState } from "react";
import {
	calculateYearlyBreakdown,
	getMortgageResults,
} from "@/utils/MortgageCalculator/calculateRepayment";
import { LoanParameters, MortgageResults, Nullable, YearlyBreakdown } from "../utils/types";
import { Row, Container, Col, Table } from "react-bootstrap";
import MortgageDetailsForm from "@/components/MortgageDetailsForm";
import MortgageResultsPage from "@/components/MortgageResultsPage";
import YearlyBreakdownPage from "@/components/YearlyBreakdownPage";
import { GetServerSideProps } from "next";

let initLoanParameters: LoanParameters = {
	propertyPrice: 0,
	deposit: 0,
	mortgageTermInYears: 0,
	annualInterestRate: 0,
};

type Props = {
	rate: number | null;
	error?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/rates");
		if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
		const result = await res.json();
		return {
			props: { rate: result.success ? result.data : null, error: result.error || "" },
		};
	} catch (error) {
		return { props: { rate: null, error: (error as Error).message } };
	}
};

export default function MortgageCalculator({ rate, error }: Props) {
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
		const mortgageResults = getMortgageResults(loanParameters);
		setResults({
			...results,
			...mortgageResults,
		});

		const breakdownResults = calculateYearlyBreakdown(loanParameters);
		setYearlyBreakdown(breakdownResults);
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

				<YearlyBreakdownPage yearlyBreakdown={yearlyBreakdown || []} />
			</Row>
		</Container>
	);
}

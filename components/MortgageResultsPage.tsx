import { Col, Table } from "react-bootstrap";

import { formatCurrency } from "@/utils/formatCurrency";
import { MortgageResults } from "@/utils/types";

type MortgageResultsPageProps = {
	results: MortgageResults;
};

const MortgageResultsPage = ({ results }: MortgageResultsPageProps) => {
	const {
		monthlyPaymentAmount,
		totalRepaymentAmount,
		capitalAmount,
		totalInterestAmount,
		affordabilityCheck,
	} = results;
	return (
		<>
			<Col md="auto">
				<h2 className="pb-3" aria-label="Mortgage results">
					Results
				</h2>
				<Table striped="columns" aria-label="Mortgage results table">
					<tbody>
						<tr className="border-b border-t">
							<td>Monthly Payment</td>
							<td className="text-right">
								{formatCurrency(monthlyPaymentAmount)}
							</td>
						</tr>
						<tr className="border-b">
							<td>Total Repayment</td>
							<td className="text-right">
								{formatCurrency(totalRepaymentAmount)}
							</td>
						</tr>
						<tr className="border-b">
							<td>Capital</td>
							<td className="text-right">
								{formatCurrency(capitalAmount)}
							</td>
						</tr>
						<tr className="border-b">
							<td>Interest</td>
							<td className="text-right">
								{formatCurrency(totalInterestAmount)}
							</td>
						</tr>
						<tr className="border-b">
							<td>Affordability check</td>
							<td className="text-right">
								{formatCurrency(affordabilityCheck)}
							</td>
						</tr>
					</tbody>
				</Table>
			</Col>
		</>
	);
};

export default MortgageResultsPage;

"use client";
import { formatCurrency } from "@/utils/formatCurrency";
import { YearlyBreakdown } from "@/utils/types";
import { Col, Table } from "react-bootstrap";
import { FC } from "react";
type YearlyBreakdownPageProps = {
	yearlyBreakdown: YearlyBreakdown[];
};
const YearlyBreakdownPage: FC<YearlyBreakdownPageProps> = ({
	yearlyBreakdown,
}: YearlyBreakdownPageProps) => {
	return (
		<>
			<Col md="auto">
				<h2 className="pb-3" aria-label="Yearly breakdown">
					Yearly Breakdown
				</h2>
				<Table
					className="max-w-52"
					bordered
					hover
					size="sm"
					aria-label="Yearly breakdown table">
					<thead>
						<tr>
							<th>Year</th>
							<th>Remaining Debt</th>
						</tr>
					</thead>
					<tbody>
						{yearlyBreakdown.map(
							(breakDownResult: YearlyBreakdown, index: number) => (
								<tr key={index}>
									<td>{breakDownResult.year}</td>
									<td>
										{formatCurrency(
											breakDownResult.remainingDebt,
											0
										)}
									</td>
								</tr>
							)
						)}
					</tbody>
				</Table>
			</Col>
		</>
	);
};

export default YearlyBreakdownPage;

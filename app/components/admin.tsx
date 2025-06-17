import type { Question } from '../../lib/types';
import { query } from "@/lib/db";

// Question object
type Props = {
	questions: Question[];
};

export default async function AdminPage({ questions }: Props) {
	// Get data and set results to Question object
	for(const q of questions.filter(q => q.type !== 'textarea')){
		// SQL
		let sql: string = 'SELECT ';
		// Multiple choice (checkbox)
		if(q.type === 'checkbox'){
			sql += `(SELECT `;
			q.answers.forEach((a, i) => {
				sql += `SUM(${q.name}_${i + 1}) + `;
			});
			sql += `0 FROM compliance_survey_2024) AS "t${q.q_no}",`;
			q.answers.forEach((a, i) => {
				sql += `(SELECT COUNT(*) FROM compliance_survey_2024 WHERE ${q.name}_${i + 1} = 1) AS "a${i}",`;
			});

		// Single choice (radio)
		}else{
			sql += `(SELECT COUNT(*) FROM compliance_survey_2024 WHERE ${q.name} <> 0) AS "t${q.q_no}",`;
			q.answers.forEach((a, i) => {
				sql += `(SELECT COUNT(*) FROM compliance_survey_2024 WHERE ${q.name} = ${i + 1}) AS "a${i}",`;
			});
		}
		// Query
		const rs = await query(sql + ' NULL AS dummy', []);
		
		// Set results to questions
		q.res = rs.rows[0]['t' + q.q_no];
		q.num = q.answers.reduce((sum, a) => sum + (a.num ?? 0), 0);
		q.res_rate = Math.round((q.num > 0 ? ((q.res ?? 0) / q.num) * 100 : 0) * 100) / 100;
		
		// Set results to answers
		q.answers = q.answers.map((a, i) => {
			return {
				...a,
				res: rs.rows[0]['a' + i],
				rate: Math.round((rs.rows[0]['t' + q.q_no] > 0 ? (rs.rows[0]['a' + i] / rs.rows[0]['t' + q.q_no]) * 100 : 0) * 100) / 100,
				res_rate: Math.round(((a.num ?? 0) > 0 ? ((rs.rows[0]['a' + i] ?? 0) / (a.num ?? 0)) * 100 : 0) * 100) / 100,
			};
		});
	};

	return (
		<main className='admin'>
			<div className='block'>
				<h3>Admin Report</h3>
			</div>
			{questions.filter((q) => q.type !== 'textarea').map((q) => (
				<table key={q.name}>
				<thead>
					<tr>
						<th style={{width: "50px"}}>Q{q.q_no}</th>
						<th className='left' dangerouslySetInnerHTML={{ __html: q.question }} />
						{q.q_no === '1' ? <th style={{width: "100px"}}>Staff</th> : ''}
						{q.q_no === '1' ? <th style={{width: "100px"}}>Res Rate</th> : ''}
						<th style={{width: "100px"}}>Res</th>
						<th style={{width: "100px"}}>%</th>
					</tr>
				</thead>
				<tbody>
				{q.answers.map((a, i) => {
					return (
						<tr key={q.name + i} className={i % 2 ? 'even' : ''}>
							<th>{a.no}</th>
							<td>{a.text}</td>
							{q.q_no === '1' ? <td className='right'>{a.num}</td> : ''}
							{q.q_no === '1' ? <td className='right'>{a.res_rate}%</td> : ''}
							<td className='right'>{a.res}</td>
							<td className='right'>{a.rate}%</td>
						</tr>
					);
				})}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={2} className='right'>Total Responses</td>
						{q.q_no === '1' ? <td className='right'>{q.num}</td> : ''}
						{q.q_no === '1' ? <td className='right'>{q.res_rate}%</td> : ''}
						<td className='right'>{q.res}</td>
						<td></td>
					</tr>
				</tfoot>
				</table>
			))}
		</main>
	);
}

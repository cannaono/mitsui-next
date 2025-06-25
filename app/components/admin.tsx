import type { Question } from '../../lib/types';
import { query } from "@/lib/db";

// Question object
type Props = {
	questions: Question[];
};

export default async function Main({ questions }: Props) {
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
			sql += `0 FROM compliance_survey_2024) AS "t${q.no}",`;
			q.answers.forEach((a, i) => {
				sql += `(SELECT COUNT(*) FROM compliance_survey_2024 WHERE ${q.name}_${i + 1} = 1) AS "a${i}",`;
			});

		// Single choice (radio)
		}else{
			sql += `(SELECT COUNT(*) FROM compliance_survey_2024 WHERE ${q.name} <> 0) AS "t${q.no}",`;
			q.answers.forEach((a, i) => {
				sql += `(SELECT COUNT(*) FROM compliance_survey_2024 WHERE ${q.name} = ${i + 1}) AS "a${i}",`;
			});
		}
		// Query
		try{
			const rs = await query(sql + ' NULL AS dummy', []);
			// Set results to questions
			q.res = rs.rows[0]['t' + q.no];
			q.num = q.answers.reduce((sum, a) => sum + (a.num ?? 0), 0);
			q.res_rate = Math.round((q.num > 0 ? ((q.res ?? 0) / q.num) * 100 : 0) * 100) / 100;
			
			// Set results to answers
			q.answers = q.answers.map((a, i) => {
				return {
					...a,
					res: rs.rows[0]['a' + i],
					rate: Math.round((rs.rows[0]['t' + q.no] > 0 ? (rs.rows[0]['a' + i] / rs.rows[0]['t' + q.no]) * 100 : 0) * 100) / 100,
					res_rate: Math.round(((a.num ?? 0) > 0 ? ((rs.rows[0]['a' + i] ?? 0) / (a.num ?? 0)) * 100 : 0) * 100) / 100,
				};
			});
		}catch(e){
			console.error('DB connection error:', e);
		}
	};

	return (
		<main id='admin'>
			<div className='block'>
				<h3>Admin Report</h3>
			</div>
			{questions.filter((q) => q.type !== 'textarea').map((q) => (
				<table key={q.name}>
				<thead>
					<tr>
						<th className='no'>Q{q.no}</th>
						<th className='left' dangerouslySetInnerHTML={{ __html: q.question }} />
						{q.no === '1' ? <th style={{width: "100px"}}>Staff</th> : ''}
						{q.no === '1' ? <th style={{width: "100px"}}>Res Rate</th> : ''}
						<th className='res'>Res</th>
						<th className='res'>%</th>
					</tr>
				</thead>
				<tbody>
				{q.answers.map((a, i) => {
					return (
						<tr key={q.name + i} className={i % 2 ? 'even' : ''}>
							<td className='center'>{a.no}</td>
							<td className='left'>{a.text}</td>
							{q.no === '1' ? <td className='right'>{a.num}</td> : ''}
							{q.no === '1' ? <td className='right'>{a.res_rate}%</td> : ''}
							<td className='right'>{a.res}</td>
							<td className='right'>{a.rate}%</td>
						</tr>
					);
				})}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={2} className='right'>Total Responses</td>
						{q.no === '1' ? <td className='right'>{q.num}</td> : ''}
						{q.no === '1' ? <td className='right'>{q.res_rate}%</td> : ''}
						<td className='right'>{q.res}</td>
						<td></td>
					</tr>
				</tfoot>
				</table>
			))}
		</main>
	);
}

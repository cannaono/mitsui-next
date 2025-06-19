import React from 'react';
import type { Question } from '../../lib/types';

type Props = {
	questions: Question[];
	answers: { [key: string]: string };
	onAnswerChange: (key: string, val: string) => void;
};

// Page
export default function Main({ questions, answers, onAnswerChange }: Props) {
	return (
		<main id='survey'>
		{questions.map((q) => {
			// Answer elements
			let elements;
			// checkbox with categories
			if(q.categories){
				elements = (<>
					{q.categories.map((c) => (
						<React.Fragment key={c.answers_from}>
						<h4>{c.title}</h4>
						{q.answers.slice(c.answers_from, c.answers_to + 1).map((a, j) => {
							const i = c.answers_from + j;
							return (
								<React.Fragment key={i}>
								<label key={q.name + i}><li className={!q.class ? "middle" : q.class}>
								<input type="checkbox" name={q.name + '_' + i} id={q.name + '_' + i} value={1} />{a.text}</li></label>
								<textarea name={q.name + '_' + i + 't'} id={q.name + '_' + i + 't'} className='small' disabled />
								</React.Fragment>
							);
						})}
						</React.Fragment>
					))}
				</>);
			// textarea
			}else if(q.type === 'textarea'){
				elements = <textarea name={q.name} id={q.name} />;
			// radio/checkbox
			}else{
				elements = (<>
					<ul>
					{q.answers.map((a, i) => {
						i++;
						const text = q.with_no ? a.no + ' ' + a.text : a.text;
						if(q.type === 'radio'){
							return (
								<label key={q.name + i}><li className={!q.class ? "middle" : q.class}>
								<input type="radio" name={q.name} id={q.name + '_' + i} value={i} 
									checked={Number(answers[q.name]) === i} 
									onChange={(e) => onAnswerChange(q.name, e.target.value)}
								/>{text}</li></label>
							);
						}else if(q.type === 'checkbox'){
							return (
								<label key={q.name + i}><li className={!q.class ? "middle" : q.class}>
								<input type="checkbox" name={q.name + '_' + i} id={q.name + '_' + i} value={1} 
									checked={answers[q.name + '_' + i] === '1' || false}
									onChange={(e) => onAnswerChange(q.name + '_' + i, e.target.value)}
								/>{text}</li></label>
							);
						}
					})}
					</ul>
					{q.addional_textarea && (
						<textarea name={q.addional_textarea.name} id={q.addional_textarea.name} disabled />
					)}
				</>);
			}
			return(
				<div key={q.name} className="block">
					<h3>
						<div className="qno">Q{q.no}</div>
						<div className="question" dangerouslySetInnerHTML={{ __html: q.question }} />
					</h3>
					<div key={q.name} className="answer">{elements}</div>
				</div>
			);
		})}
		</main>
	);
}

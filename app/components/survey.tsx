import React from 'react';
import type { Question } from '../../lib/types';

type Props = {
	questions: Question[];
	answers: { [key: string]: string };
	showQuestion: (q: Question, answers: Record<string, string>) => boolean;
	onRadioChange: (key: string, val: string) => void;
	onCheckboxChange: (key: string, val: string, textarea_name: string) => void;
	disableText: (id: string, val: string) => boolean;
	onTextChange: (key: string, val: string) => void;
};

// Page
export default function Main({ questions, answers, showQuestion, onRadioChange, onCheckboxChange, disableText, onTextChange }: Props) {
	return (
		<main id='survey'>
		{questions.map((q) => {
			// Answer elements
			let elements;
			// textarea
			if(q.type === 'textarea'){
				elements = <textarea name={q.name} id={q.name} className="large" />;
			// radio/checkbox
			}else{
				// Categories (if not defined set default values)
				const categories = q.categories ?? [{"title": null, "answers_from": 1, "answers_to": q.answers.length}];
				elements = (<>
					{categories.map((c) => (
						<React.Fragment key={c.answers_from}>
						{c.title ? <h4>{c.title}</h4> : null}
						<ul>
						{q.answers.slice(c.answers_from - 1, c.answers_to).map((a, j) => {
							const i = c.answers_from + j;
							const id = q.name + '_' + i;
							const text = q.with_no ? a.no + ' ' + a.text : a.text;
							if(q.type === 'radio'){
								return (
									<React.Fragment key={id}>
									<label key={id}><li className={!q.class ? "middle" : q.class}>
									<input type="radio" name={q.name} id={id} value={i} 
										checked={Number(answers[q.name]) === i} 
										onChange={(e) => onRadioChange(q.name, e.target.value)}
									/>{text}</li></label>
									{a.textarea_name ? <textarea name={a.textarea_name} id={a.textarea_name} disabled={disableText(q.name, String(i))} 
									value={answers[a.textarea_name]} onChange={(e) => onTextChange(a.textarea_name ?? '', e.target.value)} /> : null}
									</React.Fragment>
								);
							}else if(q.type === 'checkbox'){
								return (
									<React.Fragment key={id}>
									<label key={id}><li className={!q.class ? "middle" : q.class}>
									<input type="checkbox" name={id} id={id} 
										checked={answers[id] === '1'}
										onChange={(e) => onCheckboxChange(id, e.target.checked ? '1' : '0', a.textarea_name ?? '')} 
									/>{text}</li></label>
									{a.textarea_name ? <textarea name={a.textarea_name} id={a.textarea_name} disabled={disableText(id, '1')} 
									value={answers[a.textarea_name]} onChange={(e) => onTextChange(a.textarea_name ?? '', e.target.value)} /> : null}
									</React.Fragment>
								);
							}
						})}
						</ul>
						</React.Fragment>
					))}
				</>);
			}
			return(
				showQuestion(q, answers) ? (
				<div key={q.name} className="block">
					<h3>
						<div className="qno">Q{q.no}</div>
						<div className="question" dangerouslySetInnerHTML={{ __html: q.question }} />
					</h3>
					<div className="answer">{elements}</div>
				</div>
				) : null
			);
		})}
		</main>
	);
}

"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/header';
import Main from '../components/survey';
import Footer from '../components/footer';
import questions from '../../lib/questions.json';
import type { Question } from '../../lib/types';

export default function SurveyPage() {
	// Current Step
	const [currentStep, setCurrentStep] = useState(1);
	// Questions of Current Step
	const currentQuestions = questions.filter(q => q.step === currentStep);

	// Conditions to show/hide a question
	const showIf = {
		q1a: (answers: Record<string, string>) => answers.q1 === '1' || answers.q1 === '2',
		q10a: (answers: Record<string, string>) => answers.q10 === '3' || answers.q10 === '4',
		q14a: (answers: Record<string, string>) => answers.q14 === '2' || answers.q14 === '3',
		// q16a: (answers: Record<string, string>) => answers.q15_39 !== '1',
		q16b: (answers: Record<string, string>) => answers.q16a === '2' || answers.q16a === '3',
		q16c: (answers: Record<string, string>) => answers.q16a === '2' || answers.q16a === '3',
		q19a: (answers: Record<string, string>) => answers.q19 === '2',
		q20a: (answers: Record<string, string>) => answers.q20 === '2',
	};
	// Show/hide a question depending on above rules
	const showQuestion = (q: Question, answers: Record<string, string>) => {
		const key = q.name as keyof typeof showIf;
		const rule = showIf[key];
		return rule ? rule(answers ?? {}) : true;
	};
	
	// Answers
	const [answers, setAnswers] = useState<{ [key: string]: string }>({});
	// Answer on Change
	const onAnswerChange = (key: string, val: string, id: string) => {
		// Update answers
		setAnswers((prev) => {
			return { ...prev, [key]: val };
		});
		// Clear textarea
		if(disableText(key, val)){
			setAnswers((prev) => {
				const textarea_name = `${id}t`;
				if(textarea_name in prev){
					alert(textarea_name);
					return { ...prev, [textarea_name]: '' };
				}
				return prev;
			});
		}
	};
	// Enable/disable textarea
	const disableText = (key: string, val: string) => {
		const ret = answers[key] === undefined || answers[key] !== val;
					alert(ret);
		return ret;
	};
	// Textarea on Change
	const onTextChange = (key: string, val: string) => {
		// Update answers
		setAnswers((prev) => {
			return { ...prev, [key]: val };
		});
	};
	// Check all quesions in a page are answered
	const isAnswered= () => {
		return currentQuestions.every((q) => {
			// Skip if not shown
			if(!showQuestion(q, answers)){
				return true;
			}
			// Check if answered
			if(q.type === 'radio'){
				return answers[q.name] !== undefined && answers[q.name] !== '';
			}else if(q.type === 'checkbox'){
				return q.answers.some((_, i) => answers[`${q.name}_${i + 1}`] === '1');
			}
			return true;
		});
	};

	// Back
	const onBackClick = () => {
		// Go back to the previous step
		if(currentStep > 1){
			setCurrentStep(currentStep - 1);
		}
	};
	// Next
	const onNextClick = () => {
		// Go to the next step
		if(currentStep < Math.max(...questions.map(q => q.step))){
			setCurrentStep(currentStep + 1);
		// Submit
		}else{
			// Remove answeres of hidden questions
			const hiddenQuestions = questions.filter((q) => !showQuestion(q, answers)).map((q) => q.name);
			const validAnswers = Object.fromEntries(
				Object.entries(answers).filter(([key]) => !hiddenQuestions.includes(key))
			);
			// Update answers
			setAnswers(validAnswers);
			// Update DB
		}
	};

	return(
		<div id="container">
			<Header />
			<AnimatePresence mode="wait">
			<motion.div key={"s" + currentStep}
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 0 }}
				transition={{ duration: 0.4 }}
			>
			<Main
				questions={currentQuestions}
				answers={answers}
				showQuestion={showQuestion}
				onAnswerChange={onAnswerChange}
				disableText={disableText}
				onTextChange={onTextChange}
			/>
			</motion.div>
			</AnimatePresence>
			<Footer
				back={{
					label: 'BACK',
					onClick: onBackClick,
					disabled: currentStep === 1,
				}}
				next={{
					label: 'NEXT',
					onClick: onNextClick,
					disabled: !isAnswered(),
				}}
			/>
		</div>
	);
}

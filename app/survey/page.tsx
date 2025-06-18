"use client";

import { useState } from 'react';
import Header from '../components/header';
import Main from '../components/survey';
import Footer from '../components/footer';
import questions from '../../lib/questions.json';

export default function SurveyPage() {
	// 
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
	
	// Back
	const handleBack = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};
	// Next
	const handleNext = () => {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};
	return(
		<div id="container">
			<Header />
			<Main questions={questions} />
			<Footer
				back={{
					label: 'BACK',
					onClick: handleBack,
					disabled: true,
				}}
				next={{
					label: 'NEXT',
					onClick: handleNext,
					disabled: true,
				}}
			/>
		</div>
	);
}

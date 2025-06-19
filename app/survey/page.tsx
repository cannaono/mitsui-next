"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/header';
import Main from '../components/survey';
import Footer from '../components/footer';
import questions from '../../lib/questions.json';

export default function SurveyPage() {
	// Current Step
	const [currentStep, setCurrentStep] = useState(1);
	// Answers
	const [answers, setAnswers] = useState<{ [key: string]: string }>({});
	
	// Questions of Current Step
	const currentQuestions = questions.filter(q => q.step === currentStep);
	
	// Answer on Change
	const handleAnswerChange = (key: string, val: string) => {
		setAnswers(prev => ({
			...prev,
			[key]: val,
		}));
	};

	// Back
	const handleBack = () => {
		if(currentStep > 1){
			setCurrentStep(currentStep - 1);
		}
	};
	// Next
	const handleNext = () => {
		if(currentStep < Math.max(...questions.map(q => q.step))){
			setCurrentStep(currentStep + 1);
		}else{

		}
	};

	return(
		<div id="container">
			<Header />
			<AnimatePresence mode="wait">
			<motion.div key={currentStep}
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<Main
					questions={currentQuestions}
					answers={answers}
					onAnswerChange={handleAnswerChange}
				/>
			</motion.div>
			</AnimatePresence>
			<Footer
				back={{
					label: 'BACK',
					onClick: handleBack,
					disabled: currentStep === 1,
				}}
				next={{
					label: 'NEXT',
					onClick: handleNext,
					disabled: false,
				}}
			/>
		</div>
	);
}

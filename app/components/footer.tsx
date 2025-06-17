'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
	const router = useRouter();
	// Go Next
	const goNext = () => {
		// Go to Survey
		router.push('/survey');
	};
	// Go Back
	const goBack = () => {
	};
	return (
		<footer>
			<div><button onClick={goBack}>BACK</button></div>
			<div className={`right`}><button onClick={goNext}>NEXT</button></div>
			{/* <div className={`right`}><button onClick={goNext}>START NOW</button></div> */}
		</footer>
	);
}

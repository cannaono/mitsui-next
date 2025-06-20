'use client';

import type { JSX } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from './components/header';
import Footer from './components/footer';

// Contents
const contents: Record<string, { title: string; body: JSX.Element; footer: boolean; }> = {
	// Welcome
	welcome : {
		title: 'Welcome to the Integrity Awareness Survey 2025',
		body: (<>
			<p>This survey is conducted on behalf of Europe Bloc and MEA Bloc (&quot;Mitsui&quot;) by Newton Information Technology Ltd., an independent IT company, so you can be assured your answers and feedback will remain anonymous and will not be traceable by anyone at Mitsui.</p>
			<p>It is important that you complete the survey as honestly as possible so we may obtain accurate data on the level of integrity and compliance awareness in Mitsui. The results of the survey will be used to improve the compliance programme of Mitsui. This is a short survey and should not take you long to complete. The names and answers of participants will be kept confidential.</p>
			<p>Please click on the <strong>&quot;START NOW&quot;</strong> button when you are ready.</p>
		</>),
		footer: true,
	},
	// Thank You
	thankyou: {
		title: 'Thank you for your cooperation',
		body: (<>
			<h4>If you wish to locate or access any of the following, please click on the links below.</h4>
			<p><a href="https://mitsui365.sharepoint.com/sites/02810/0007/Document4_JA/90/50/WithIntegrity_E.pdf?CID=e900688a-0638-400e-b3e8-cfaac038a22b" target="_blank">&quot;With Integrity&quot; Mitsui & Co. Group Conduct Guidelines</a></p>
			<p><a href="https://mitsui365.sharepoint.com/sites/02840/e" target="_blank">Mitsui Tokyo Integrity Portal</a></p>
			<p><a href="https://mitsui365.sharepoint.com/sites/02810/1002/Document4_EN/08_0_. Policies and Procedures/01. EMEA/A. Management/A0400 Business Conduct Guidelines.pdf" target="_blank">Europe Bloc Business Conduct Guidelines</a></p>
			<p><a href="https://mitsui365.sharepoint.com/sites/02810/1005/Document4_EN/6 Policies %26 Manuals/1 MEA Bloc Common/01 Internal Rules/02. MEA_Business Conduct Guidelines.pdf" target="_blank">Middle East and Africa Bloc Business Conduct Guidelines</a></p>
			<p><a href="https://mgp.mitsui.com/1002/policies-europe-bloc" target="_blank">Europe Bloc Internal Rules on MGP</a></p>
			<p><a href="https://mgp.mitsui.com/1005/Internal-Regulations" target="_blank">MEA Bloc Internal Regulations on MGP</a></p>
			<p><a href="https://mgp.mitsui.com/1002/speak-up" target="_blank">Speak Up! Page</a></p>
			<p><a href="https://secure.ethicspoint.eu/domain/media/en/gui/106961/index.html" target="_blank">EthicsPoint Hotline</a></p>
		</>),
		footer: false,
	},
	// Error
	error: {
		title: 'An error occurred during the process',
		body: (<>
			<p>Sorry for the inconvenience.</p>
			<p>Please click on the <strong>&quot;START NOW&quot;</strong> button to restart the survey.</p>
		</>),
		footer: true,
	},
};

// Page
export default function Home() {
	const searchParams = useSearchParams();
	const type = searchParams.get('page') || 'welcome';
	const content = contents[type as keyof typeof contents] || contents.welcome;
	const router = useRouter();
	return(
		<div id="container">
			<Header />
			<main id='home'>
				<div className='block'>
					<h3>{content.title}</h3>
					<div>{content.body}</div>
				</div>
			</main>
			{content.footer && (
				<Footer
					next={{
						label: 'START NOW',
						onClick: () => router.push('/survey'),
						disabled: false,
					}}
				/>
			)}
		</div>
	);
}

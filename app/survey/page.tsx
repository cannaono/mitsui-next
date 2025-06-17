import Header from '../components/header';
import Main from '../components/survey';
import Footer from '../components/footer';
import questions from '../../lib/questions.json';

export default function SurveyPage() {
	return(
		<div id="container">
			<Header />
			<Main questions={questions} />
			<Footer />
		</div>
	);
}

import Header from '../components/header';
import Main from '../components/admin';
import questions from '../../lib/questions.json';

export default function AdminPage() {
	return (
		<div id="container">
			<Header />
			<Main questions={questions} />
		</div>
	);
}

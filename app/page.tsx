
import { Suspense } from 'react';
import Home from './components/home';

export default function Page() {
	return (
		<Suspense>
			<Home />
		</Suspense>
	 );
}

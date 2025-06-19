import type { FooterButton } from '../../lib/types';

type Props = {
	back?: FooterButton;
	next?: FooterButton;
};

export default function Footer({ back, next }: Props) {
	return(
		<footer>
			<div className="left">{back && (<button type="button" onClick={back.onClick} disabled={back.disabled}>{back.label}</button>)}</div>
			<div className="right">{next && (<button type="button" onClick={next.onClick} disabled={next.disabled}>{next.label}</button>)}</div>
		</footer>
	)
};
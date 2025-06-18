// Question
export type Question = {
	name: string;
	type: string;
	no: string;
	step: number;
	question: string;
	class?: string;
	with_no?: boolean;
	prev_name?: string;
	res?: number;
	num?: number;
	res_rate?: number;
	answers: {
		no: string;
		text: string;
		num?: number;
		prev_num?: number;
		prev?: string;
		res?: number;
		rate?: number;
		res_rate?: number;
	}[];
	addional_textarea?: {
		name: string;
	};
	categories?: {
		title: string;
		answers_from: number;
		answers_to: number;
	}[];
};

// Footer button
export type FooterButton = {
	label: string;
	onClick: () => void;
	disabled: boolean;
};

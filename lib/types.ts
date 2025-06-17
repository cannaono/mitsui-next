// Question
export type Question = {
	name: string;
	type: string;
	q_no: string;
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
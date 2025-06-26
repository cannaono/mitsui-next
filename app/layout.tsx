import type { Metadata } from "next";
import { Noto_Sans_JP } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
	title: "Europe Bloc and MEA Bloc Integrity Awareness Survey 2025",
	description: "Europe Bloc and MEA Bloc Integrity Awareness Survey 2025",
};

const notoSans = Noto_Sans_JP({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
	preload: false,
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
	return (
		<html lang="en">
			<body className={notoSans.className}>
				{children}
			</body>
		</html>
	);
}

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'News Aggregator',
	description: 'A modern news aggregator built with Next.js',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(inter.className, 'min-h-screen bg-slate-50')}
				suppressHydrationWarning
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

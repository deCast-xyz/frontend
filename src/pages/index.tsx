import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="grid">
				<div>
					<h4>Build your engaging community with live interaction</h4>
					<p>
						1. Crowd fund with Sponsor NFT (Revenue share) <br />
						2. Sell Subscription for super fans <br />
						3. Hold live streaming and interactive video events
						<br />
					</p>
				</div>
			</div>
		</main>
	);
}

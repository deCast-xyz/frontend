import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between">
			<div className="grid grid-cols-2 gap-5 place-items-center">
				<div className="space-y-10">
					<h4 className="text-5xl font-bold mb-5">Open-sourced Live Streaming</h4>
					<p>Customize and add whatever modules you want</p>

					<ConnectButton />
				</div>

				<div>
					<img src="/home.svg" />
				</div>
			</div>

			<div className="text-center text-white my-24">All-in-One and Extensive Platform for</div>

			<div className="grid grid-cols-2 gap-5 text-center">
				<div>
					<div className="font-bolder text-8xl mb-3">36B</div>
					<p>hours live streaming watched / year</p>
				</div>
				<div>
					<div className="font-bolder text-8xl mb-3">7.0M</div>
					<p>Live streamers every month</p>
				</div>
			</div>

			<div className="blur_effect"></div>
		</main>
	);
}

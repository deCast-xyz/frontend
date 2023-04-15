import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic'
import type { ISuccessResult } from "@worldcoin/idkit";

const IDKitWidget = dynamic(() => import('@worldcoin/idkit').then(mod => mod.IDKitWidget), { ssr: false })

import { useAccount } from 'wagmi';

const inter = Inter({ subsets: ['latin'] });


export default function Home() {
	const { address } = useAccount();
	const handleProof = useCallback((result: ISuccessResult) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 3000);
			// NOTE: Example of how to decline the verification request and show an error message to the user
		});
	}, []);

	const onSuccess = (result: ISuccessResult) => {
		console.log(result);
	};


	return (
		<main className="flex flex-col items-center justify-between">
			<div className="grid grid-cols-2 gap-5 place-items-center">
				<div className="space-y-10">
					<h4 className="text-5xl font-bold mb-5">Open-source Live Streaming</h4>
					<p>Customize and add whatever modules you want</p>

					<div className="connect">{!address ? <ConnectButton /> : null}</div>
				</div>
				<div>
					<img src="/home.svg" />
				</div>

			</div>
			<div>
			<IDKitWidget
					action="my_action"
					signal="my_signal"
					onSuccess={onSuccess}
					handleVerify={handleProof}
					app_id="app_staging_2179d9c879445f41b4fa81f27e38275b"
					// walletConnectProjectId="get_this_from_walletconnect_portal"
				>
					{({ open }) => <button onClick={open}>Click me</button>}
				</IDKitWidget>
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

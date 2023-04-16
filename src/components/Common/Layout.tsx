import { Button } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ISuccessResult } from '@worldcoin/idkit';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
const IDKitWidget = dynamic(() => import('@worldcoin/idkit').then((mod) => mod.IDKitWidget), { ssr: false });

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { address, isConnecting, isDisconnected } = useAccount();

	const handleProof = useCallback((result: ISuccessResult) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 3000);
			// NOTE: Example of how to decline the verification request and show an error message to the user
		});
	}, []);

	const onSuccess = (result: ISuccessResult) => {
		console.log(result);
	};

	// useEffect(() => {
	// 	const init = async () => {
	// 		if (address && (router.asPath == '/' || router.asPath == '/register')) {
	// 			const nftContractAddress = '0x5fCB84F95E7ee10FE552B3803DF418b39FE2cA6E';
	// 			const nftContractAbi = UniversalAbi;

	// 			const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.NEXT_PUBLIC_ALCHEMY_ID!);
	// 			const nftContract = new ethers.Contract(nftContractAddress, nftContractAbi, provider);

	// 			const balance = await nftContract.balanceOf(address);

	// 			if (balance.toString() == 0) {
	// 				router.push('/register');
	// 			} else {
	// 				router.push('/viewers');
	// 			}
	// 		}
	// 	};

	// 	init();
	// }, [address]);

	return (
		<section className="bg-[#010314]">
			<header className="flex justify-between items-center p-5 bg-[#010314]">
				<Link href="/" passHref>
					<img src="/logo.svg" alt="" className="w-32" />
				</Link>

				<div className="flex items-center space-x-8">
					{address ? (
						<Link href="/register" passHref>
							<Button color="gray" radius={'lg'} className="bg-white">
								Are you creator?
							</Button>
						</Link>
					) : null}

					<div className="connect">
						<ConnectButton />
					</div>
					<IDKitWidget
						action="my_action"
						signal="my_signal"
						onSuccess={onSuccess}
						handleVerify={handleProof}
						app_id="app_staging_2179d9c879445f41b4fa81f27e38275b"
						// walletConnectProjectId="get_this_from_walletconnect_portal"
					>
						{({ open }) => <button onClick={open}>WorldCoin</button>}
					</IDKitWidget>
				</div>
			</header>
			<main className="mx-auto container px-1 sm:px-6 md:px-10 relative xl:py-20 2xl:py-28 min-h-screen bg-[#010314] text-white">
				{children}
			</main>

			<footer>
				<p className="text-center text-sm text-gray-500 bg-[#010314] py-5">Copyright © 2023 DeCast</p>
			</footer>
		</section>
	);
};

export default Layout;

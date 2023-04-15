import UniversalAbi from '@/constants/abi/UniversalABI';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { address, isConnecting, isDisconnected } = useAccount();
	useEffect(() => {
		const init = async () => {
			if (address && router.asPath === '/') {
				const nftContractAddress = '0x5fCB84F95E7ee10FE552B3803DF418b39FE2cA6E';
				const nftContractAbi = UniversalAbi;

				const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.NEXT_PUBLIC_ALCHEMY_ID!);
				const nftContract = new ethers.Contract(nftContractAddress, nftContractAbi, provider);

				const balance = await nftContract.balanceOf(address);

				if (balance.toString() == 0) {
					router.push('/viewers');
				} else {
					router.push('/modules');
				}
			}
		};

		init();
	}, [address]);

	return (
		<section className="bg-[#010314]">
			<header className="flex justify-between items-center p-5 bg-[#010314]">
				<Link href="/" passHref>
					<img src="/logo.svg" alt="" className="w-32" />
				</Link>

				<div className="flex items-center space-x-8">
					<>
						{address && (
							<Link passHref href={'/modules'}>
								Modules
							</Link>
						)}

						<ConnectButton />
					</>
				</div>
			</header>
			<main className="mx-auto container px-1 sm:px-6 md:px-10 relative xl:py-20 2xl:py-28 min-h-screen bg-[#010314] text-white">
				{children}
			</main>

			<footer>
				<p className="text-center text-sm text-gray-500 bg-[#010314] py-5">Copyright Decast</p>
			</footer>
		</section>
	);
};

export default Layout;

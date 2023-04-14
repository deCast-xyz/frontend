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
			if (address) {
				// Specify the address of the NFT contract and the user's address
				const nftContractAddress = '0x5fCB84F95E7ee10FE552B3803DF418b39FE2cA6E'; // replace with the actual address

				// Specify the ABI of the NFT contract
				const nftContractAbi = UniversalAbi;

				// Create an instance of the NFT contract using the Contract object provided by Ethers
				const provider = new ethers.providers.InfuraProvider();
				const nftContract = new ethers.Contract(nftContractAddress, nftContractAbi, provider);

				// Call the balanceOf function to check how many NFTs the user is holding
				const tokenId = '0x....'; // replace with the actual token ID
				const balance = await nftContract.balanceOf(address);

				console.log(address);
				console.log('balance');
				console.log(balance);

				// if (balance == 0) {
				// 	router.push('/register');
				// } else {
				// 	router.push('/new_stream');
				// }

				// check whether the user has a nft
				// if user has no nft, redirect to /register
				// or just redirect to new_stream
			}
		};

		init();
	}, [address]);

	return (
		<>
			<header className="flex justify-between p-5">
				<div>
					<Link href="/" passHref>
						deCast
					</Link>
				</div>
				<ConnectButton />
			</header>
			<main className="mx-auto container px-1 sm:px-6 md:px-10 relative xl:py-20 2xl:py-28 min-h-screen">
				{children}
			</main>

			<footer>
				<p className="text-center text-gray-500">Footer</p>
			</footer>
		</>
	);
};

export default Layout;

import UniversalAbi from '@/constants/abi/UniversalABI';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const Mint = () => {
	const { address } = useAccount();
	const router = useRouter();

	useEffect(() => {
		const verify = async () => {
			const nftContractAddress = '0x5fCB84F95E7ee10FE552B3803DF418b39FE2cA6E';
			const nftContractAbi = UniversalAbi;

			const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.NEXT_PUBLIC_ALCHEMY_ID!);
			const nftContract = new ethers.Contract(nftContractAddress, nftContractAbi, provider);

			const balance = await nftContract.balanceOf(address);

			console.log(balance);

			if (balance.toString() != 0) {
				router.push('/viewers');
			}
		};

		verify();
	}, []);

	return (
		<div className="grid grid-place-items-center justify-center">
			<iframe
				src="https://ipfs.thirdwebcdn.com/ipfs/QmbAgC8YwY36n8H2kuvSWsRisxDZ15QZw3xGZyk9aDvcv7/erc1155.html?contract=0x3217A2D822a4808f4E7EC31434903F3613eba097&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%7D&tokenId=0&theme=dark&primaryColor=red"
				width="600px"
				height="600px"
			></iframe>
		</div>
	);
};

export default Mint;

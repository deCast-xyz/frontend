import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import * as PushAPI from '@pushprotocol/restapi';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const groupchat = () => {
	const { address } = useAccount();
	const { library } = useWeb3React<ethers.providers.Web3Provider>();

	useEffect(() => {
		async function startChat() {
			const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');

			console.log(provider);
			//@ts-ignore
			await provider.provider?.enable();
			//@ts-ignore
			const signer = provider?.getSigner();

			if (signer && signer) {
				// const provider = window.ethereum;
				const address = await signer.getAddress();

				const createUser = await PushAPI.user.create({
					signer: signer as any,
				});

				const getUser = await PushAPI.user.get({
					account: `eip155:80001:${address}`,
				});

				console.log(signer.getAddress());

				const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
					encryptedPGPPrivateKey: getUser.encryptedPrivateKey,
					signer: signer as any,
				});

				// actual api
				const response = await PushAPI.chat.createGroup({
					groupName: 'Push Group Chat 3',
					groupDescription: 'This is the oficial group for Push Protocol',
					members: [
						'0x9e60c47edF21fa5e5Af33347680B3971F2FfD464',
						'0x3829E53A15856d1846e1b52d3Bdf5839705c29e5',
					],
					groupImage: ' &lt;group image link&gt;',
					admins: ['0x3829E53A15856d1846e1b52d3Bdf5839705c29e5'],
					isPublic: true,
					account: '0xD993eb61B8843439A23741C0A3b5138763aE11a4',
					pgpPrivateKey: pgpDecryptedPvtKey, //decrypted private key
				});
				console.log(response);
			}
		}

		startChat();
	}, [library]);
};

export default groupchat;

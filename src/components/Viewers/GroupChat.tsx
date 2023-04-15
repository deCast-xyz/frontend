import { useState } from 'react';
import { useAccount } from 'wagmi';

import { Button } from '@mantine/core';
import * as PushAPI from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

const GroupChat = () => {
	const [processing, setProcessing] = useState<any>(null);
	const { address: address2 } = useAccount();
	const { library } = useWeb3React<ethers.providers.Web3Provider>();

	const groupChat = async () => {
		const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');

		console.log(provider);
		//@ts-ignore
		await provider.provider?.enable();
		//@ts-ignore
		const signer = provider?.getSigner();

		if (signer && signer) {
			let getUser = await PushAPI.user.get({
				account: `eip155:${address2}`,
				env: ENV.STAGING,
			});

			if (!getUser) {
				getUser = await PushAPI.user.create({
					signer: signer as any,
					env: ENV.STAGING,
				});
			}

			getUser = await PushAPI.user.get({
				account: `eip155:${address2}`,
				env: ENV.STAGING,
			});

			setProcessing(getUser);

			console.log('getUser');
			console.log(getUser);
			console.log('getUser');

			const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
				encryptedPGPPrivateKey: getUser.encryptedPrivateKey,
				signer: signer as any,
				env: ENV.STAGING,
			});

			const response = await PushAPI.chat.createGroup({
				groupName: randomName,
				groupDescription: 'This is the oficial group for Push Protocol',
				members: ['0x9e60c47edF21fa5e5Af33347680B3971F2FfD464', '0x3829E53A15856d1846e1b52d3Bdf5839705c29e5'],
				groupImage: ' &lt;group image link&gt;',
				admins: [],
				isPublic: true,
				//@ts-ignore
				signer,
				pgpPrivateKey: pgpDecryptedPvtKey,
				env: ENV.STAGING,
			});
			console.log(response);
		}
	};

	return (
		<>
			<Button
				className="white_button"
				onClick={() => {
					groupChat();
				}}
			>
				Join Chat
			</Button>
		</>
	);
};

export default GroupChat;

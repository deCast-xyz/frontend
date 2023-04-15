import { Framework } from '@superfluid-finance/sdk-core';

export const createFlow = async (sender, receiver, flowRate, provider, signer) => {
	// const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	// const signer = await provider.getSigner()
	// const sender = await signer.getAddress()

	console.log(signer);
	const sf = await Framework.create({
		chainId: 80001,
		provider,
	});
	const daix = await sf.loadSuperToken('fDAIx');
	console.log(daix);

	let flowOp = daix.createFlow({
		sender: sender,
		receiver: receiver,
		flowRate: flowRate,
	});

	// @jijin pass in signer
	const create = await flowOp.exec(signer); // should have same address as `sender`
	console.log(create);
};

export const getFlow = async (sender, receiver, providerOrSigner) => {
	// const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	// const signer = await provider.getSigner()
	// const sender = await signer.getAddress()

	const sf = await Framework.create({
		chainId: 80001,
		provider,
	});

	const daix = await sf.loadSuperToken('fDAIx');

	let res = await daix.getFlow({
		sender: sender,
		receiver: receiver,
		// @jijin pass in provider here
		providerOrSigner: provider,
	});

	// if rate returned (res.rate) is 0 then content should be blocked
	return res > 0;
};

export const deleteFlow = async () => {
	// const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	// const signer = await provider.getSigner()
	// const sender = await signer.getAddress()

	// @jijin pass in provider here
	const sf = await Framework.create({
		chainId: 80001,
		provider,
	});

	const daix = await sf.loadSuperToken('fDAIx');

	let flowOp = daix.deleteFlow({
		sender: sender,
		receiver: receiver,
	});

	// @jijin pass in signer
	const del = await flowOp.exec(signer); // should have same address as sender
	console.log(del);
};

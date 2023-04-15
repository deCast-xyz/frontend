// button component - brand new
// cwatchMint - new component
// onMount - readContract state - activeStream
// ternanryOperator
// button - ternanry-
// ternanry for function as well
import { db } from '@/util/db';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { creators } from '@prisma/client';
import { ethers } from 'ethers';
import { GetStaticProps } from 'next';
import Link from 'next/link.js';
import { useAccount } from 'wagmi';
import { createFlow } from '../../utils/superfluid.js';
// wag

// when user clicks on subscribe button
// it will call the createFlow function and start the flow
// user should get redirected
const Subscribe = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const { address } = useAccount();

	return (
		<>
			<Modal opened={opened} onClose={close} title="Subscribe">
				<div>
					<p>Subscribe to this stream to watch it live</p>
					<div className="flex items-center justify-between my-5">
						<span>Cost</span> <div>22.5 DAI Streemed</div>
					</div>

					<div className="bg-[#13161B] p-2 rounded-lg mb-2">
						This subscription is streamed to the creator using superfluid.
					</div>

					<Button
						onClick={async () => {
							const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
							await provider.send('eth_requestAccounts', []);
							console.log(provider);

							createFlow(
								address,
								'0x4E317b5952a307aE1B9cc3b5b12e07dC2065f733',
								(((30 * 10) ^ ((18 / 365) * 24 * 60 * 60)) * 12).toString(),
								provider,
								await provider.getSigner()
							);
						}}
						color="green"
						radius={'lg'}
						fullWidth
						className="mt-2"
					>
						Subscribe
					</Button>
				</div>
			</Modal>

			<Button onClick={open} color="red" radius={'lg'} fullWidth className="mt-2">
				Subscribe
			</Button>
		</>
	);
};

const ViewerCard = ({ creator, hideSubscribe = false }: { creator: creators; hideSubscribe?: boolean }) => {
	return (
		<div className="flex flex-wrap -mx-1 ">
			<div className="border-gray-900">
				<article className="overflow-hidden rounded-lg shadow-lg">
					<a href="#">
						<img alt="" className="block h-auto w-full" src={creator.image ?? ''} />
					</a>
					<div className="bg-gray-900  p-2 md:p-4">
						<footer className="flex  items-center justify-between leading-none mb-5">
							<a className="flex items-center no-underline hover:underline " href="#">
								<img alt="" className="block rounded-full" src={creator.avatar ?? ''} />
								<div className="text-lg ml-5">
									<a className="no-underline hover:underline " href="#">
										{creator.membership_name}
									</a>
									<p className="text-sm">by {creator.creator_name}</p>
								</div>
							</a>
						</footer>

						{!hideSubscribe ? (
							<Subscribe />
						) : (
							<Link passHref href={'/viewers/watch/0xf1996154c34e3dc77b26437a102231785e9ad7fe'}>
								<Button color="blue" radius={'lg'} fullWidth>
									Watch
								</Button>
							</Link>
						)}
					</div>
				</article>
			</div>
		</div>
	);
};

export const getServerSideProps: GetStaticProps = async (context: any) => {
	const creators = await db.creators.findMany({});

	return {
		props: { creators: JSON.stringify(creators) },
	};
};
const Viewers = ({ creators }: { creators: any }) => {
	const creators_list = JSON.parse(creators);

	console.log(creators_list);

	return (
		<>
			<div className="container my-12 mx-auto px-4 md:px-12 space-y-6">
				<section>
					<div className="text-2xl mb-5">Subscribed live streams </div>

					<div className="grid md:grid-cols-3 gap-5 ">
						{creators_list.map((item: creators) => {
							return <ViewerCard key={item.creator_id} creator={item} hideSubscribe={true} />;
						})}
					</div>
				</section>

				<section>
					<div className="text-2xl mb-5">You maybe interested in</div>

					<div className="grid md:grid-cols-3 gap-5 ">
						{creators_list.map((item: creators) => {
							return <ViewerCard creator={item} key={item.creator_id} />;
						})}
					</div>
				</section>
			</div>
		</>
	);
};

export default Viewers;

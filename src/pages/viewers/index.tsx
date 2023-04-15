// button component - brand new
// cwatchMint - new component
// onMount - readContract state - activeStream
// ternanryOperator
// button - ternanry-
// ternanry for function as well

import { Button } from '@mantine/core';

// wag

const ViewerCard = ({ hideSubscribe = false }: { hideSubscribe?: boolean }) => {
	return (
		<div className="flex flex-wrap -mx-1 ">
			<div className="border-gray-900">
				<article className="overflow-hidden rounded-lg shadow-lg">
					<a href="#">
						<img
							alt="Placeholder"
							className="block h-auto w-full"
							src="https://picsum.photos/600/400/?random"
						/>
					</a>
					<div className="bg-gray-900  p-2 md:p-4">
						<footer className="flex  items-center justify-between leading-none mb-5">
							<a className="flex items-center no-underline hover:underline " href="#">
								<img
									alt="Placeholder"
									className="block rounded-full"
									src="https://picsum.photos/32/32/?random"
								/>
								<div className="text-lg ml-5">
									<a className="no-underline hover:underline " href="#">
										Sakura Event Apr 15
									</a>
									<p className="text-sm">by Andrew</p>
								</div>
							</a>
						</footer>

						{!hideSubscribe ? (
							<Button color="red" radius={'lg'} fullWidth className="mt-2">
								Subscribe
							</Button>
						) : (
							<Button color="blue" radius={'lg'} fullWidth>
								Watch
							</Button>
						)}
					</div>
				</article>
			</div>
		</div>
	);
};

const index = () => {
	return (
		<>
			<div className="container my-12 mx-auto px-4 md:px-12 space-y-6">
				<section>
					<div className="text-2xl mb-5">List of available streams: </div>

					<div className="grid md:grid-cols-3 gap-5 ">
						<ViewerCard hideSubscribe />
						<ViewerCard hideSubscribe />
						<ViewerCard hideSubscribe />
					</div>
				</section>

				<section>
					<div className="text-2xl mb-5">Live Stream by Creators you may want to subscribe </div>

					<div className="grid md:grid-cols-3 gap-5 ">
						<ViewerCard />
						<ViewerCard />
						<ViewerCard />
					</div>
				</section>
			</div>
		</>
	);
};

export default index;

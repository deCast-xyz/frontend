import ImageUpload from '@/components/Common/ImageUpload';
import { useCreateStream } from '@livepeer/react';
import { Client } from '@livepeer/webrtmp-sdk';
import { Button, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';

export const ModulesList = [
	{
		name: 'Stream-gated',
		description: 'Grant access to a 1 on 1 video call with you  (or someone else)',
		bg_color: '#FAFFF4',
		icon: '/icons/superfluid.jpg',
	},
	{
		name: 'NFT-gated with Sismo',
		description: 'Only NFT holders can access the live streaming (they can prove it privately)',
		bg_color: '#F7F4FF',
		icon: '/icons/nft.jpg',
	},
	{
		name: 'NFT-gated',
		description: 'Only NFT holders can access the live streaming (they can prove it privately)',
		bg_color: '#E2FBFF',
		icon: '/icons/nft.jpg',
	},
	{
		name: '1 on 1 meeting',
		description: 'Grant access to a 1 on 1 video call with you ',
		bg_color: '#F1FBFF',
		icon: '/icons/1v1.jpg',
	},
	{
		name: 'Tipping',
		description: 'Add tipping module to your live streaming',
		bg_color: '#FFFBEF',
		icon: '/icons/tip.jpg',
	},
	{
		name: 'POAP',
		description: 'Receive POAP by joining the live streaming',
		bg_color: '#F7F4FF',
		icon: '/icons/poap.jpg',
	},
	{
		name: 'Celo',
		description: 'You can use carbon-negative, mobile-first, EVM-compatible blockchain',
		bg_color: '#E2FBFF',
		icon: '/icons/celo.png',
	},
	{
		name: 'Receive POAP by joining the live streaming',
		description: 'You can split your revenue to the your preferred public good',
		bg_color: '#E2FBFF',
		icon: '/icons/poap.jpg',
	},
	{
		name: 'Lens followers',
		description: 'Grant access to an exclusive channel on Discord server',
		bg_color: '#FAFFF4',
		icon: '/icons/lens.jpg',
	},
];

export const ModulesAction = ({
	title,
	icon,
	description,
	bg_color,
	setActive,
	active,
}: {
	title: string;
	icon?: string;
	bg_color: string;
	description: string;
	active?: string[];
	setActive?: (data: string[]) => void;
}) => {
	return (
		<div
			className={`cursor-pointer text-gray-900 border rounded-lg p-5	border-gray-100
			`}
			style={{
				backgroundColor: bg_color,
			}}
			onClick={() => {
				if (active && setActive) {
					if (active.includes(title)) {
						setActive(active.filter((item) => item !== title));
					} else {
						setActive([...active, title]);
					}
				}
			}}
		>
			<h6 className="text-l flex items-center">
				<img src={icon} className="w-4 h-4 mr-2" />
				{title}
			</h6>

			<p className="text-gray-500 text-sm mt-2">{description}</p>
		</div>
	);
};

const Modules = () => {
	const router = useRouter();
	const { address } = useAccount();
	const [active, setActive] = useState<string[]>([]);

	const [streamName, setStreamName] = useState<string>('');

	const video = useRef<HTMLVideoElement>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const [isLive, setIsLive] = useState<boolean>(false);

	const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null);

	const isLoading = useMemo(() => status === 'loading', [status]);

	useEffect(() => {
		(async () => {
			console.log('running');
			console.log(stream);
			if (stream) {
				console.log(stream);

				if (video.current) {
					video.current.volume = 0;

					streamRef.current = await navigator.mediaDevices.getDisplayMedia({
						video: true,
						audio: true,
					});

					video.current.srcObject = streamRef.current;
					video.current.play();
					goLive();
				}
			}
		})();
	}, [stream]);

	const goLive = async () => {
		const streamKey = stream?.streamKey;
		const playbackId = stream?.playbackId;

		const response = await fetch('/api/account/live_stream', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				stream_id: streamKey,
				wallet_address: address,
				playback_id: playbackId,
			}),
		});

		if (!streamRef.current) {
			alert('Video stream was not started.');
		}

		if (!streamKey) {
			alert('Invalid streamKey.');
			return;
		}

		const client = new Client();

		// @ts-ignore
		const session = client.cast(streamRef.current, streamKey);
		setIsLive(true);
		session.on('open', () => {
			console.log('Stream started.');
			alert('Stream started; visit Livepeer Dashboard.');
		});

		session.on('close', () => {
			console.log('Stream stopped.');
		});

		session.on('error', (err) => {
			console.log('Stream error.', err.message);
		});
	};

	console.log(stream);

	return (
		<section className="bg-[#13161B] p-5 rounded-lg">
			<h4 className="text-xl text-white font-medium mb-5">{isLive ? 'LIVE' : 'New'} Stream</h4>

			{!isLive ? (
				<div className="space-y-5">
					<TextInput type="text" label="Stream name" onChange={(e) => setStreamName(e.target.value)} />
					<div className="grid grid-cols-5 gap-5">
						<ImageUpload label="Profile Image" isDetailsHidden />
					</div>
				</div>
			) : null}

			<>
				{stream ? (
					<section className="mb-5">
						<CopyToClipboard text={stream.rtmpIngestUrl} onCopy={() => toast.success('Server Copied!')}>
							<TextInput readOnly value={stream.rtmpIngestUrl} label="Server" />
						</CopyToClipboard>

						<CopyToClipboard text={stream.streamKey} onCopy={() => toast.success('Key Copied!')}>
							<TextInput readOnly value={stream.streamKey} label="Stream key" />
						</CopyToClipboard>

						<p className="text-sm text-gray-500"> Please paste this key and start stream in OBS.</p>
					</section>
				) : null}
			</>

			{!isLive ? (
				<>
					<h5 className="text-gray-100 font-normal mt-5">Choose Modules & start streaming</h5>

					<div className="grid md:grid-cols-3 gap-5 mt-5 mb-5">
						{ModulesList.map((item) => (
							<ModulesAction
								active={active}
								setActive={setActive}
								icon={item.icon}
								bg_color={item.bg_color}
								title={item.name}
								description={item.description}
							/>
						))}
					</div>

					{active.length !== 0 ? (
						<>
							<h5 className="text-gray-500 mb-3">Selected Modules</h5>

							<div className="space-y-1">
								{active.map((item) => (
									<p
										className="border px-2 py-1 border-gray-700 text-gray-200 rounded-lg text-sx"
										key={item}
									>
										{item}
									</p>
								))}
							</div>
						</>
					) : null}
				</>
			) : null}

			{!stream && (
				<Button
					className="my-5 white_button"
					color="dark"
					onClick={() => {
						createStream?.();
					}}
					disabled={isLoading || !createStream}
				>
					Start Streaming
				</Button>
			)}

			<div>
				<video className="mt-0 rounded-md" ref={video} />
			</div>
		</section>
	);
};

export default Modules;

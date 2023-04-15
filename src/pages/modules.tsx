import ImageUpload from '@/components/Common/ImageUpload';
import { useCreateStream } from '@livepeer/react';
import { Client } from '@livepeer/webrtmp-sdk';
import { Button, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';

const ModulesAction = ({
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
	active: string[];
	setActive: (data: string[]) => void;
}) => {
	return (
		<div
			className={`cursor-pointer text-gray-900 border rounded-lg p-5	border-gray-100
			`}
			style={{
				backgroundColor: bg_color,
			}}
			onClick={() => {
				if (active.includes(title)) {
					setActive(active.filter((item) => item !== title));
				} else {
					setActive([...active, title]);
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

		const response = await fetch('/api/account/live_stream', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				stream_id: streamKey,
				wallet_address: address,
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
		<section className="bg-white p-5 rounded-lg">
			<h4 className="text-xl text-gray-900 font-medium mb-5">{isLive ? 'LIVE' : 'New'} Stream</h4>

			{!isLive ? (
				<div className="space-y-5">
					<TextInput type="text" label="Stream name" onChange={(e) => setStreamName(e.target.value)} />
					<div className="grid grid-cols-5 gap-5">
						<ImageUpload label="Profile Image" isDetailsHidden />
					</div>
				</div>
			) : null}

			<>
				<>
					{stream ? (
						<>
							<CopyToClipboard text={stream.rtmpIngestUrl} onCopy={() => toast.success('Server Copied!')}>
								<TextInput readOnly value={stream.rtmpIngestUrl} label="Server" />
							</CopyToClipboard>

							<CopyToClipboard text={stream.streamKey} onCopy={() => toast.success('Key Copied!')}>
								<TextInput readOnly value={stream.streamKey} label="Stream key" />
							</CopyToClipboard>

							<p className="text-sm text-gray-500"> Please paste this key and start stream in OBS.</p>
						</>
					) : null}
				</>
			</>

			{!isLive ? (
				<>
					<h5 className="text-gray-900 font-normal mt-5">Choose Modules & start streaming</h5>

					<div className="grid md:grid-cols-3 gap-5 mt-5 mb-5">
						<ModulesAction
							active={active}
							setActive={setActive}
							icon="https://www.beyondclub.xyz/assets/images/logo.svg"
							bg_color={'#F1FBFF'}
							title="Live Stream"
							description="Create a live stream"
						/>
						<ModulesAction
							active={active}
							icon="https://www.beyondclub.xyz/assets/images/logo.svg"
							bg_color={'#F7F4FF'}
							setActive={setActive}
							title="Token Gated"
							description="Token gated content"
						/>
					</div>

					{active.length !== 0 ? (
						<>
							<h5 className="text-gray-500 mb-3">Selected Modules</h5>

							<div className="space-y-1">
								{active.map((item) => (
									<p className="border px-2 py-1 text-gray-500 rounded-lg text-sx" key={item}>
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
					className="my-5"
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

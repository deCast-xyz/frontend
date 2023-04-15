import { useCreateStream } from '@livepeer/react';
import { Client } from '@livepeer/webrtmp-sdk';
import { Button, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const ModulesAction = ({
	id,
	title,
	icon,
	description,
	bg_color,
	setActive,
	active,
}: {
	id: string;
	title: string;
	icon?: string;
	bg_color: string;
	description: string;
	active: string[];
	setActive: (data: string[]) => void;
}) => {
	return (
		<div
			className={`cursor-pointer text-gray-900  rounded-lg p-5	border-gray-600
			`}
			style={{
				borderColor: active.includes(id) ? '#2a2b3a' : 'rgb(59 130 246)',
				backgroundColor: bg_color,
			}}
			onClick={() => {
				if (active.includes(id)) {
					setActive(active.filter((item) => item !== id));
				} else {
					setActive([...active, id]);
				}
			}}
		>
			<h4 className="text-xl flex items-center">
				<img src={icon} />
				{title}
			</h4>

			<p className="text-gray-500 text-sm mt-5">{description}</p>
		</div>
	);
};

const Modules = () => {
	const router = useRouter();
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

	const goLive = () => {
		const streamKey = stream?.streamKey;
		console.log('asd');
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

	return (
		<section className="bg-white p-5 rounded-lg">
			{!isLive ? (
				<TextInput type="text" label="Stream name" onChange={(e) => setStreamName(e.target.value)} />
			) : null}

			<>
				{!isLive ? (
					<>
						{stream ? (
							<>
								<CopyToClipboard
									text={stream.rtmpIngestUrl}
									onCopy={() => toast.success('Server Copied!')}
								>
									<TextInput readOnly value={stream.rtmpIngestUrl} label="Server" />
								</CopyToClipboard>

								<CopyToClipboard text={stream.streamKey} onCopy={() => toast.success('Key Copied!')}>
									<TextInput readOnly value={stream.streamKey} label="Stream key" />
								</CopyToClipboard>

								<p className="text-sm text-gray-500"> Please paste this key and start stream in OBS.</p>
							</>
						) : null}
					</>
				) : null}
			</>

			{!isLive ? (
				<>
					<h5 className="text-gray-900">Choose Modules & start streaming</h5>

					<div className="grid md:grid-cols-3 gap-5 mt-5 mb-5">
						<ModulesAction
							active={active}
							setActive={setActive}
							id="1"
							bg_color={'#F1FBFF'}
							title="Live Stream"
							icon=""
							description="Create a live stream"
						/>
						<ModulesAction
							active={active}
							icon=""
							bg_color={'#F7F4FF'}
							setActive={setActive}
							id="2"
							title="Token Gated"
							description="Token gated content"
						/>
					</div>
				</>
			) : null}

			{!stream && (
				<Button
					onClick={() => {
						createStream?.();
					}}
					disabled={isLoading || !createStream}
				>
					Start Streaming
				</Button>
			)}

			<div className="bg-gray-50">
				<video className="mt-0 rounded-md" ref={video} />
			</div>
		</section>
	);
};

export default Modules;

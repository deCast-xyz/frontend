import ImageUpload from '@/components/Common/ImageUpload';
import { useCreateStream } from '@livepeer/react';
import { Client } from '@livepeer/webrtmp-sdk';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const NewStream = () => {
	const [streamName, setStreamName] = useState<string>('');
	const form = useForm({
		initialValues: {
			obsKey: '',
		},
	});
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
		<div className="space-y-5 md:w-1/2 bg-gray-50 rounded-lg p-5">
			<h4 className="text-xl text-gray-900 font-medium">{isLive ? 'LIVE' : 'New'} Stream</h4>

			{!isLive ? (
				<>
					<TextInput type="text" label="Stream name" onChange={(e) => setStreamName(e.target.value)} />

					<ImageUpload label="Profile Image" />
				</>
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
				) : (
					<></>
				)}
			</>

			<div>
				{!stream && (
					<Button
						onClick={() => {
							createStream?.();
						}}
						disabled={isLoading || !createStream}
					>
						Create Stream
					</Button>
				)}
			</div>

			<div className="bg-gray-50">
				<video className="mt-0 rounded-md" ref={video} />
			</div>
		</div>
	);
};

export default NewStream;

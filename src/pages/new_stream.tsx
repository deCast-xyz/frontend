import { Player, useCreateStream } from '@livepeer/react';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const NewStream = () => {
	const [streamName, setStreamName] = useState<string>('');
	const form = useForm({
		initialValues: {
			obsKey: '',
		},
	});

	const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null);

	const isLoading = useMemo(() => status === 'loading', [status]);

	console.log(stream);

	return (
		<div className="space-y-5 md:w-1/2">
			<h4 className="text-xl font-medium">New Stream</h4>
			<TextInput type="text" label="Stream name" onChange={(e) => setStreamName(e.target.value)} />

			{stream?.playbackId && (
				<>
					<CopyToClipboard text={stream.rtmpIngestUrl} onCopy={() => toast.success('Server Copied!')}>
						<TextInput readOnly value={stream.rtmpIngestUrl} label="Server" />
					</CopyToClipboard>

					<CopyToClipboard text={stream.streamKey} onCopy={() => toast.success('Key Copied!')}>
						<TextInput readOnly value={stream.streamKey} label="Stream key" />
					</CopyToClipboard>

					<Player
						title="Demo"
						playbackId={stream.playbackId}
						// playbackId={'bafybeigtqixg4ywcem3p6sitz55wy6xvnr565s6kuwhznpwjices3mmxoe'}
						//poster={<PosterImage />}
						showPipButton
						objectFit="cover"
						priority
					/>

					<p className="text-sm text-gray-500"> Please paste this key and start stream in OBS.</p>
				</>
			)}

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
		</div>
	);
};

export default NewStream;

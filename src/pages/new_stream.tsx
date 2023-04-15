import { Player, useCreateStream } from '@livepeer/react';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';

const NewStream = () => {
	const [streamName, setStreamName] = useState<string>('');
	const form = useForm({
		initialValues: {
			obsKey: '',
		},
	});

	const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null);

	const isLoading = useMemo(() => status === 'loading', [status]);

	return (
		<div className="space-y-5 md:w-1/2">
			<h4 className="text-xl font-medium">New Stream</h4>
			<TextInput type="text" label="Stream name" onChange={(e) => setStreamName(e.target.value)} />

			{stream?.playbackId && <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />}

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

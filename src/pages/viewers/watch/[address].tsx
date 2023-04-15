import { Player } from '@livepeer/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WatchAddress = () => {
	const [streamId, setStreamId] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		const fetchStreamId = async () => {
			const response = await fetch('/api/account/get_stream', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					wallet_address: router.query.address,
				}),
			});

			const data = await response.json();

			if (data.stream_id) setStreamId(data.stream_id);
		};

		fetchStreamId();
	}, []);

	return (
		<div>
			<Player showPipButton playbackId={streamId as string} />
		</div>
	);
};

export default WatchAddress;

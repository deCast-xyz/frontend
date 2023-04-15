import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WatchAddress = () => {
	const [streamId, setStreamId] = useState<string>('');
	const [playbackId, setPlaybackId] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		console.log(0);
		const fetchStreamId = async () => {
			console.log(router.query.address);

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
		const fetchPlaybackId = async () => {
			console.log(1);
			console.log(router.query.address);

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

			if (data.playback_id) setPlaybackId(data.playback_id);
		};

		fetchStreamId();
		fetchPlaybackId();
	}, [router]);
	console.log(streamId);
	console.log(playbackId, 'playbackId');
	

	return (
		<div>
			<iframe
				src={`https://lvpr.tv?v=${playbackId}`}
				frameBorder="0"
				allow="autoplay; encrypted-media; picture-in-picture"
				sandbox="allow-scripts"
			></iframe>
		</div>
	);
};

export default WatchAddress;

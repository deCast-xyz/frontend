import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WatchAddress = () => {
	const [streamId, setStreamId] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
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

		fetchStreamId();
	}, [router]);

	return (
		<div>
			<iframe
				src={`https://lvpr.tv?v=${streamId}`}
				frameBorder="0"
				allow="autoplay; encrypted-media; picture-in-picture"
				sandbox="allow-scripts"
			></iframe>
		</div>
	);
};

export default WatchAddress;

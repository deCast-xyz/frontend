import { Player } from '@livepeer/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WatchAddress = () => {
	const [streamId, setStreamId] = useState<string>('');
	const router = useRouter();

	useEffect(() => {}, []);

	return (
		<div>
			<Player
				title="Agent 327: Operation Barbershop"
				playbackId="f5eese9wwl88k4g8"
				showPipButton
				objectFit="cover"
				priority
			/>
		</div>
	);
};

export default WatchAddress;

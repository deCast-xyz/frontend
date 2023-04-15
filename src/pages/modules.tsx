import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ModulesAction = ({
	id,
	title,
	description,
	setActive,
	active,
}: {
	id: string;
	title: string;
	description: string;
	active: string[];
	setActive: (data: string[]) => void;
}) => {
	return (
		<div
			className={`cursor-pointer border-gray-400 rounded-lg p-5 border  ${
				active.includes(id) ? 'border-blue-400' : ''
			}
			`}
			style={{
				borderColor: active.includes(id) ? '#2a2b3a' : 'rgb(59 130 246)',
			}}
			onClick={() => {
				if (active.includes(id)) {
					setActive(active.filter((item) => item !== id));
				} else {
					setActive([...active, id]);
				}
			}}
		>
			<h4 className="text-xl">{title}</h4>

			<p className="text-gray-500 text-sm mt-5">{description}</p>
		</div>
	);
};

const Modules = () => {
	const router = useRouter();
	const [active, setActive] = useState<string[]>([]);

	return (
		<>
			<h1>Choose Modules & start streaming</h1>

			<div className="grid md:grid-cols-3 gap-5 mt-5 mb-5">
				<ModulesAction
					active={active}
					setActive={setActive}
					id="1"
					title="Live Stream"
					description="Create a live stream"
				/>
				<ModulesAction
					active={active}
					setActive={setActive}
					id="2"
					title="Token Gated"
					description="Token gated content"
				/>
			</div>

			<Button
				onClick={() => {
					router.push('/new_stream');
				}}
			>
				Start Streaming
			</Button>
		</>
	);
};

export default Modules;

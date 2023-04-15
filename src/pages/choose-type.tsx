import { Button } from '@mantine/core';

const Choose = ({ name, button_label }: { name: string; button_label: string }) => {
	return (
		<>
			<div>
				<h4> {name}</h4>

				<Button>{button_label}</Button>
			</div>
		</>
	);
};

const ChooseType = () => {
	return (
		<div>
			<div className="grid-cols-2 grid gap-5"></div>
		</div>
	);
};

export default ChooseType;

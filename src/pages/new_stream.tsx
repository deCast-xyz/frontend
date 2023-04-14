import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const NewStream = () => {
	const form = useForm({
		initialValues: {
			obsKey: '',
		},
	});

	return (
		<div>
			<form className="space-y-5">
				<TextInput required label="OBS Key" placeholder="" {...form.getInputProps('obsKey')} />

				<Button>Start Stream</Button>
			</form>
		</div>
	);
};

export default NewStream;

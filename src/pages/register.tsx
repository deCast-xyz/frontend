import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
const Register = () => {
	const [loading, setLoading] = useState(false);
	const { address, isConnecting, isDisconnected } = useAccount();

	const form = useForm({
		initialValues: {
			name: '',
			symbol: '',
			description: '',
		},
	});

	const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setLoading(true);
		const response = await fetch('/api/account/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...form.values,
				wallet_address: address,
			}),
		});

		const data = await response.json();

		if (data.message) {
			toast.success(data.message);
		}

		setLoading(false);
		console.log(form.values);
	};

	return (
		<div className="min-h-screen">
			<h5 className="text-xl font-medium my-5">Mint your creator NFT</h5>
			<div className="grid md:grid-cols-2 gap-5 items-center">
				<div className="grid place-items-center">
					<div
						className="bg-gray-100 rounded-lg w-9 h-90"
						style={{
							background: 'rgb(232, 232, 232)',
							width: '250px',
							height: '250px',
						}}
					></div>
				</div>
				<div>
					<div className="md:w-1/2">
						<form className="space-y-5" onSubmit={handleFormSubmit}>
							<TextInput required label="Name" placeholder="" {...form.getInputProps('name')} />
							<TextInput
								required
								label="Description"
								placeholder=""
								{...form.getInputProps('description')}
							/>

							<Button type="submit" color="white" loading={loading}>
								Submit
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;

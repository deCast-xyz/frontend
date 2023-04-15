import { Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
const Register = () => {
	const [loading, setLoading] = useState(false);
	const { address, isConnecting, isDisconnected } = useAccount();
	const router = useRouter();

	const form = useForm({
		initialValues: {
			creator_name: '',
			username: '',
			membership_name: '',
			membership_description: '',
			monthly_price: '',
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
			router.push('/new_stream');
		}

		setLoading(false);
		console.log(form.values);
	};

	return (
		<div className="min-h-screen bg-white p-5 rounded-lg">
			<h5 className="text-xl  my-5 text-gray-900 font-medium">Become a creator</h5>
			<div className="grid md:grid-cols-2 gap-5 items-center">
				<div>
					<div className="md:w-3/4 ">
						<form className="space-y-5" onSubmit={handleFormSubmit}>
							<TextInput
								required
								label="Creator Name"
								placeholder=""
								{...form.getInputProps('creator_name')}
							/>
							<TextInput
								required
								label="Username (it will be your URL. ex: https://username.decast.xyz/)"
								placeholder=""
								{...form.getInputProps('username')}
							/>

							<Button color="dark" type="submit" loading={loading}>
								Submit
							</Button>
						</form>
					</div>
					<div className="md:w-3/4 ">
						<h5 className="text-xl  my-5 text-gray-900 font-medium">Membership NFT detail</h5>

						<form className="space-y-5" onSubmit={handleFormSubmit}>
							<TextInput
								required
								label="Membership Name"
								placeholder=""
								{...form.getInputProps('membership_name')}
							/>
							<TextInput
								required
								label="Membership Description"
								placeholder=""
								{...form.getInputProps('membership_description')}
							/>
							<NumberInput
								required
								label="Monthly Price"
								placeholder=""
								{...form.getInputProps('monthly_price')}
							/>

							<Button type="submit" color="dark" loading={loading}>
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

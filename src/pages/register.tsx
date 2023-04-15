import ImageUpload from '@/components/Common/ImageUpload';
import { Button, NumberInput, Stepper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
const Register = () => {
	const [active, setActive] = useState(0);
	const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
			router.push('/dashboard');
		}

		setLoading(false);
		console.log(form.values);
	};

	return (
		<div className="  p-5 rounded-lg md:3/4">
			<h5 className="text-xl  my-5 text-white font-bold">
				{active === 0 ? 'Become a Creator' : 'Membership Detail'}
			</h5>
			<div className="grid md:grid-cols-2 gap-5 items-center">
				<div>
					<Stepper
						color="dark"
						active={active}
						onStepClick={setActive}
						breakpoint="sm"
						allowNextStepsSelect={false}
					>
						<Stepper.Step label="Creator Detail">
							<div>
								<form className="space-y-5">
									<TextInput
										required
										label="Creator Name"
										placeholder=""
										{...form.getInputProps('creator_name')}
									/>
									<TextInput
										required
										label="Username"
										description={`it will be your URL. ex: https://${
											form.values.username === '' ? 'username' : form.values.username
										}.decast.xyz/`}
										{...form.getInputProps('username')}
									/>

									<ImageUpload label="Profile Image" />

									<div className="flex justify-between items-center">
										<div></div>
										<Button
											color="white"
											type="button"
											className="white_button"
											onClick={() => {
												nextStep();
											}}
										>
											Next
										</Button>
									</div>
								</form>
							</div>
						</Stepper.Step>
						<Stepper.Step label="Membership Detail">
							<div className="md:w-3/4 ">
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
									<div className="flex items-center justify-between pt-6">
										<Button
											color="dark"
											variant="link"
											className="text-white"
											onClick={() => {
												prevStep();
											}}
										>
											Previous
										</Button>

										<Button color="white" className="white_button" type="submit" loading={loading}>
											Submit
										</Button>
									</div>
								</form>
							</div>
						</Stepper.Step>
					</Stepper>
				</div>
			</div>
		</div>
	);
};

export default Register;

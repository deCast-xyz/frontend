import { Button, Group, Input, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Cross1Icon, ImageIcon, UploadIcon } from '@radix-ui/react-icons';

import { useState } from 'react';

const ImageUpload = (props: any) => {
	const { label, isDetailsHidden } = props;
	const [selectedFile, setSelectedFile] = useState<any>();
	const [preview, setPreview] = useState<any>('');

	const changeHandler = async (files: any) => {
		const file = files[0];
		const blob = file.slice(0, file.size, 'image/png');
		const newFile = new File([blob], file?.name.replaceAll(' ', '-'), {
			type: file?.type,
		});
		setSelectedFile(newFile);
		if (selectedFile) {
			const objectUrl = await URL.createObjectURL(selectedFile);
			console.log(objectUrl);
			setPreview(objectUrl);
		}
	};

	return (
		<>
			{preview ? (
				<div>
					<img src={`${preview}`} className="rounded-md mb-2" />

					<Button
						compact
						variant="subtle"
						onClick={() => {
							setPreview(null);
						}}
					>
						Change Image
					</Button>
				</div>
			) : (
				<>
					<Input.Wrapper label={label}>
						<Dropzone
							className="mt-2"
							onDrop={(files) => changeHandler(files)}
							onReject={(files) => console.log('rejected files', files)}
							maxSize={3 * 1024 ** 2}
							accept={IMAGE_MIME_TYPE}
							{...props}
						>
							<Group position="center" spacing="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
								<Dropzone.Accept>
									<UploadIcon className="w-8 h-8 text-gray-500" />
								</Dropzone.Accept>
								<Dropzone.Reject>
									<Cross1Icon className="w-8 h-8 text-gray-500" />
								</Dropzone.Reject>
								<Dropzone.Idle>
									<ImageIcon className="w-8 h-8 text-gray-500" />
								</Dropzone.Idle>

								{!isDetailsHidden ? (
									<div className="text-gray-500">
										<Text size="xl" inline>
											{label}
										</Text>
										<Text size="sm" color="dimmed" inline mt={7}>
											Drag images here or click to select files
										</Text>
									</div>
								) : null}
							</Group>
						</Dropzone>
					</Input.Wrapper>
				</>
			)}
		</>
	);
};

export default ImageUpload;

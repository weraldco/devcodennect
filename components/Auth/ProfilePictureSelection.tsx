import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
// import { uploadImage } from '@/utils/helper';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';
import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import { FiTrash, FiUpload, FiUser } from 'react-icons/fi';
import { LuLoaderCircle } from 'react-icons/lu';

interface Props {
	image: string | null;
	setImage: Dispatch<SetStateAction<string | null>>;
}

const ProfilePictureSelection: FC<Props> = ({ image, setImage }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState<string>('');

	const handleImageChange = async (e: any) => {
		setLoading(true);
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await axiosInstance.post(
				API_PATHS.AUTH.UPLOAD_IMAGE,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			const compressedFile = await imageCompression(file, {
				maxSizeMB: 1,
				maxWidthOrHeight: 800,
				useWebWorker: true,
			});

			setImage(response.data.optimizeUrl);
			const preview = URL.createObjectURL(compressedFile);
			setPreview(preview);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error('uploading image error');
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPreview('');
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const onChooseFile = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};
	return (
		<div className="flex flex-row items-center justify-center">
			<input
				type="file"
				accept="image/*"
				ref={inputRef}
				onChange={handleImageChange}
				className="hidden"
			/>
			{image == null ? (
				<div className=" bg-teal-100 p-5 rounded-full text-teal-500 relative duration-200 ">
					{loading ? (
						<div className="flex flex-col items-center">
							<div className="animate-spin">
								<LuLoaderCircle size={40} />
							</div>{' '}
						</div>
					) : (
						<FiUser size={40} />
					)}
					<button
						type="button"
						className="absolute -right-1 -bottom-1 bg-teal-500 text-teal-100 p-2  rounded-full hover:bg-teal-400 duration-200 cursor-pointer active:bg-teal-400/70"
						onClick={onChooseFile}
					>
						<FiUpload />
					</button>
				</div>
			) : (
				<div>
					<div className="w-20 h-20 relative ">
						<Image
							height={200}
							width={200}
							src={preview}
							className="rounded-full object-cover bg-red-50"
							alt={preview}
						></Image>
						<button
							type="button"
							className="absolute -right-1 -bottom-1 bg-red-500 text-red-100 p-2  rounded-full hover:bg-red-400 duration-200 cursor-pointer active:bg-red-400/70"
							onClick={handleRemoveImage}
						>
							<FiTrash />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePictureSelection;

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

interface Props {
	image: File | null;
	setImage: Dispatch<SetStateAction<File | null>>;
}

const ProfilePictureSelection: FC<Props> = ({ image, setImage }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [preview, setPreview] = useState<string>('');

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const compressedFile = await imageCompression(file, {
			maxSizeMB: 1,
			maxWidthOrHeight: 800,
			useWebWorker: true,
		});

		if (compressedFile) {
			setImage(compressedFile);
			const preview = URL.createObjectURL(compressedFile);
			setPreview(preview);
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
			{!image ? (
				<div className=" bg-teal-100 p-5 rounded-full text-teal-500 relative duration-200 ">
					<FiUser size={40} />
					<div
						className="absolute -right-1 -bottom-1 bg-teal-500 text-teal-100 p-2  rounded-full hover:bg-teal-400 duration-200 cursor-pointer active:bg-teal-400/70"
						onClick={onChooseFile}
					>
						<FiUpload />
					</div>
				</div>
			) : (
				<div>
					<div className="w-20 h-20 relative">
						<Image height={400} width={400} src={preview} alt={preview}></Image>
						<div className="absolute -right-1 -bottom-1 bg-red-500 text-red-100 p-2  rounded-full hover:bg-red-400 duration-200 cursor-pointer active:bg-red-400/70">
							<FiTrash />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePictureSelection;

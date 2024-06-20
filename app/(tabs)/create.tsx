import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';
import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	ImageSourcePropType,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { createVideo } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

import * as ImagePicker from 'expo-image-picker';

export type Asset = {
	assetId: string | null;
	base64: string | null;
	duration: number;
	exif: any | null;
	fileName: string;
	fileSize: number;
	height: number;
	mimeType: string;
	rotation: number;
	type: 'video';
	uri: string;
	width: number;
};

export type CreatingPostForm = {
	title: string;
	video: Asset | null | any;
	thumbnail: Asset | null | any;
	prompt: string;
	userId?: string;
};

export default function Create() {
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState<CreatingPostForm>({
		title: '',
		video: null,
		thumbnail: null,
		prompt: '',
	});

	const openPicker = async (selectType: string) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes:
				selectType === 'image'
					? ImagePicker.MediaTypeOptions.Images
					: ImagePicker.MediaTypeOptions.Videos,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			if (selectType === 'image') {
				setForm({ ...form, thumbnail: result.assets[0] });
			}

			if (selectType === 'video') {
				setForm({ ...form, video: result.assets[0] });
			}
		} else {
			setTimeout(() => {
				Alert.alert('Document picked', JSON.stringify(result, null, 2));
			}, 100);
		}
	};

	const submit = async () => {
		if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
			return Alert.alert('Please fill in all the details');
		}
		setUploading(true);

		try {
			await createVideo({
				...form,
				userId: user.$id,
			});

			Alert.alert('Success', 'Post uploaded successfully');
			router.push('/home');
		} catch (error: any) {
			Alert.alert('Error', error.message);
		} finally {
			setForm({
				title: '',
				video: null,
				thumbnail: null,
				prompt: '',
			});
			setUploading(false);
		}
	};
	return (
		<SafeAreaView className="h-full bg-slate-900">
			<ScrollView className="px-4 my-6">
				<Text className="text-xl font-semibold text-white">Create Post</Text>
				<FormField
					title="Video Title"
					placeholder="Enter Title Here"
					value={form.title}
					handleChangeText={(e) => setForm({ ...form, title: e })}
					otherStyles="mt-10"
				/>
				<View className="space-y-2 mt-7">
					<Text className="text-base font-medium text-gray-100">
						Upload Video
					</Text>
					<TouchableOpacity onPress={() => openPicker('video')}>
						{form.video ? (
							<Video
								resizeMode={ResizeMode.COVER}
								source={{ uri: form.video.uri }}
								className="w-full h-64 rounded-2xl"
								isLooping
							/>
						) : (
							<>
								<View className="items-center justify-center w-full h-40 px-4 bg-black rounded-2xl">
									<View className="items-center justify-center border border-orange-400 w-14 h-14">
										<Image
											source={icons.upload as ImageSourcePropType}
											className="w-1/2 h-1/2"
											resizeMode="contain"
										/>
									</View>
								</View>
							</>
						)}
					</TouchableOpacity>
				</View>
				<View className="space-y-2 mt-7 ">
					<Text className="text-base font-medium text-gray-100">
						Thumbnail Image
					</Text>

					<TouchableOpacity onPress={() => openPicker('image')}>
						{form.thumbnail ? (
							<Image
								source={{ uri: form.thumbnail.uri }}
								resizeMode="cover"
								className="w-full h-64 rounded-2xl"
							/>
						) : (
							<View className="flex-row items-center justify-center w-full h-16 px-4 space-x-2 bg-black border-2 border-black rounded-2xl">
								<Image
									source={icons.upload as ImageSourcePropType}
									className="w-5 h-5"
									resizeMode="contain"
								/>
								<Text className="text-sm font-medium text-gray-100">
									Choose a file
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<FormField
					title="AI Prompt"
					placeholder="Enter prompt to create this video"
					value={form.prompt}
					handleChangeText={(e) => setForm({ ...form, prompt: e })}
					otherStyles="mt-7"
				/>
				<CustomButton
					title="Submit & Publish"
					handlePress={submit}
					containerStyles="mt-7"
					isLoading={uploading}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

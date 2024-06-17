import { images } from '@/constants';
import { EmptyStateProps } from '@/types';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
	return (
		<View className="items-center justify-center px-4">
			<Image
				source={images.empty as ImageSourcePropType}
				className="w-[270px] h-[215px]"
				resizeMode="contain"
			/>
			<Text className="mt-2 text-xl font-semibold text-center text-white">
				{title}
			</Text>
			<Text className="text-sm font-medium text-gray-100">{subtitle}</Text>
			<CustomButton
				title="Create Video"
				handlePress={() => router.push('/create')}
				containerStyles="w-full  my-5"
			/>
		</View>
	);
}

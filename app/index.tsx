import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import {
	View,
	Text,
	ScrollView,
	Image,
	ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';

export default function Welcome() {
	return (
		<SafeAreaView className="h-full bg-slate-800">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="items-center justify-center w-full min-h-[85vh] px-4 ">
					<Image
						source={images.logo as ImageSourcePropType}
						className="w-32 h-20"
						resizeMode="contain"
					/>
					<Image
						source={images.cards as ImageSourcePropType}
						className="max-w-xs w-full h-[300px]"
						resizeMode="contain"
					/>
					<Text className="text-3xl font-bold text-white">
						Discover endless possibilities with{' '}
						<Text className="text-3xl text-orange-400">Aora</Text>
					</Text>
					<Image
						source={images.path as ImageSourcePropType}
						className="h-4 w-28 -right-32 -top-2"
						resizeMode="contain"
					/>
					<Text className="pt-6 text-sm text-gray-100">
						Where creativity meets innovation
					</Text>
					<CustomButton
						title="Continue with Email"
						handlePress={() => router.push('/sign-in')}
						containerStyles="w-full mt-4"
						textStyles="leading-7"
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}

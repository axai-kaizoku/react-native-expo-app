import { images } from '@/constants';
import { Link } from 'expo-router';
import {
	View,
	Text,
	ScrollView,
	Image,
	ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
	return (
		<SafeAreaView className="h-full bg-slate-800">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="items-center w-full h-full px-4 ">
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
						<Text className="text-3xl text-orange-400/90">Aora</Text>
					</Text>
					<Image
						source={images.path as ImageSourcePropType}
						className="h-4 w-28 -right-32 -top-2"
						resizeMode="contain"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

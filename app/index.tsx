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
				<View className="items-center justify-center w-full h-full px-4 ">
					<Image
						source={images.logo as unknown as ImageSourcePropType}
						className="w-32 h-20"
						resizeMode="contain"
					/>
					<Image
						source={images.cards as unknown as ImageSourcePropType}
						className="max-w-xs w-full h-[300px]"
						resizeMode="contain"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

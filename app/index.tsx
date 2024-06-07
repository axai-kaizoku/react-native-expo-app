import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomePage() {
	return (
		<View className="w-full h-full flex justify-center items-center">
			<Text className="text-5xl font-thin font-spaceMono">HomePage</Text>
			<Link href="/profile">
				<Text className="text-2xl font-semibold">Profile</Text>
			</Link>
		</View>
	);
}

import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ImageSourcePropType,
	Alert,
} from 'react-native';

export default function SearchInput({
	initialQuery,
}: {
	initialQuery?: string;
}) {
	const pathname = usePathname();
	const [query, setQuery] = useState(initialQuery || '');
	return (
		<View className="flex-row items-center justify-between w-full h-16 px-4 space-x-4 border-2 border-black rounded-2xl bg-black/30 focus:border-orange-400/40">
			<TextInput
				className="flex-1 w-full h-full text-base font-normal text-white"
				value={query}
				placeholder="Search here"
				placeholderTextColor="#CDCDE0"
				onChangeText={(e) => setQuery(e)}
			/>
			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert(
							'Missing query',
							'Please input something to search results across the app',
						);
					}

					if (pathname.startsWith('/search')) {
						router.setParams({ query: query });
					} else {
						router.push(`/search/${query}`);
					}
				}}>
				<Image
					source={icons.search as ImageSourcePropType}
					className="w-5 h-5"
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);
}

import { icons } from '@/constants';
import type { Video as Vid } from '@/types';
import { ResizeMode, Video } from 'expo-av';
import { useState } from 'react';
import {
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Image,
	ImageSourcePropType,
} from 'react-native';

import * as AnimaTable from 'react-native-animatable';

// const zoomIn = {
// 	0: {
// 		scale: 0.9,
// 	},
// 	1: {
// 		scale: 1,
// 	},
// };

// const zoomOut = {
// 	0: {
// 		scale: 1,
// 	},
// 	1: {
// 		scale: 0.9,
// 	},
// };

// AnimaTable.createAnimation();

const TrendingItem = ({ activeItem, item }: { activeItem: Vid; item: Vid }) => {
	const [play, setPlay] = useState(false);

	return (
		<AnimaTable.View
			className="mr-5"
			// animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
			// duration={500}
			useNativeDriver>
			{play ? (
				<Video
					source={{ uri: item.video }}
					className="mt-3 w-52 h-72 rounded-3xl bg-white/10"
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					// isLooping
					// onPlaybackStatusUpdate={(status) => setStatus(() => status)}
				/>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					className="relative items-center justify-center"
					onPress={() => setPlay(!play)}>
					<ImageBackground
						source={{ uri: item.thumbnail }}
						className="my-5 overflow-hidden shadow-lg w-52 h-72 rounded-3xl shadow-black/40"
						resizeMode="cover"
					/>
					<Image
						source={icons.play as ImageSourcePropType}
						className="absolute w-12 h-12"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</AnimaTable.View>
	);
};

interface TrendingVideos {
	posts: Vid[];
}

export default function Trending({ posts }: TrendingVideos) {
	const [activeItem, setActiveItem] = useState<Vid>(posts[1]);

	const viewableItemsChanged = (viewableItems: Vid[]) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[2]);
		}
	};

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			horizontal
		/>
	);
}

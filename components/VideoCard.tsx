import { icons } from '@/constants';
import { Video } from '@/types';
import { useState } from 'react';
import {
	View,
	Text,
	Image,
	ImageSourcePropType,
	TouchableOpacity,
} from 'react-native';

interface VideoCard {
	videoData: Video;
}

export default function ({ videoData }: VideoCard) {
	const {
		title,
		video,
		thumbnail,
		creators: { username, avatar },
	} = videoData;
	const [play, setPlay] = useState<boolean>(false);
	return (
		<View className="flex-col items-center px-4 mb-14">
			<View className="flex-row items-start gap-3">
				<View className="flex-row items-center justify-center flex-1">
					<View className="w-[40px] h-[40px] rounded-lg border border-orange-400 justify-center items-center p-0.5">
						<Image
							source={{ uri: avatar }}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>
					<View className="justify-center flex-1 ml-3 gap-y-1">
						<Text
							className="text-sm font-semibold text-white"
							numberOfLines={1}>
							{title}
						</Text>
						<Text
							className="text-xs font-normal text-gray-100"
							numberOfLines={1}>
							{username}
						</Text>
					</View>
				</View>
				<View className="pt-2">
					<Image
						source={icons.menu as ImageSourcePropType}
						className="w-5 h-5"
						resizeMode="contain"
					/>
				</View>
			</View>
			{play ? (
				<Text className="text-white">Playing</Text>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
					className="relative flex items-center justify-center w-full mt-3 h-60 rounded-xl">
					<Image
						source={{ uri: thumbnail }}
						className="w-full h-full mt-3 rounded-xl"
						resizeMode="cover"
					/>
					<Image
						source={icons.play as ImageSourcePropType}
						className="absolute w-12 h-12"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
}

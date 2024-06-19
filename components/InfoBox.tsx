import { InfoBoxTypes } from '@/types';
import { View, Text } from 'react-native';

export default function InfoBox({
	title,
	subTitle,
	containerStyles,
	textStyles,
}: InfoBoxTypes) {
	return (
		<View className={`${containerStyles}`}>
			<Text className={`${textStyles} text-white text-center font-semibold`}>
				{title}
			</Text>
			{subTitle && (
				<Text className="text-sm font-normal text-center text-gray-100">
					{subTitle}
				</Text>
			)}
		</View>
	);
}

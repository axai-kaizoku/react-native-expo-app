import { CustomButtonProps } from '@/types';
import { Text, TouchableOpacity } from 'react-native';

export default function CustomButton({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}: CustomButtonProps) {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-orange-400 ${containerStyles} ${
				isLoading ? 'opacity-75' : ''
			} rounded-xl min-h-10 justify-center items-center py-2  `}
			disabled={isLoading}>
			<Text className={`text-sm ${textStyles} font-semibold`}>{title}</Text>
		</TouchableOpacity>
	);
}

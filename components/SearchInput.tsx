import { icons } from '@/constants';
import { SearchInputProps } from '@/types';
import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ImageSourcePropType,
} from 'react-native';

export default function SearchInput({
	value,
	handleChangeText,
	otherStyles,
	keyboardType,
	placeholder,
}: SearchInputProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<View className="flex-row items-center justify-between w-full h-16 px-4 space-x-4 border-2 border-black rounded-2xl bg-black/30 focus:border-orange-400/40">
			<TextInput
				className="flex-1 w-full h-full text-base font-normal text-white"
				value={value}
				placeholder={placeholder}
				placeholderTextColor="#7b7b8b"
				onChangeText={handleChangeText}
			/>
			<TouchableOpacity>
				<Image
					source={icons.search as ImageSourcePropType}
					className="w-5 h-5"
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);
}

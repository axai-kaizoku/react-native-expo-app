import { icons } from '@/constants';
import { FormFieldProps } from '@/types';
import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ImageSourcePropType,
} from 'react-native';

export default function FormField({
	title,
	value,
	handleChangeText,
	otherStyles,
	keyboardType,
	placeholder,
}: FormFieldProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="font-medium text-gray-100">{title}</Text>
			<View className="flex-row items-center justify-between w-full h-16 px-4 border-2 border-black rounded-2xl bg-black/30 focus:border-orange-400/40">
				<TextInput
					className="flex-1 w-full h-full text-base font-semibold text-white"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7b7b8b"
					onChangeText={handleChangeText}
					secureTextEntry={title === 'Password' && !showPassword}
				/>
				{title === 'Password' && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={
								!showPassword
									? (icons.eye as ImageSourcePropType)
									: (icons.eyeHide as ImageSourcePropType)
							}
							className="w-6 h-6"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { images } from '@/constants';
import { createUser, signIn } from '@/lib/appwrite';
import { SignUpForm } from '@/types';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	ImageSourcePropType,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
	const [form, setForm] = useState<SignUpForm>({
		username: '',
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const submit = async () => {
		if (
			form.username.trim() === '' ||
			form.email.trim() === '' ||
			form.password === ''
		) {
			Alert.alert('Error', 'Please fill all the fields');
			setIsSubmitting(true);
		}
		try {
			const result = await createUser(form.email, form.password, form.username);
			// set it to global state
			router.replace('/home');
		} catch (error: any) {
			Alert.alert('Error', error.message);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<SafeAreaView className="h-full bg-slate-900">
			<ScrollView>
				<View className="justify-center w-full min-h-[85vh]  px-4 my-6">
					<Image
						source={images.logo as ImageSourcePropType}
						resizeMode="contain"
						className="w-28 h-9"
					/>
					<Text className="pt-3 text-lg font-semibold text-white">
						Sign Up to Aora
					</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="pt-7"
						keyboardType="username"
						placeholder="Enter your Username"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="pt-7"
						keyboardType="email-address"
						placeholder="Enter your Email"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="pt-7"
						keyboardType="password"
						placeholder="••••••••"
					/>
					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-10 h-14"
						isLoading={isSubmitting}
					/>
					<View className="flex-row justify-center gap-2 pt-5">
						<Text className="text-lg font-normal text-gray-100">
							Already have any account?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-semibold text-orange-400">
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

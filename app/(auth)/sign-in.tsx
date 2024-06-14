import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { images } from '@/constants';
import { signIn } from '@/lib/appwrite';
import { SignInForm } from '@/types';
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

export default function SignIn() {
	const [form, setForm] = useState<SignInForm>({
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const submit = async () => {
		if (form.email.trim() === '' || form.password === '') {
			Alert.alert('Error', 'Please fill all the fields');
			setIsSubmitting(true);
		}
		try {
			const result = await signIn(form.email, form.password);

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
				<View className="justify-center w-full min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo as ImageSourcePropType}
						resizeMode="contain"
						className="w-28 h-9"
					/>
					<Text className="pt-3 text-lg font-semibold text-white">
						Log in to Aora
					</Text>
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
						title="Sign In"
						handlePress={submit}
						containerStyles="mt-10 h-14"
						isLoading={isSubmitting}
					/>
					<View className="flex-row justify-center gap-2 pt-5">
						<Text className="text-lg font-normal text-gray-100">
							Don't have account?
						</Text>
						<Link
							href="/sign-up"
							className="text-lg font-semibold text-orange-400">
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

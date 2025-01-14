import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import GlobalProvider from '@/context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	if (!fontsLoaded && !error) return null;

	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="search/[query]" options={{ headerShown: false }} />
			</Stack>
		</GlobalProvider>
	);
}

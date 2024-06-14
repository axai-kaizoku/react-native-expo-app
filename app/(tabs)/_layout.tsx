import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { TabIconProps } from '@/types';

import { icons } from '@/constants';

function TabIcon({ icon, color, name, focused }: TabIconProps) {
	return (
		<View className="items-center justify-center">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text
				className={`${focused ? 'font-semibold' : 'font-normal'} text-xs`}
				style={{ color: color }}>
				{name}
			</Text>
		</View>
	);
}

export default function TabsLayout() {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#FFA001',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 50,
					},
				}}>
				<Tabs.Screen
					name="home"
					options={{
						title: 'Home',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								color={color}
								focused={focused}
								name="Home"
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="bookmark"
					options={{
						title: 'Bookmark',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								color={color}
								focused={focused}
								name="Bookmark"
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: 'Create',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								color={color}
								focused={focused}
								name="Create"
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: 'Profile',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								focused={focused}
								name="Profile"
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
}

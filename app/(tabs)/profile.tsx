import EmptyState from '@/components/EmptyState';
import InfoBox from '@/components/InfoBox';
import VideoCard from '@/components/VideoCard';
import { icons, images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getUserPosts, signOut } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { router } from 'expo-router';
import {
	View,
	FlatList,
	TouchableOpacity,
	Image,
	ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();

	const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);

		router.replace('/sign-in');
	};
	return (
		<SafeAreaView className="w-full h-full bg-slate-900">
			<FlatList
				data={posts}
				// data={[]}
				keyExtractor={(item) => item?.$id}
				renderItem={({ item }) => <VideoCard videoData={item} />}
				ListHeaderComponent={() => (
					<View className="items-center justify-center w-full px-4 mt-6 mb-12">
						<TouchableOpacity
							className="items-end w-full mb-6"
							onPress={logout}>
							<Image
								source={icons.logout as ImageSourcePropType}
								resizeMode="contain"
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<View className="items-center justify-center w-16 h-16 border border-orange-400 rounded-lg">
							<Image
								source={
									{ uri: user?.avatar } ||
									(images.profile as ImageSourcePropType)
								}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>
						<InfoBox
							title={user?.username || ''}
							containerStyles="mt-5"
							textStyles="text-lg"
						/>
						<View className="flex-row mt-5">
							<InfoBox
								title={posts.length || 0}
								subTitle="Posts"
								containerStyles="mr-10"
								textStyles="text-xl"
							/>
							<InfoBox
								title="1.7k"
								subTitle="Followers"
								containerStyles=""
								textStyles="text-xl"
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No videos found"
						subtitle="No videos found for this search query"
					/>
				)}
			/>
		</SafeAreaView>
	);
}

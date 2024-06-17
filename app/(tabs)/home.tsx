import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import VideoCard from '@/components/VideoCard';
import { images } from '@/constants';
import { getAllPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { useState } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	ImageSourcePropType,
	RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
	const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch;
		setRefreshing(false);
	};
	return (
		<SafeAreaView className="w-full h-full bg-slate-900">
			<FlatList
				data={posts}
				// data={[]}
				keyExtractor={(item) => item?.$id}
				renderItem={({ item }) => <VideoCard videoData={item} />}
				ListHeaderComponent={() => (
					<View className="px-4 my-6 space-y-6">
						<View className="flex-row items-start justify-between mb-6">
							<View>
								<Text className="text-sm font-medium text-gray-100">
									Welcome Back
								</Text>
								<Text className="text-2xl font-semibold text-white">axai</Text>
							</View>
							<View className="mt-1.5">
								<Image
									source={images.logoSmall as ImageSourcePropType}
									className="h-10 w-9"
									resizeMode="contain"
								/>
							</View>
						</View>
						<SearchInput placeholder="Search here" />
						<View className="flex-1 w-full pt-5 pb-8">
							<Text className="mb-3 text-lg font-normal text-gray-100">
								Latest Videos
							</Text>
							<Trending posts={[{ id: '1' }, { id: '2' }, { id: '3' }] ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No videos found"
						subtitle="Be the first one to create videos"
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
}

import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import { getSearchedPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
	const { query } = useLocalSearchParams();

	const { data: posts, refetch } = useAppwrite(() =>
		getSearchedPosts(query as string),
	);

	useEffect(() => {
		refetch();
	}, [query]);
	return (
		<SafeAreaView className="w-full h-full bg-slate-900">
			<FlatList
				data={posts}
				// data={[]}
				keyExtractor={(item) => item?.$id}
				renderItem={({ item }) => <VideoCard videoData={item} />}
				ListHeaderComponent={() => (
					<View className="px-4 my-6 ">
						<Text className="text-sm font-medium text-gray-100">
							Search Results
						</Text>
						<Text className="text-2xl font-semibold text-white">{query}</Text>
						<View className="my-8">
							<SearchInput initialQuery={query as string} />
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

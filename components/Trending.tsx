import { View, Text, FlatList } from 'react-native';

type Video = {
	id: string;
};

export default function Trending({ posts }: { posts: Video[] }) {
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Text className="p-1 text-3xl text-white">{item.id}</Text>
			)}
			horizontal
		/>
	);
}

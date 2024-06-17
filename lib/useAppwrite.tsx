import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FetchFunction } from '@/types';

const useAppwrite = <T,>(fn: FetchFunction<T>) => {
	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const posts = await fn();
			setData(posts);
		} catch (error: any) {
			console.log(error);
			Alert.alert('Error', error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = fetchData;

	return { data, isLoading, refetch };
};

export default useAppwrite;

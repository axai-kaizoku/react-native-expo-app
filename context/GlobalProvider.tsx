import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/types';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

const GlobalContext = createContext({
	isLoggedIn: true,
	setIsLoggedIn: (e?: any) => {},
	user: {
		$collectionId: '',
		$createdAt: '',
		$databaseId: '',
		$id: '',
		$permissions: [],
		$tenant: '',
		$updatedAt: '',
		accountId: '',
		avatar: '',
		email: '',
		username: '',
	},
	setUser: (e?: any) => {},
	isLoading: false,
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<User | any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true);
					setUser(res);
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			})
			.catch((err: any) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				isLoading,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

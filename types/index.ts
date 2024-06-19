export type TabIconProps = {
	icon: string | any;
	color: string;
	name: string;
	focused: boolean;
};

export type CustomButtonProps = {
	title: string;
	handlePress: () => void;
	containerStyles?: string;
	textStyles?: string;
	isLoading?: boolean;
};

export type FormFieldProps = {
	title: string;
	value: any;
	handleChangeText: (e: any) => void;
	otherStyles: string;
	keyboardType?: string;
	placeholder: string;
};

export type SignInForm = {
	email: string;
	password: string;
};

export type SignUpForm = {
	username: string;
	email: string;
	password: string;
};

export type User = {
	$collectionId: string;
	$createdAt: string;
	$databaseId: string;
	$id: string;
	$permissions: any[];
	$tenant: string;
	$updatedAt: string;
	accountId: string;
	avatar: string;
	email: string;
	username: string;
};

export type Video = {
	$collectionId: string;
	$createdAt: string;
	$databaseId: string;
	$id: string;
	$permissions: any[];
	$tenant: string;
	$updatedAt: string;
	creators: {
		username: string;
		avatar: string;
	};
	prompt: string;
	thumbnail: string;
	title: string;
	video: string;
};

export type EmptyStateProps = {
	title: string;
	subtitle: string;
};

export type FetchFunction<T> = () => Promise<T[]>;

export type InfoBoxTypes = {
	title: number | string;
	subTitle?: string;
	containerStyles?: string;
	textStyles?: string;
};

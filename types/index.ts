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

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

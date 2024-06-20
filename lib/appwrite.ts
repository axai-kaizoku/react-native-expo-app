import { Asset, CreatingPostForm } from '@/app/(tabs)/create';
import { User, Video } from '@/types';
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	ImageGravity,
	Query,
	Storage,
} from 'react-native-appwrite';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.axai.aoranative',
	projectId: '666ad56e0001043b7c2c',
	databaseId: '666bbc080019b37e2790',
	userCollectionId: '666bbc2a0016e13da63d',
	videoCollectionId: '666bbc4d00287277bb4b',
	storageId: '666bbda6003c33cf1f92',
};

const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
	email: string,
	password: string,
	username: string,
) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username,
		);
		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(username);
		await signIn(email, password);
		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			},
		);

		return newUser;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const getCurrentUser = async (): Promise<User | undefined> => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)],
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0] as User;
	} catch (error: any) {
		console.log(error);
	}
};

export const getAllPosts = async (): Promise<Video[]> => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.orderDesc('$createdAt')],
		);
		return posts.documents as Video[];
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const getLatestPosts = async (): Promise<Video[]> => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(5)],
		);
		return posts.documents as Video[];
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const getSearchedPosts = async (query: string): Promise<Video[]> => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.search('title', query)],
		);
		return posts.documents as Video[];
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const getUserPosts = async (userId: string): Promise<Video[]> => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.equal('creators', userId), Query.orderDesc('$createdAt')],
		);
		return posts.documents as Video[];
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current');

		return session;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getFilePreview = async (fileId: string, type: string) => {
	let fileUrl;
	try {
		if (type === 'video') {
			fileUrl = storage.getFileView(config.storageId, fileId);
		} else if (type === 'image') {
			fileUrl = storage.getFilePreview(
				config.storageId,
				fileId,
				2000,
				2000,
				ImageGravity.Top,
				100,
			);
		} else {
			throw new Error('Invalid file type');
		}

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const uploadFile = async (file: Asset, type: string) => {
	if (!file) return;

	const asset = {
		name: file.fileName,
		type: file.mimeType,
		size: file.fileSize,
		uri: file.uri,
	};

	try {
		const uploadedFile = storage.createFile(
			config.storageId,
			ID.unique(),
			asset,
		);

		const fileUrl = await getFilePreview((await uploadedFile).$id, type);

		return fileUrl;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const createVideo = async (form: CreatingPostForm) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, 'image'),
			uploadFile(form.video, 'video'),
		]);

		const newPost = await databases.createDocument(
			config.databaseId,
			config.videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creators: form.userId,
			},
		);

		return newPost;
	} catch (error: any) {
		throw new Error(error);
	}
};

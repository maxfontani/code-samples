export type Book = {
	id: number;
	title: string;
	author: string;
	cover: string;
	description: string;
	language: string;
	category: BookCategory;
	status: BookStatus;
	bookedBy: number | null;
	bookedOn: string | null;
	bookedUntil: string | null;
	lastBooked: string | null;
	dateAdded: string;
	votes: number;
	url: string;
};

export type BookStatus = 'available' | 'unavailable' | 'returning';

export type BookCategory = 'Business' | 'Professional' | 'Fiction';

export type InitialState = {
	total: number;
	status: 'idle' | 'loading' | 'success' | 'error';
	error: string | null;
};

export type BookBookPayload = {
	userId: number;
	bookId: number;
	bookedUntil: string;
};

export type ReturnBookPayload = {
	bookId: number;
};

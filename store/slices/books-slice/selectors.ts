import { createSelector } from '@reduxjs/toolkit';
import { isBefore, isPast, parseISO } from 'date-fns';
import { booksAdapter } from './';
import { RootState } from '~store/types';
import { BOOK_CARD_GROUP_TYPES } from '~/view/components/organisms/book-card-group/constants';

export const {
	selectAll: selectAllBooks,
	selectIds: selectBooksIds,
	selectById: selectBookById,
} = booksAdapter.getSelectors<RootState>((state) => state.books);

export const selectBooksRoot = (state: RootState) => state.books;

export const selectBooksTotal = createSelector(
	selectBooksRoot,
	(books) => books.total
);

export const selectBooksState = createSelector(
	selectBooksRoot,
	selectAllBooks,
	(state, books) => ({
		books,
		status: state.status,
		error: state.error,
	})
);

export const selectNewestBooks = createSelector(selectAllBooks, (books) =>
	books.sort((a, b) =>
		isBefore(parseISO(a.dateAdded), parseISO(b.dateAdded)) ? 1 : -1
	)
);

export const selectMostVotedBooks = createSelector(selectAllBooks, (books) =>
	books.sort((a, b) => b.votes - a.votes)
);

export const selectProfessionalBooks = createSelector(selectAllBooks, (books) =>
	books.filter((book) => book.category === BOOK_CARD_GROUP_TYPES.PROFESSIONAL)
);

export const selectFictionBooks = createSelector(selectAllBooks, (books) =>
	books.filter((book) => book.category === BOOK_CARD_GROUP_TYPES.FICTION)
);

export const selectBusinessBooks = createSelector(selectAllBooks, (books) =>
	books.filter((book) => book.category === BOOK_CARD_GROUP_TYPES.BUSINESS)
);

export const selectBookedByUser = createSelector(
	[selectAllBooks, (state, userId: number) => userId],
	(allBooks, userId) => allBooks.filter((book) => book.bookedBy === userId)
);

export const selectExpiredByUser = createSelector(
	selectBookedByUser,
	(usersBooks) =>
		usersBooks.filter((book) => isPast(parseISO(book.bookedUntil || '')))
);

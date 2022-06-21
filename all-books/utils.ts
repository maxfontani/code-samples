import {
	selectAllBooks,
	selectBusinessBooks,
	selectFictionBooks,
	selectProfessionalBooks,
} from '~/store/slices/books-slice/selectors';
import {
	BOOK_CATEGORIES,
	BOOK_CATEGORY_DATA,
} from '~/store/slices/books-slice/constants';
import { BookCategory } from '~/store/slices/books-slice/types';
import { BOOKS_PER_PAGE } from './constants';

export const getSelectorByBookCategory = (category: string | null) => {
	if (category === BOOK_CATEGORIES.BUSINESS) return selectBusinessBooks;

	if (category === BOOK_CATEGORIES.FICTION) return selectFictionBooks;

	if (category === BOOK_CATEGORIES.PROFESSIONAL) return selectProfessionalBooks;

	return selectAllBooks;
};

export const getCategoryByFilter = (
	path: BookCategory
): BookCategory | undefined =>
	BOOK_CATEGORY_DATA.includes(path) ? path : undefined;

export const getPaginationInfo = (totalBooks: number, page: number) => {
	const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);
	const isPaginated = totalBooks > BOOKS_PER_PAGE;
	const pageEndIndex = BOOKS_PER_PAGE * page;
	const pageStartIndex = pageEndIndex - BOOKS_PER_PAGE;

	return {
		isPaginated,
		totalBooks,
		totalPages,
		pageStartIndex,
		pageEndIndex,
	};
};

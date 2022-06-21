import { Middleware } from 'redux';
import { extendBooking } from '../slices/user-slice';
import { bookBook, returnBook, updateBook } from '../slices/books-slice';

export const booking: Middleware = (store) => (next) => (action) => {
	switch (action.type) {
		case returnBook.type: {
			const { bookId } = action.payload;

			store.dispatch(
				updateBook({
					id: bookId,
					changes: { bookedBy: null, bookedUntil: null, status: 'available' },
				})
			);
			return;
		}
		case bookBook.type: {
			const { bookId, bookedUntil, userId } = action.payload;

			store.dispatch(
				updateBook({
					id: bookId,
					changes: { bookedBy: userId, bookedUntil, status: 'unavailable' },
				})
			);
			return;
		}
		case extendBooking.type: {
			const { id, extensionDate } = action.payload;

			store.dispatch(
				updateBook({
					id,
					changes: { bookedUntil: extensionDate },
				})
			);
		}
		default:
			break;
	}

	next(action);
};

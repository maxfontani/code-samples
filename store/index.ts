import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/books-slice';
import userReducer from './slices/user-slice';
import { booking } from './middleware/booking';

export const store = configureStore({
	reducer: {
		user: userReducer,
		books: booksReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booking),
});

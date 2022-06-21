import {
  createAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { BOOKS } from "./constants";
import {
  Book,
  BookBookPayload,
  InitialState,
  ReturnBookPayload,
} from "./types";

export const booksAdapter = createEntityAdapter({
  selectId: (book: Book) => book.id,
});

const defaultValues: InitialState = {
  total: 0,
  status: "idle",
  error: null,
};

const initialState = booksAdapter.getInitialState<InitialState>(defaultValues);

const filledState = booksAdapter.upsertMany(initialState, BOOKS);

const booksSlice = createSlice({
  name: "books",
  initialState: filledState,
  reducers: {
    BOOK_ADDED: booksAdapter.addOne,
    BOOK_UPDATED: booksAdapter.updateOne,
    RESET: (state) => {
      booksAdapter.removeAll(state);
      state.total = defaultValues.total;
      state.status = defaultValues.status;
      state.error = defaultValues.error;
    },
  },
});

export const bookBook = createAction<BookBookPayload>("books/BOOK_BOOKED");

export const returnBook = createAction<ReturnBookPayload>(
  "books/BOOK_RETURNED"
);

export const {
  BOOK_ADDED: addBook,
  BOOK_UPDATED: updateBook,
  RESET: resetBooksState,
} = booksSlice.actions;

export default booksSlice.reducer;

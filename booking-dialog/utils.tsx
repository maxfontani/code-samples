import { add as addTime, format, parse } from "date-fns";
import { extendBooking } from "~/store/slices/user-slice";
import {
  BOOKING_DIALOG_MODES,
  BOOKING_TIME,
  FORM_TAGS,
  TEXT,
} from "./constants";
import { BookingFormMode, FormTag, FormValues, OnSubmitBooking } from "./types";
import { Book } from "~store/slices/books-slice/types";
import { BACK_DATE_FORMAT } from "~/app/constants";

export const getInitialValues = (
  userFullName: string,
  mode: BookingFormMode,
  book: Book | undefined
): FormValues => {
  const today = new Date();

  if (mode === BOOKING_DIALOG_MODES.BOOK)
    return {
      name: userFullName ?? "",
      startDate: today,
      endDate: addTime(today, BOOKING_TIME.DEFAULT),
    };

  const bookedFromDate = book?.bookedOn
    ? parse(book.bookedOn, BACK_DATE_FORMAT, new Date())
    : new Date();

  const bookedUntilDate = book?.bookedUntil
    ? parse(book.bookedUntil, BACK_DATE_FORMAT, new Date())
    : new Date();

  return {
    name: userFullName ?? "",
    startDate: bookedFromDate,
    endDate: addTime(bookedUntilDate, BOOKING_TIME.DEFAULT),
  };
};

export const getBookingFormInfo = (
  mode: BookingFormMode,
  activeDatePicker: FormTag | null
) => {
  const title =
    mode === BOOKING_DIALOG_MODES.EDIT ? TEXT.TITLE_EDIT : TEXT.TITLE_BOOK;

  const isStartDateOpen = activeDatePicker === FORM_TAGS.START_DATE;

  const isEndDateOpen = activeDatePicker === FORM_TAGS.END_DATE;

  return {
    title,
    isStartDateOpen,
    isEndDateOpen,
  };
};

export const onSubmitBooking: OnSubmitBooking = (
  values,
  mode,
  bookId,
  dispatch,
  closeDialog,
  onConfirm
) => {
  if (mode === BOOKING_DIALOG_MODES.EDIT)
    dispatch(
      extendBooking({
        id: bookId,
        extensionDate: format(values.endDate, BACK_DATE_FORMAT),
      })
    );

  onConfirm && onConfirm();
  closeDialog();
};

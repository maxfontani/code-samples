import { FormikValues } from 'formik';
import { TextFieldProps } from '@mui/material';
import { PickersDayProps } from '@mui/x-date-pickers';
import { useAppDispatch } from '~/hooks';

export type Props = {
	mode: BookingFormMode;
	isOpen: boolean;
	bookId: number;
	closeDialog: () => void;
	onConfirm?: () => void;
};

export type BookingFormMode = 'BOOK' | 'EDIT';

export type FormTag = 'name' | 'startDate' | 'endDate';

export interface FormValues extends FormikValues {
	name: string;
	startDate: Date;
	endDate: Date;
}

export type RenderDay = (
	day: unknown,
	selectedDates: Array<unknown | null>,
	pickersDayProps: PickersDayProps<any>
) => JSX.Element;

export type GetDateInputProps = (tag: FormTag) => {
	endAdornment: JSX.Element;
};

export type GetRenderInput = (
	tag: FormTag
) => (props: TextFieldProps) => JSX.Element;

export type OnSubmitBooking = (
	values: FormValues,
	mode: BookingFormMode,
	bookId: number,
	dispatch: ReturnType<typeof useAppDispatch>,
	closeDialog: () => void,
	onConfirm: (() => void) | undefined
) => void;

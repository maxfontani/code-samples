import { useCallback, useMemo, useState } from 'react';
import { add as addTime } from 'date-fns';
import { Dialog, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~hooks';
import { selectBookById } from '~store/slices/books-slice/selectors';
import { selectUserFullName } from '~store/slices/user-slice/selectors';
import { ButtonPrimary, ButtonSecondary } from '~components';
import {
	BookAuthor,
	BookInfo,
	BookInfoWrapper,
	BookTitle,
	ButtonsWrapper,
	FormWrapper,
	StyledDay,
	StyledFormControl,
	Title,
	Wrapper,
} from './styled';
import mockBookCover from './mock-cover.png';
import { Calendar as CalendarIcon } from './icons/calendar';
import { VALIDATION_SHEMA } from './shema';
import { getBookingFormInfo, getInitialValues, onSubmitBooking } from './utils';
import {
	ALT,
	BOOKING_DIALOG_MODES,
	BOOKING_TIME,
	COVER_SIZES,
	DATE_MASK,
	DATE_STYLE,
	FORM_TAGS,
	FORM_VARIANT,
	IDS,
	LABELS,
	SUBMIT,
	TEXT,
} from './constants';
import { PATHS } from '~app-routes/constants';
import { LOCALE } from '~app/constants';
import { BUTTON_SIZES } from '~/view/styles/constants';
import {
	FormTag,
	FormValues,
	GetDateInputProps,
	GetRenderInput,
	Props,
	RenderDay,
} from './types';

export const BookingDialog = ({
	mode,
	isOpen,
	bookId,
	closeDialog,
	onConfirm,
}: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const book = useAppSelector((state) => selectBookById(state, bookId));
	const userFullName = useAppSelector(selectUserFullName);
	const [activeDatePicker, setActiveDatePicker] = useState<FormTag | null>(
		null
	);

	//TODO: complete the onSubmit logic
	const onSubmit = (values: FormValues) =>
		onSubmitBooking(values, mode, bookId, dispatch, closeDialog, onConfirm);

	const formik = useFormik<FormValues>({
		initialValues: getInitialValues(userFullName, mode, book),
		validationSchema: VALIDATION_SHEMA,
		onSubmit,
	});

	const maxEndDate = useMemo(
		() =>
			mode === BOOKING_DIALOG_MODES.BOOK
				? addTime(formik.values.startDate, BOOKING_TIME.MAX)
				: addTime(formik.values.endDate, BOOKING_TIME.MAX),
		[formik, mode]
	);

	const changeDateHandler = useCallback(
		(name: string) => (date: unknown) =>
			formik.handleChange({
				target: {
					name,
					value: date,
				},
			}),
		[formik]
	);

	const renderDay: RenderDay = useCallback(
		(day, selectedDates, pickersDayProps) => <StyledDay {...pickersDayProps} />,
		[]
	);

	const getDateInputProps: GetDateInputProps = useCallback(
		(tag: FormTag) => ({
			endAdornment: (
				<CalendarIcon
					id={tag}
					activeId={activeDatePicker}
					setActiveId={setActiveDatePicker}
				/>
			),
		}),
		[]
	);

	const getRenderInput: GetRenderInput = useCallback(
		(tag) => (props) => {
			props.variant = FORM_VARIANT;
			props.label = LABELS[tag];
			props.error = formik.touched[tag] && !!formik.errors[tag];
			props.helperText = formik.touched[tag] && formik.errors[tag];
			props.value = formik.values[tag].toLocaleString(LOCALE, {
				dateStyle: DATE_STYLE,
			});
			props.InputProps = getDateInputProps(tag);

			return <TextField {...props} />;
		},
		[]
	);

	// TODO: process book not found
	if (!book) return null;

	const { title, isStartDateOpen, isEndDateOpen } = getBookingFormInfo(
		mode,
		activeDatePicker
	);

	const closeDatePicker = () => setActiveDatePicker(null);
	const openBookPage = () => navigate(`/${PATHS.ALL_BOOKS}/${book.id}`);

	return (
		<Dialog onClose={closeDialog} open={isOpen}>
			<Wrapper>
				<Title>{title}</Title>
				<BookInfoWrapper>
					<img
						src={mockBookCover}
						alt={ALT}
						{...COVER_SIZES}
						onClick={openBookPage}
					/>
					<BookInfo>
						<BookTitle>{book.title}</BookTitle>
						<BookAuthor>{book.author}</BookAuthor>
					</BookInfo>
				</BookInfoWrapper>
				<FormWrapper onSubmit={formik.handleSubmit}>
					<StyledFormControl>
						<TextField
							disabled
							id={IDS.NAME}
							name={FORM_TAGS.NAME}
							value={formik.values.name}
							variant={FORM_VARIANT}
							label={LABELS[FORM_TAGS.NAME]}
							onChange={formik.handleChange}
							error={formik.touched.name && !!formik.errors.name}
							helperText={formik.touched.name && formik.errors.name}
						/>
					</StyledFormControl>
					<StyledFormControl>
						<DatePicker
							disabled
							open={isStartDateOpen}
							value={formik.values.startDate}
							mask={DATE_MASK}
							onChange={changeDateHandler(FORM_TAGS.START_DATE)}
							onOpen={() => setActiveDatePicker(FORM_TAGS.START_DATE)}
							onClose={closeDatePicker}
							renderDay={renderDay}
							renderInput={getRenderInput(FORM_TAGS.START_DATE)}
						/>
					</StyledFormControl>
					<StyledFormControl>
						<DatePicker
							open={isEndDateOpen}
							value={formik.values.endDate}
							mask={DATE_MASK}
							onChange={changeDateHandler(FORM_TAGS.END_DATE)}
							onOpen={() => setActiveDatePicker(FORM_TAGS.END_DATE)}
							onClose={closeDatePicker}
							maxDate={maxEndDate}
							renderDay={renderDay}
							renderInput={getRenderInput(FORM_TAGS.END_DATE)}
						/>
					</StyledFormControl>
					<ButtonsWrapper>
						<ButtonSecondary size={BUTTON_SIZES.S} onClick={closeDialog}>
							{TEXT.CANCEL}
						</ButtonSecondary>
						<ButtonPrimary type={SUBMIT} size={BUTTON_SIZES.S}>
							{TEXT.CONFIRM}
						</ButtonPrimary>
					</ButtonsWrapper>
				</FormWrapper>
			</Wrapper>
		</Dialog>
	);
};

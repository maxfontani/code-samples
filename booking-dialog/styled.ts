import styled from 'styled-components';
import { FormControl } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px;
	max-width: 525px;
	min-height: 660px;
`;

export const Title = styled.span`
	align-self: flex-start;
	text-align: center;
	font-weight: 300;
	font-size: 36px;
	line-height: 130%;
	color: ${({ theme }) => theme.colors.baseText};
	margin-bottom: 32px;
`;

export const BookInfoWrapper = styled.section`
	display: flex;
	gap: 24px;
	margin-bottom: 40px;
	width: fit-content;
	height: 127px;
`;

export const BookInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 8px;
	height: 100%;
`;

export const BookTitle = styled.div`
	font-size: 24px;
	line-height: 160%;
	color: ${({ theme }) => theme.colors.baseText};
`;

export const BookAuthor = styled.div`
	font-size: 18px;
	line-height: 160%;
	color: ${({ theme }) => theme.colors.fadeText};
`;

export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 32px;
`;

export const StyledFormControl = styled(FormControl)`
	position: relative;
	width: 100%;

	.MuiInput-underline:after {
		border: none;
	}

	.MuiFormLabel-root {
		position: absolute;
		top: 55px;
		left: 0;
		font-size: 14px;
		line-height: 16px;
		color: ${({ theme }) => theme.colors.labelFade};
		margin-bottom: 6px;
		transform: none;
	}

	.MuiFormLabel-root.Mui-focused {
		color: ${({ theme }) => theme.colors.labelFocus};
	}

	.MuiInputBase-root:before {
		transform: none;
		border-bottom: ${({ theme }) => theme.colors.inputLine};
	}

	.MuiInputBase-root:hover:before {
		border-bottom: ${({ theme }) => theme.colors.inputLineHover};
	}

	.MuiInputBase-root svg {
		position: relative;
		right: 10px;
		bottom: 5px;
	}

	.MuiInputBase-root:not(.Mui-disabled) svg {
		cursor: pointer;
	}

	.MuiInputBase-root.Mui-focused svg path,
	:hover .MuiInputBase-root:not(.Mui-disabled) svg path {
		fill: ${({ theme }) => theme.colors.brand};
	}

	.MuiInputBase-root.Mui-disabled:before {
		border-bottom: ${({ theme }) => theme.colors.inputLineDisabled};
	}

	.MuiInputBase-root.Mui-disabled svg path,
	:hover .MuiInputBase-root.Mui-disabled svg path {
		cursor: default;
		fill: ${({ theme }) => theme.colors.inputLineDisabled};
	}
`;

export const StyledDay = styled(PickersDay)`
	box-sizing: border-box;
	border: 1px solid ${({ theme }) => theme.colors.transparent};
	background-color: ${({ theme }) => theme.colors.transparent};

	&.MuiPickersDay-today {
		border: none;
		border-radius: 0;
		background-color: ${({ theme }) => theme.colors.brandFill};
	}

	:hover {
		box-sizing: border-box;
		border-radius: 0;
		background-color: ${({ theme }) => theme.colors.transparent};
		border: 1px solid ${({ theme }) => theme.colors.brand};
	}

	:active {
		border-radius: 0;
		background-color: ${({ theme }) => theme.colors.brand};
	}

	:focus,
	&.Mui-selected,
	&.Mui-selected:focus,
	&.Mui-selected:hover {
		border-radius: 0;
		background-color: ${({ theme }) => theme.colors.brand};
	}
`;

export const ButtonsWrapper = styled.section`
	display: flex;
	justify-content: center;
	gap: 36px;
	margin-top: 35px;
	width: 100%;
`;

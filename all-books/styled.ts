import styled from 'styled-components';
import { Pagination } from '@mui/material';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
	box-sizing: border-box;
	padding: ${({ theme }) => theme.sizes.padding.allBooks};
	width: 100%;

	@media (max-width: 1024px) {
		padding: ${({ theme }) => theme.sizes.padding.allBooksTablet};
	}

	@media (max-width: 480px) {
		padding: ${({ theme }) => theme.sizes.padding.allBooksMobile};
	}
`;

export const Title = styled.span`
	font-weight: 400;
	font-size: 36px;
	line-height: 130%;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
	gap: 30px;
	width: 100%;

	@media (max-width: 480px) {
		justify-items: center;
	}
`;

export const BookPagination = styled(Pagination)`
	align-self: center;

	.MuiPaginationItem-root.Mui-selected {
		background-color: ${({ theme }) => theme.colors.brand};
	}
`;

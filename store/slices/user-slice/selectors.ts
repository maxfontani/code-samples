import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '~store/types';

export const selectUserRootState = (state: RootState) => state.user;

export const selectUserId = createSelector(
	selectUserRootState,
	(user) => user.id
);

export const selectUserRole = createSelector(
	selectUserRootState,
	(user) => user.role
);

export const selectUserFullName = createSelector(
	selectUserRootState,
	(user) => `${user.firstName} ${user.lastName}`
);

export const selectWishlist = createSelector(
	selectUserRootState,
	(user) => user.wishlist
);

export const selectWatchlist = createSelector(
	selectUserRootState,
	(user) => user.watchlist
);

export const selectVotelist = createSelector(
	selectUserRootState,
	(user) => user.votelist
);

export const selectExtensionlist = createSelector(
	selectUserRootState,
	(user) => user.extensionlist
);

export const selectWasBookingExtended = createSelector(
	[selectExtensionlist, (_, bookId: number) => bookId],
	(list, bookId) => list.includes(bookId)
);

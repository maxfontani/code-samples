export type InitialState = {
	id: number;
	firstName: string;
	lastName: string;
	role: UserRole;
	wishlist: Wishlist;
	watchlist: Watchlist;
	votelist: Votelist;
	extensionlist: Extensionlist;
};

export type UserRole = 'user' | 'admin';

export type Wishlist = number[];

export type Watchlist = number[];

export type Votelist = number[];

export type Extensionlist = number[];

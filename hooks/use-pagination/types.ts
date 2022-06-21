export type SetPage = (page: number) => void;

export type UsePagination = () => [number, SetPage];

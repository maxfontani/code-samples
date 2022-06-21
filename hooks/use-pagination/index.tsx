import { useSearchParams } from 'react-router-dom';
import { SetPage, UsePagination } from './types';

export const usePagination: UsePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const setCurrentPage: SetPage = (page: number) =>
    setSearchParams({ ...searchParams, page: String(page) });

  return [currentPage, setCurrentPage];
};

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "~hooks/use-redux";
import { SelectChangeEvent } from "@mui/material";
import { BookCard, Dropdown } from "~components";
import { BookPagination, Grid, Title, Wrapper } from "./styled";
import { getPaginationInfo, getSelectorByBookCategory } from "./utils";
import { CATEGORY, PAGE, PAGINATION, TEXT } from "./constants";
import { BOOK_CATEGORY_DATA } from "~/store/slices/books-slice/constants";

export const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get(CATEGORY);
  const pageParam = searchParams.get(PAGE);

  const [category, setCategory] = useState(filter);
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);

  const initialDropdown = category ? [category] : undefined;

  let books = useAppSelector(getSelectorByBookCategory(category));
  const totalBooks = useMemo(() => books.length, [books]);

  const { isPaginated, totalPages, pageStartIndex, pageEndIndex } =
    getPaginationInfo(totalBooks, page);

  if (isPaginated) books = books.slice(pageStartIndex, pageEndIndex);

  const onChangeCategory = (event: SelectChangeEvent<string[]>) => {
    const selectedCategory = event.target.value as string;
    setSearchParams({ [CATEGORY]: selectedCategory });
  };

  const onChangePage = (_: React.ChangeEvent<unknown>, page: number) =>
    setSearchParams({ [PAGE]: String(page), [CATEGORY]: category || "" });

  useEffect(() => {
    setCategory(filter);
    setPage(Number(pageParam) || PAGINATION.DEFAULT_PAGE);
  }, [filter, pageParam]);

  return (
    <Wrapper>
      <Title>{TEXT.TITLE}</Title>
      <Dropdown
        key={category}
        data={BOOK_CATEGORY_DATA}
        defaultValue={initialDropdown}
        placeholder={TEXT.CATEGORY}
        changeHandler={onChangeCategory}
      />
      <Grid>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Grid>
      {isPaginated && (
        <BookPagination
          count={totalPages}
          page={page || PAGINATION.DEFAULT_PAGE}
          defaultPage={PAGINATION.DEFAULT_PAGE}
          shape={PAGINATION.SHAPE}
          size={PAGINATION.SIZE}
          onChange={onChangePage}
        />
      )}
    </Wrapper>
  );
};

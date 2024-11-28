import ReactPaginate from 'react-paginate';
import css from './Paginate.module.css';
import { ArrowLeft, ArrowRight } from '../../assets';
import { useState } from 'react';

type PaginateProps = {
  totalPages: number;
  nowPage: (value: number) => void;
};

export const Paginate = ({ totalPages, nowPage }: PaginateProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    nowPage(selectedPage.selected);
  };

  return (
    <div className={css.mainContainer}>
      <ReactPaginate
        previousLabel={<ArrowLeft />}
        nextLabel={<ArrowRight />}
        breakLabel={'...'}
        breakClassName={css.noActivity}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={handlePageChange}
        containerClassName={css.pagination}
        pageClassName={css.noActivity}
        activeClassName={css.active}
        previousClassName={css.noActivity}
        nextClassName={css.noActivity}
      />
    </div>
  );
};

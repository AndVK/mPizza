import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type Pagination = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<Pagination> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} //получить с бекенда
      forcePage={currentPage - 1}
      // renderOnZeroPageCount={null}
    />
  );
};

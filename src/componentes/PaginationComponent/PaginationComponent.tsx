/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';
import './styles.css';
import { twMerge } from 'tailwind-merge';
import { inter } from '@/styles/fonts';

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
  pageSize: number;
  pageCount: number;
  paginationModel?: KeyOfPaginationModel;
}

const paginationModels = {
  0: 'pagination1',
  1: 'pagination2',
};

export type KeyOfPaginationModel = keyof typeof paginationModels;

const PaginationComponent = ({
  paginationModel = 0,
  page,
  setPage,
  total,
  pageSize,
  pageCount,
}: Props) => {
  const initial_page = page - 1;
  const prev_disabled = page - 1 === 0;
  const next_disabled = page - 1 === 0;
  const page_items =
    total < pageSize || pageCount === page ? total : pageSize * page;
  const page_items_format =
    paginationModel === 1
      ? page_items?.toString().padStart(2, '0')
      : page_items;
  const total_format =
    paginationModel === 1 ? total?.toString()?.padStart(2, '0') : total;
  const displayItemsPerPage = () => {
    if (total === 0) return total;
    if (pageSize * page > total) {
      return total - pageSize * (page - 1);
    }
    if (total < pageSize) return total;
    return pageSize;
  };
  const content = `Mostrando ${displayItemsPerPage()} de ${total_format}`;

  const handlePage = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <div
      className={twMerge(
        paginationModel === 1
          ? `${inter.className} bg-white2 border-neutral20 w-fit self-end rounded-[4px] border-1 p-[4px]!`
          : '',
        'flex items-center justify-end gap-[8px]',
      )}
    >
      <span
        className={twMerge(
          paginationModel === 1 ? 'text-neutral' : 'text-primary',
          'text-[16px] font-bold',
        )}
      >
        {content}
      </span>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={6}
        onPageChange={handlePage}
        initialPage={initial_page}
        className={twMerge(
          paginationModels[paginationModel],
          'flex list-none items-center gap-[8px] self-end',
          prev_disabled ? 'disabled' : '',
          next_disabled ? 'disabled' : '',
        )}
      />
    </div>
  );
};

export default PaginationComponent;

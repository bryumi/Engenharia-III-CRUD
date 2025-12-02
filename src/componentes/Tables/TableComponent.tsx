import React, { Dispatch, SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import PaginationComponent, {
  KeyOfPaginationModel,
} from '../PaginationComponent/PaginationComponent';
import Switch, { KeyOfStyles } from '../Inputs/Switch/Switch';
import { Eye, Trash } from 'lucide-react';

interface Props {
  invalidColor?: boolean;
  headers: IHeader[];
  rows: IRow[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total?: number;
  pageSize?: number;
  pageCount?: number;
  switchModel?: KeyOfStyles;
  paginationModel?: KeyOfPaginationModel;
  radioInitalSelectedId?: string;
  handleRadio?: (row: IRow) => void;
  handleCopyClip?: (id: string) => void;
  handleView?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleToggle?: (id: string, bool: boolean) => void;
  handleDownload?: (url: string) => void;
  handleDelete?: (id: string) => void;
  handleSort?: (name: string, sort?: string) => void;
  gap?: string;
}

export interface IHeader {
  name: string;
  sort?: string;
  customClassNames?: string;
}

export interface IRow {
  id: string;
  active: boolean;
  data: IData[];
  download?: string;
}

export interface IData {
  image?: string;
  link?: string;
  text?: string;
  error?: boolean;
  customClassNames?: string;
}

const TableComponent = ({
  invalidColor,
  headers,
  rows,
  page,
  setPage,
  total = 0,
  pageSize = 10,
  pageCount = 1,
  switchModel,
  paginationModel,
  radioInitalSelectedId,
  handleRadio,
  handleCopyClip,
  handleView,
  handleEdit,
  handleToggle,
  handleDownload,
  handleDelete,
  handleSort,
  gap = '36',
}: Props) => {
  const [selectedRow, setSelectedRow] = useState<IRow | undefined>(undefined);
  return (
    <div className="flex flex-col gap-[16px]">
      <div
        className={twMerge(
          'bg-white2 border-primary20 overflow-x-auto rounded-[12px] border-1 p-[24px]!',
        )}
      >
        <table className="w-full table-fixed border-spacing-0">
          <thead>
            <tr>
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className={twMerge(
                    'border-primary80 border-b-1 uppercase',
                    header?.customClassNames,
                  )}
                >
                  <span
                    className={twMerge(
                      'text-primary80 flex items-end p-[12px]! text-start text-[14px] font-bold',
                    )}
                  >
                    {header.name}{' '}
                    {header.sort && handleSort && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleSort(header?.name, header?.sort)}
                      >
                        <img
                          width={12}
                          height={12}
                          src="/img/icons/arrow.svg"
                          alt="Seta"
                        />
                      </button>
                    )}
                  </span>
                </th>
              ))}
              <th className="border-primary80 border-b-1 uppercase">
                <span
                  className={twMerge(
                    'text-primary80 ml-auto! flex w-[256px] items-center justify-center p-[12px]! text-center text-[14px] font-bold',
                  )}
                >
                  ações
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, index) => (
              <tr
                key={`tr_${index}`}
                className="[:nth-child(even)]:bg-[#E4EAFF] [:nth-child(odd)]:border-y-1 [:nth-child(odd)]:border-[#C5CEEC]"
              >
                {row.data.map((info, index2) => (
                  <td
                    key={`td_${index}_${index2}`}
                    className={twMerge('h-[56px] p-[12px]!')}
                  >
                    {info?.image ? (
                      <img
                        className="h-[100px] w-[100px] rounded-[12px] object-cover"
                        src={info?.image}
                        alt="Imagem"
                      />
                    ) : info?.text ? (
                      <span
                        className={twMerge(
                          'text-primary80 flex items-end text-[14px] font-normal whitespace-nowrap uppercase',
                          !!invalidColor && info?.error !== undefined
                            ? info?.error
                              ? 'text-warning'
                              : 'text-success'
                            : info?.customClassNames,
                        )}
                      >
                        {info?.text}
                      </span>
                    ) : (
                      <Link
                        className={twMerge(
                          'text-primary80 flex items-end text-[16px] font-normal whitespace-nowrap uppercase underline',
                          !!invalidColor && info?.error !== undefined
                            ? info?.error
                              ? 'text-warning'
                              : 'text-success'
                            : info?.customClassNames,
                        )}
                        href={info?.link || ''}
                        target="_blank"
                      >
                        {(info?.link || '').length > 30
                          ? `${(info?.link || '').substring(0, 30)}...`
                          : info?.link}
                      </Link>
                    )}
                  </td>
                ))}
                <td className="text-primary80 h-[56px] text-[16px] font-normal">
                  <div
                    className={twMerge(
                      'ml-auto! flex w-[256px] items-center justify-center p-[12px]!',
                      gap === '24'
                        ? 'gap-[24px]'
                        : gap === '48'
                          ? 'gap-[48px]'
                          : 'gap-[36px]', // default
                    )}
                  >
                    {handleRadio && (
                      <label
                        htmlFor={`row_${row?.id}`}
                        className={twMerge(
                          'h-[24px] w-[24px] cursor-pointer rounded-full',
                          selectedRow?.id === row.id ||
                            (radioInitalSelectedId === row.id &&
                              selectedRow === undefined)
                            ? 'border-secondary border-5'
                            : 'border-primary80 border-1',
                        )}
                      >
                        <input
                          id={`row_${row?.id}`}
                          type="radio"
                          className="hidden"
                          checked={
                            selectedRow?.id === row.id ||
                            (radioInitalSelectedId === row.id &&
                              selectedRow === undefined)
                          }
                          onChange={() => {
                            handleRadio(row);
                            setSelectedRow(row);
                          }}
                        />
                      </label>
                    )}
                    {handleCopyClip && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleCopyClip(row.id)}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/link.svg"
                          alt="Vizualizar"
                        />
                      </button>
                    )}
                    {handleView && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleView(row.id)}
                      >
                        <Eye width={24} height={24} color="#475467" />
                      </button>
                    )}
                    {handleEdit && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleEdit(row?.id)}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/edit.svg"
                          alt="Editar"
                        />
                      </button>
                    )}
                    {handleDelete && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleDelete(row?.id)}
                      >
                        <Trash width={24} height={24} color="#df430a" />
                      </button>
                    )}
                    {handleDownload && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => {
                          if (row?.download) {
                            handleDownload(row?.download);
                          }
                        }}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/download.svg"
                          alt="Download"
                        />
                      </button>
                    )}
                    {handleToggle && (
                      <Switch
                        id={`switch_${index}`}
                        switchModel={switchModel}
                        checked={row?.active}
                        onChange={() => handleToggle(row?.id, row?.active)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        paginationModel={paginationModel}
        page={page}
        setPage={setPage}
        total={total}
        pageSize={pageSize}
        pageCount={pageCount}
      />
    </div>
  );
};

export default TableComponent;

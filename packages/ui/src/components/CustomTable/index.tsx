import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { buildCellByDataValue } from '../../utils/Helpers';

type Movement = {
  id: string;
  amount: number;
  currency: string;
  date: Date;
  description: string;
  createDate: Date;
  updatedDate: Date;
};

const fallbackData: any = [];


export const CustomTable = ({
  data,
  rowCount,
  customPagination,
}: {
  data: Movement[];
  rowCount?: number;
  customPagination?: {
    take: number;
    skip: number;
    setTake: React.Dispatch<React.SetStateAction<number>>;
    setSkip: React.Dispatch<React.SetStateAction<number>>;
  };
}) => {
  const [movements, setMovements] = useState<Movement[]>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setMovements(data);
  }, [data]);

  useEffect(() => {
    if (customPagination) {
      customPagination.setSkip(pagination.pageIndex * pagination.pageSize);
      customPagination.setTake(pagination.pageSize);
    }
  }, [pagination]);

  if (!data) return <div>loading...</div>;

  const customColumns = useMemo(() => {
    if (!!movements && movements.length > 0) {
      const mappedcols = buildCellByDataValue(data);
      return mappedcols;
    }
    return [];
  }, [movements]);

  const table = useReactTable({
    columns: customColumns ?? fallbackData,
    data: movements ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    rowCount,
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <table className="w-full border-collapse indent-0 shadow-lg cursor-pointer">
        <thead className="shadow-sm rounded-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-sm tracking-wide">
                  {header.column.columnDef.header as any}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="text-sm tracking-wide text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex mt-5">
        <div aria-label="pagination-buttons">
          <button onClick={() => table.previousPage()}>Prev</button>
          <button className="ml-2" onClick={() => table.nextPage()}>
            Next
          </button>
        </div>
        <div className="ml-auto flex" aria-label="pagination-config">
          <select
            className="mr-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <div>Total: {table.getRowCount()}</div>
        </div>
      </div>
    </>
  );
};

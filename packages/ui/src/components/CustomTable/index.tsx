import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import {  useEffect, useMemo, useState } from 'react';
import { buildCellByDataValue } from '../../utils/Helpers';

// type Movement = {
//   id: string;
//   amount: number;
//   currency: string;
//   date: Date;
//   description: string;
//   createDate: Date;
//   updatedDate: Date;
// };

const fallbackData: any = [];


export const CustomTable = <T extends {}>({
  data,
  rowCount,
  customPagination,
}: {
  data: T[];
  rowCount?: number;
  customPagination?: {
  pagination: {},
  setPagination: React.Dispatch<React.SetStateAction<any>>
  };
}) => {
  const [movements, setMovements] = useState<T[]>();
  const [tanstankPagination, setTankstankPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });


  useEffect(() => {
    setMovements(data);
  }, [data]);

  useEffect(() => {
    if (customPagination) {
      customPagination.setPagination({
        skip: tanstankPagination.pageIndex * tanstankPagination.pageSize,
        take:tanstankPagination.pageSize
      })
    }
  }, [tanstankPagination]);

  if (!data) return <div>loading...</div>;

  const customColumns = useMemo(() => {
    if (!!movements && movements.length > 0) {
      const mappedcols = buildCellByDataValue(data, ['id', 'created_date', 'updated_date']);
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
    onPaginationChange: setTankstankPagination,
    state: {
      pagination: tanstankPagination,
    },
  });

  return (
    <>
      <table role='table-content'  className="w-full border-collapse indent-0 shadow-lg cursor-pointer border bg-white border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-sm tracking-wide px-4 py-2 border-b">
                  {header.column.columnDef.header as any}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='hover:bg-blue-gray-200'>
              {row.getVisibleCells().map((cell) => (
                <td className="text-sm tracking-wide text-center px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex mt-5">
        <div aria-label="pagination-buttons">
          <button className='bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded' onClick={() => table.previousPage()}>Prev</button>
          <button className="bg-magenta-500 hover:bg-magenta-700 text-white font-bold ml-2 py-2 px-4 rounded" onClick={() => table.nextPage()}>
            Next
          </button>
        </div>
        <div className="ml-auto flex" aria-label="pagination-config">
          <select
            className="mr-2 bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded"
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
          <div className='bg-magenta-500 text-white font-bold py-2 px-4 rounded'>Total: {table.getRowCount()}</div>
        </div>
      </div>
    </>
  );
};

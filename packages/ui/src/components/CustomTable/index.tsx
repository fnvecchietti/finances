import {
  flexRender,
  getCoreRowModel,
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

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
];

export const CustomTable = ({ data }: { data: Movement[] }) => {
  const [movements, setMovements] = useState<Movement[]>();

  if (!data) return <div>loading...</div>;

  useEffect(() => {
    setMovements(data);
  }, [data]);

  const customColumns = useMemo(() => {
    if (!!movements && movements.length > 0) {
        const mappedcols = buildCellByDataValue(data)
       return mappedcols;
    }
    return [];
  }, [movements]);

  const table = useReactTable({
    columns: customColumns ?? columns,
    data: movements ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
  );
};

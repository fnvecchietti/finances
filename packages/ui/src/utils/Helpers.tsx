import { ColumnDef } from '@tanstack/react-table';
import { NumericFormat } from 'react-number-format';

const AMOUNT_COLUMN = (key: string) => {
  return {
    cell: ({ cell, row }: any) => (
      <NumericFormat
        prefix="$"
        displayType="text"
        value={row.original[key]}
        allowLeadingZeros
        thousandSeparator=","
      />
    ),
    accessorKey: key,
    header: key.toUpperCase(),
  };
};

const DATA_MAP_CELL: { [key: string]: any } = {
  amount: AMOUNT_COLUMN,
  current_price: AMOUNT_COLUMN,
  purchase_price: AMOUNT_COLUMN,
};

export const buildCellByDataValue = <T extends {}>(
  dataExample: T[],
): ColumnDef<T>[] => {
  const cols = Object.keys(dataExample[0]);
    
  const buildedCells = cols.map((key) => {
    if (DATA_MAP_CELL[key]) {
      return DATA_MAP_CELL[key](key);
    }
    return {
      accessorKey: key,
      header: key.toUpperCase(),
    };
  });

  return buildedCells;
};

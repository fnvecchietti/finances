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
    header: replaceUnderScoreInHeadersFormatted(key),
  };
};

const DATA_MAP_CELL: { [key: string]: any } = {
  amount: AMOUNT_COLUMN,
  current_price: AMOUNT_COLUMN,
  purchase_price: AMOUNT_COLUMN,
};

export const buildCellByDataValue = <T extends {}>(
  dataExample: T[], exclude: string[]
): ColumnDef<T>[] => {
  const cols = Object.keys(dataExample[0]);
  const filteredCols = cols.filter(c => !exclude.includes(c))
  const buildedCells = filteredCols.map((key) => {
    if (DATA_MAP_CELL[key]) {
      return DATA_MAP_CELL[key](key);
    }
    return {
      accessorKey: key,
      header: replaceUnderScoreInHeadersFormatted(key),
    };
  });

  return buildedCells;
};

export const replaceUnderScoreInHeadersFormatted = (header:string) => {
  return header.replace(/_/g, " ").toUpperCase();
}
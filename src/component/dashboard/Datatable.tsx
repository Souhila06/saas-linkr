import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[]; 
  columns: GridColDef[];
  onRowClick: (rowData: any) => void;
}


export default function DataTable({ rows, columns, onRowClick }: DataTableProps) {

  const handleCellClick = (params: any) => {
    const rowData = params.row;
    onRowClick(rowData)
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onCellClick={handleCellClick}
      />
    </div>
  );
}
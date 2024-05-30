import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Component, Product } from '../../App';
import SingalComponent from './SingalComponent';

const AllProducts: React.FunctionComponent<{ arrInventory: Product[] }> = ({ arrInventory }) => {

 const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'productName', headerName: 'Name', width: 130 },
    { field: 'totalPrice', headerName: 'Price', type: 'number', width: 90 },
    {
      field: 'stockQuantity',
      headerName: 'Count',
      type: 'number',
      width: 90,
    },
    {
      field: 'productComponents',
      headerName: 'Components',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      valueGetter: (params) => {
        const components: Component[] = params as Component[];
        if (!components || components.length === 0) {
          return 'No Components';
        }
       return components.map(component => `name: ${component.name}, price: ${component.price}`).join(', ');
      //  return components.map((component, index) => (
      //   <SingalComponent key={index} component={component} />
      // )); 
      //  ולא הצלחתי לפתור זאת[obect Obect] אם אני מנסה להציג מקומפוננטה אחרת מציג 
      },

    },
  ];
  const handleRowSelectionChange = (selection: any) => {
    setSelectedRows(selection.rows.map((row: any) => row.id));
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={arrInventory}
        columns={columns}
        onRowSelectionModelChange={handleRowSelectionChange}//(בודק אם שורה נבחרה (בשביל הוספת מוצר
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
export default AllProducts;
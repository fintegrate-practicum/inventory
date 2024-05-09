
import { DataGrid, GridColDef} from '@mui/x-data-grid';
interface Component {
  name: string;
  price: number;

}
interface Product {
  //בשביל התחלה....
  id: number,
  name: string,
  price: number,
  count: number,
  component: Component[]

}


const AllProducts: React.FunctionComponent<{ arrInventory: Product[] }> = ({ arrInventory }) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 90 },
    {
      field: 'count',
      headerName: 'Count',
      type: 'number',
      width: 90,
    },
    {
      field: 'component',
      headerName: 'Components',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      valueGetter: (params) => {
        const components: Component[] = params as Component[];
        if (!components || components.length === 0) {
          return 'No Components';
        }
        //return components.map(component => `${<SingalCmponent componentOne={component}/>}`);
        return components.map(component => `name: ${component.name}, price: ${component.price}`).join(', ');
      },
          
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={arrInventory}
        columns={columns}
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
//הקומפוננטות של הצגת כל פריט בנפרד לא באו לשימוש במבנה של הטבלה

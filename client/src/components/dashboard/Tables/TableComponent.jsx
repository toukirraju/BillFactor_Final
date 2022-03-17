import { AgGridReact } from "ag-grid-react";

const TableComponent = (props) => {
  // console.log(props);

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="table-Wrapper">
      <h4 className="text-light text-center">{props.title}</h4>
      <div className="ag-theme-alpine " style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={props.rowData}
          columnDefs={props.columns}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default TableComponent;

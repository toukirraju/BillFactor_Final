import React, { useEffect } from "react";
import "../moderatorPage.css";
import { useDispatch, useSelector } from "react-redux";
import CircularNavBarTop from "../circularNavBar/CircularNavBarTop";
import CircularNavBarBottom from "../circularNavBar/CircularNavBarBottom";
import {
  getAllTempBill,
  getMonthlyTransactions,
} from "../../../redux/slices/transactionSlice";
import DatePicker from "react-datepicker";

import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import ConfirmationPopUp from "../../../components/confirmationPopUp/ConfirmationPopUp";

const TransactionDetails = () => {
  const dispatch = useDispatch();
  const { transactions, allTemp, isAdded } = useSelector(
    (state) => state.transaction
  );
  const { message } = useSelector((state) => state.message);

  const [removeId, setRemoveId] = React.useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  useEffect(() => {
    dispatch(getMonthlyTransactions({ month, year }));
    dispatch(getAllTempBill());
  }, [isAdded, dispatch]);

  const columns = [
    { headerName: "Name", field: "renterName" },
    { headerName: "Due", field: "tempDue" },
    { headerName: "Electricity Bill", field: "e_bill" },
    { headerName: "Others Bill", field: "o_bill" },
  ];

  function dateFormatter(params) {
    return new Date(params.value).toDateString();
  }
  const transColumns = [
    {
      headerName: "Renter Name",
      field: "renterName",
    },
    { headerName: "Electricity Bill", field: "e_bill" },
    { headerName: "Others Bill", field: "o_bill" },
    { headerName: "Payable Amount", field: "payableAmount" },
    { headerName: "Paid Amount", field: "paidAmount" },
    { headerName: "Due", field: "due" },
    { headerName: "Date", field: "date", valueFormatter: dateFormatter },
    {
      headerName: "Actions",
      field: "_id",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleRemove(params.data)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const handleRemove = (bill) => {
    if (new Date(bill.date).getMonth() + 1 === new Date().getMonth() + 1) {
      setConfirmationPopUp(true);
      setRemoveId(bill._id);
    } else {
      toast.error("you can't remove this bill");
    }
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  return (
    <>
      <div className="moderatorWraper">
        <CircularNavBarTop />
        <CircularNavBarBottom />

        <ConfirmationPopUp
          show={confirmationPopUp}
          onHide={() => setConfirmationPopUp(false)}
          data={removeId}
          popUpType="Remove_Bill"
        />
        {message && (
          <div className="form-group text-center">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        <div className="input-container">
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div>
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(getMonthlyTransactions({ month, year }))}
            >
              &#x1F50E;
            </button>
          </div>
        </div>

        {Object.keys(transactions).length !== 0 ? (
          <>
            <div className="row  mx-5">
              <div className="col-md-7  cardBody">
                <h1 className="text-center">All Transactions</h1>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 400, width: "100%" }}
                >
                  <AgGridReact
                    rowData={transactions}
                    columnDefs={transColumns}
                    defaultColDef={defaultColDef}
                  />
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4 cardBody">
                <h1 className="text-center">All Temp Bills</h1>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 300, width: "100%" }}
                >
                  <AgGridReact
                    rowData={allTemp}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div class="d-flex justify-content-center">
              <h1 className="text-center text-white">
                Transaction Not found.....
              </h1>
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TransactionDetails;

import React, { useEffect } from "react";
import "./moderatorPage.css";
import { useDispatch, useSelector } from "react-redux";
import CircularNavBarTop from "./circularNavBar/CircularNavBarTop";
import CircularNavBarBottom from "./circularNavBar/CircularNavBarBottom";
import { allrenters } from "../../redux/slices/renterSlice";
import { clearMessage } from "../../redux/slices/message";
import { allApartments } from "../../redux/slices/apartmentSlice";
import SelectPayableRenter from "./Transactions/SelectPayableRenter";
import BarChartCompo from "../../components/dashboard/Charts/BarChartCompo";
import PieChart from "../../components/dashboard/Charts/PieChart";

import TableComponent from "../../components/dashboard/Tables/TableComponent";

import DatePicker from "react-datepicker";
import SelectRenter from "./SelectRenter";
import {
  getApartmentWidget,
  getRenterWidget,
  getBillWidget,
} from "../../redux/slices/dashboardSlice";
import CircularProgress from "../../components/dashboard/Charts/CircularProgress";
import { getMonthlyTransactions } from "../../redux/slices/transactionSlice";

const ModeratorDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isAdded, apartments } = useSelector((state) => state.moderator);
  const { data: renterData } = useSelector((state) => state.renterCreator);
  const { transactions } = useSelector((state) => state.transaction);

  const { apartmentWidgets, renterWidgets, billWidgets, isPending, isReload } =
    useSelector((state) => state.dashboardData);
  // console.log(billWidgets);
  const [payableRenter, setPayableRenter] = React.useState(false);
  const [findRenter, setFindRenter] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());

  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();
  // const { message, isReload } = useSelector((state) => state.message);

  // useEffect(() => {
  //   dispatch(allApartments());
  // }, [isAdded, dispatch]);

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);
  function dateFormatter(params) {
    return new Date(params.value).toDateString();
  }
  const apartmentTabColumns = [
    {
      headerName: "Level",
      field: "level",
      resizable: true,
      width: 90,
    },
    {
      headerName: "Apartment No",
      field: "apartNo",
      resizable: true,
      width: 100,
    },
    { headerName: "Room No", field: "roomNo", resizable: true, width: 100 },
    { headerName: "Status", field: "status", resizable: true, width: 110 },
    {
      headerName: "Renter Name",
      field: "renterName",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Total Rent",
      field: "totalRent",
      resizable: true,
      width: 100,
    },
    { headerName: "Rent", field: "rent", resizable: true, width: 100 },
    { headerName: "Gas Bill", field: "gasbill", resizable: true, width: 100 },
    { headerName: "Fridge Bill", field: "f_bill", resizable: true, width: 100 },
    {
      headerName: "Water Bill",
      field: "waterbill",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Service Charge",
      field: "c_service",
      resizable: true,
      width: 100,
    },
  ];

  const renterTabColumns = [
    {
      headerName: "Renter Name",
      field: "renterName",
      resizable: true,
      width: 100,
    },
    { headerName: "Phone", field: "phone", resizable: true, width: 100 },
    {
      headerName: "Apartment No",
      field: "apartNo",
      resizable: true,
      width: 100,
    },
    { headerName: "Room No", field: "roomNo", resizable: true, width: 100 },
    { headerName: "Address", field: "address", resizable: true, width: 100 },
    { headerName: "NId", field: "nId", resizable: true, width: 100 },
    {
      headerName: "Advance Rent",
      field: "advanceRent",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Date",
      field: "date",
      valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
    },
  ];

  const transTabColumns = [
    {
      headerName: "Renter Name",
      field: "renterName",
      resizable: true,
      width: 150,
    },
    {
      headerName: "Electricity Bill",
      field: "e_bill",
      resizable: true,
      width: 120,
    },
    { headerName: "Others Bill", field: "o_bill", resizable: true, width: 100 },
    {
      headerName: "Payable Amount",
      field: "payableAmount",
      resizable: true,
      width: 150,
    },
    {
      headerName: "Paid Amount",
      field: "paidAmount",
      resizable: true,
      width: 150,
    },
    { headerName: "Due", field: "due", resizable: true, width: 100 },
    {
      headerName: "Date",
      field: "date",
      valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
    },
  ];
  useEffect(() => {
    dispatch(allApartments());
    dispatch(allrenters());
    dispatch(clearMessage());
    dispatch(getApartmentWidget());
    dispatch(getRenterWidget());
    dispatch(getBillWidget());
    dispatch(getMonthlyTransactions({ month, year }));
  }, [isAdded, isReload, dispatch]);
  return (
    <>
      <div className="moderatorWraper">
        {user.role === undefined || user.role === "" ? (
          <>
            <CircularNavBarTop />
            <CircularNavBarBottom />
          </>
        ) : null}

        {/* select Renter Modal  */}
        <div className="Select_Section">
          <SelectPayableRenter
            show={payableRenter}
            onHide={() => setPayableRenter(false)}
          />

          <SelectRenter show={findRenter} onHide={() => setFindRenter(false)} />

          <div className="text-center mt-3 ms-4">
            <button
              className="btn btn-outline-warning"
              onClick={() => setFindRenter(true)}
            >
              Find Renter
            </button>
            <button
              className="btn btn-outline-warning ms-2"
              onClick={() => setPayableRenter(true)}
            >
              Make Bill
            </button>
          </div>
        </div>

        <div className="container my-3">
          {/*  Charts */}
          <div className="row">
            <div className="col-md-6">
              <div className="cardBody ">
                <BarChartCompo />
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="row ">
                <div className="cardBody">
                  <h1 className="text-center text-light">Chayanirr</h1>
                  <p className="text-center text-light">
                    <b>House No: </b> K-241/1, <b>Location: </b>Laxmipura,
                    Joydebpur, Gazipur{" "}
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="cardBody">
                    <PieChart />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cardBody" style={{ height: "340px" }}>
                    <CircularProgress />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  widgets */}
          <div className="row">
            <div className="col-md-4">
              <div className="cardBody">
                <div className="card text-light bg-transparent">
                  {!isPending ? (
                    <>
                      <div className="card-body">
                        <h5 className="card-title text-center shadow-lg  bg-info bg-gradient rounded p-1">
                          Apartment
                        </h5>
                        <div className="card-text text-center">
                          <p>
                            <b>Total Apartments:</b>
                            {apartmentWidgets.totalApartments}
                          </p>
                          <p>
                            <b>Total Rooms:</b>
                            {apartmentWidgets.totalRooms}
                          </p>
                          <p>
                            <b>Available Rooms:</b>
                            {apartmentWidgets.availableRooms}
                          </p>
                          <p>
                            <b>Unavailable Rooms:</b>
                            {apartmentWidgets.unavailableRooms}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cardBody">
                <div className="card text-light bg-transparent">
                  {!isPending ? (
                    <>
                      <div className="card-body">
                        <h5 className="card-title text-center shadow-lg  bg-info bg-gradient rounded p-1">
                          Renter
                        </h5>
                        <div className="card-text text-center">
                          <p>
                            <b>Total :</b>
                            {renterWidgets.totalRenters}
                          </p>
                          <p>
                            <b>Active :</b>
                            {renterWidgets.activeRenter}
                          </p>
                          <p>
                            <b>Inactive :</b>
                            {renterWidgets.inactiveRenter}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cardBody">
                <div className="card text-light bg-transparent">
                  {!isPending ? (
                    <>
                      <div className="card-body">
                        <h5 className="card-title text-center  shadow-lg  bg-info bg-gradient rounded p-1">
                          Bill
                        </h5>
                        <div className="card-text text-center">
                          <p>
                            <b>Payable :</b>
                            {billWidgets.totalPayable}
                          </p>
                          <p>
                            <b>Paid :</b>
                            {billWidgets.totalPaidBill}
                          </p>
                          <p>
                            <b>Remaining :</b>
                            {billWidgets.remainingBill}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/*  Tables */}

          <div className="row">
            <div className="col-md-6">
              {apartments ? (
                <TableComponent
                  title="Apartment"
                  rowData={apartments.floors}
                  columns={apartmentTabColumns}
                />
              ) : null}
            </div>
            <div className="col-md-6">
              {renterData ? (
                <TableComponent
                  title="Renters"
                  rowData={renterData.renters}
                  columns={renterTabColumns}
                />
              ) : null}
            </div>
            <div className="">
              <div className="input-container">
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMMM/yyyy"
                    showMonthYearPicker
                    withPortal
                  />
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      dispatch(getMonthlyTransactions({ month, year }))
                    }
                  >
                    &#x1F50E;
                  </button>
                </div>
              </div>
              {transactions ? (
                <TableComponent
                  title="Bills"
                  rowData={transactions}
                  columns={transTabColumns}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ModeratorDashboard;

import React, { useEffect } from "react";
import "../moderatorPage.css";
import { useDispatch, useSelector } from "react-redux";
import CircularNavBarTop from "../circularNavBar/CircularNavBarTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularNavBarBottom from "../circularNavBar/CircularNavBarBottom";
import { getMonthlyTransactions } from "../../../redux/slices/transactionSlice";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TransactionDetails = () => {
  const dispatch = useDispatch();
  const { transactions, isAdded } = useSelector((state) => state.transaction);
  const { message } = useSelector((state) => state.message);

  const [startDate, setStartDate] = React.useState(new Date());

  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  console.log(transactions);
  useEffect(() => {
    dispatch(getMonthlyTransactions({ month, year }));
  }, [isAdded, dispatch]);

  return (
    <>
      <div className="moderatorWraper">
        <CircularNavBarTop />
        <CircularNavBarBottom />

        <ToastContainer />

        {message && (
          <div className="form-group text-center">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        <div class="row">
          <div class="col-sm-4">
            <p class="float-start">left</p>
          </div>
          <div class="col-sm-8">
            <p class="float-end d-flex">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
              <button
                onClick={() =>
                  dispatch(getMonthlyTransactions({ month, year }))
                }
              >
                show
              </button>
            </p>
          </div>
        </div>
        <div className="text-end"></div>

        {Object.keys(transactions).length !== 0 ? (
          <>
            <div className="table-responsive container cardBody">
              <h1 className="text-center">All Transactions</h1>

              <table class="table align-middle table-hover">
                <thead>
                  <tr>
                    <th scope="col">Renter Name</th>
                    <th scope="col">Electricity Bill</th>
                    <th scope="col">Others Bill</th>
                    <th scope="col">Total Rent</th>
                    <th scope="col">Payable Amount</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Due</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                {transactions.map((renter) => (
                  <tbody>
                    <tr>
                      <td class="table-primary">{renter.renterName}</td>
                      <td class="table-secondary">{renter.e_bill}</td>
                      <td class="table-success">{renter.o_bill}</td>
                      <td class="table-danger">{renter.totalRent}</td>
                      <td class="table-warning">{renter.payableAmount}</td>
                      <td class="table-info">{renter.paidAmount}</td>
                      <td class="table-dark">{renter.due}</td>

                      <td class="table-light">{renter.date}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center text-white">Transaction Not found</h1>
            <div class="d-flex justify-content-center">
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

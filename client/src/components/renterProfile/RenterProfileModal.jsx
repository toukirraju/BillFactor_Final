import { Modal } from "react-bootstrap";
import TableComponent from "../dashboard/Tables/TableComponent";

const RenterProfileModal = (props) => {
  function dateFormatter(params) {
    return new Date(params.value).toDateString();
  }

  const transTabColumns = [
    { headerName: "Date", field: "date", valueFormatter: dateFormatter },
    { headerName: "Payable Amount", field: "payableAmount" },
    { headerName: "Paid Amount", field: "paidAmount" },
    { headerName: "Due", field: "due" },
    { headerName: "Electricity Bill", field: "e_bill" },
    { headerName: "Others Bill", field: "o_bill" },
  ];

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen
        // className="bg-dark bg-gradient"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container cardBody">
            {Object.keys(props.renterData).length !== 0 ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="cardBody ">
                      <div className="card-header d-flex justify-content-around">
                        <p className="text-uppercase fw-bold">Personal Info</p>{" "}
                        <p className="">
                          Name: {props.renterData.renterData.renterName}
                        </p>
                      </div>
                      <div className="mx-5">
                        <p className="">
                          Phone: {props.renterData.renterData.phone}
                        </p>
                        <p className="">
                          Address: {props.renterData.renterData.address}
                        </p>
                        <p className="">
                          Nid: {props.renterData.renterData.nId}
                        </p>
                        <p className="">
                          Advance Rent:{" "}
                          {props.renterData.renterData.advanceRent}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cardBody">
                      <div className="card-header d-flex justify-content-around">
                        <p className="text-uppercase fw-bold">Apartment Info</p>
                        <p className="">
                          level: {props.renterData.apartmentData.level}
                        </p>
                      </div>
                      <div className="row mx-5">
                        <div className="col-md-6">
                          <p className="">
                            Apartment No:{" "}
                            {props.renterData.apartmentData.apartNo}
                          </p>

                          <p className="">
                            Room No: {props.renterData.apartmentData.roomNo}
                          </p>
                          <p className="">
                            Rent: {props.renterData.apartmentData.rent}
                          </p>
                          <p className="">
                            Total Rent:{" "}
                            {props.renterData.apartmentData.totalRent}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="">
                            <p className="">
                              Gas bill: {props.renterData.apartmentData.gasbill}
                            </p>
                            Water bill:{" "}
                            {props.renterData.apartmentData.waterbill}
                          </p>
                          <p className="">
                            Fridge bill: {props.renterData.apartmentData.f_bill}
                          </p>
                          <p className="">
                            Service charge:{" "}
                            {props.renterData.apartmentData.c_service}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {props.renterData.tempbill ? (
                  <>
                    <div className="cardBody">
                      <div className="card-header d-flex justify-content-around">
                        <p className="text-uppercase fw-bold">
                          {" "}
                          Temporary Bill Info
                        </p>
                        <p className="">
                          Due: {props.renterData.tempbill.tempDue}
                        </p>
                        <p className="">
                          Electricity Bill: {props.renterData.tempbill.e_bill}
                        </p>
                        <p className="">
                          Others Bill: {props.renterData.tempbill.o_bill}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="">
                  {props.renterData.bills ? (
                    <TableComponent
                      title="Bills"
                      rowData={props.renterData.bills}
                      columns={transTabColumns}
                    />
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenterProfileModal;

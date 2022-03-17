import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";

const CircularProgress = () => {
  const { apartmentWidgets, renterWidgets, billWidgets, isPending } =
    useSelector((state) => state.dashboardData);

  const per =
    (parseInt(billWidgets.paidRenters) * 100) /
    parseInt(renterWidgets.activeRenter);
  const percentage = Math.round(per);
  const incompleteRenter =
    parseInt(renterWidgets.activeRenter) - parseInt(billWidgets.paidRenters);
  return (
    <>
      <h5 className="text-center text-white">
        <b>Payment</b>
      </h5>
      <div className="text-center text-white d-flex justify-content-between mb-1">
        <p>
          <b> Complete:</b>
          <b> {billWidgets.paidRenters}</b>
        </p>
        <p>
          <b>Incomplete: </b>
          <b>{incompleteRenter}</b>
        </p>
      </div>
      <div
        style={{
          width: "60%",
          height: "65%",
          margin: "auto",
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={`Paid :${percentage}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: "turquoise",
            trailColor: "gold",
            textSize: "10px",
          })}
        />
      </div>
      <div className="text-center text-white">
        <p>
          Active Renter:
          <b> {renterWidgets.activeRenter}</b>
        </p>
      </div>
    </>
  );
};

export default CircularProgress;

const axios = require("axios");
const sendMessage = (data, phone) => {
  const smsTemplate = `Dear Customer,
 You Successfully Paid ${data.paidAmount}
 Taka to Home Owner.
 Your Relevant Bill:
 Rent: ${data.totalRent}
 Electricity Bill: ${data.e_bill}
 Others Bill: ${data.o_bill}
 Total Amount: ${data.payableAmount}
 Due: ${data.due}
 Payment Date: ${new Date(data.date).toLocaleDateString()}
 Thanks For Payment \n  -Powerd by ChayaNirr`;
  // console.log(smsTemplate);

  const greenwebsms = new URLSearchParams();
  greenwebsms.append("token", "da41a403d4de550c164dbb55d4238818");
  greenwebsms.append("to", phone);
  greenwebsms.append("message", smsTemplate);
  axios
    .post("http://api.greenweb.com.bd/api.php", greenwebsms)
    .then((response) => {
      // response.status(200).json("Successfully Send SMS");
      // console.log(response.data);
    });
};

module.exports = {
  sendMessage,
};

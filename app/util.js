// import Swal from "sweetalert2";

const saveToDb = async (apiname, data, successMsg = "") => {
  let returnValue = "";
  const currentDateAndTime = new Date();

  const dateObj = new Date(currentDateAndTime);
  const formattedDateStr =
    dateObj.toISOString().split("T")[0] +
    " " +
    dateObj.toTimeString().split(" ")[0];

  await fetch(apiname, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, timestamp: formattedDateStr.toString() }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      returnValue = data;
    })
    .catch((error) => {
      returnValue = error;
    });
  return returnValue;
};

export default saveToDb;

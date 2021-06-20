import React, { useEffect, useState } from "react";
import { customerData } from "../CustomerData";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  bidTable: {
    width: "100%",
    "& td,th": {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px"
    },
    "& tr": {
      cursor: "pointer"
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#dddddd"
    }
  }
});

const BidData = (props) => {
  const [customer, setCustomer] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (props?.match?.params?.id) {
      let customerInfo = customerData.find(
        (customer) => customer.id === props.match.params.id
      );
      customerInfo && setCustomer(customerInfo);
    }
  }, []);
  return (
    <>
      <h3>{`${customer?.firstname} ${customer?.lastname} Bid List`}</h3>
      <table className={classes.bidTable}>
        <tbody>
          <tr>
            <th>Bid ID</th>
            <th>Car Title</th>
            <th>Amount</th>
            <th>Created</th>
          </tr>
          {customer?.bids?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.carTitle || "NA"}</td>
              <td>{item.amount}</td>
              <td>{item.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BidData;

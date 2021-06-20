import React, { useState, useEffect } from "react";
import { customerData } from "../CustomerData";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  customerTable: {
    "& td,th": {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px"
    },
    "& tr": {
      "& hover": {
        cursor: "pointer"
      }
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#dddddd"
    }
  },
  tableToolbar: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const CustomerTable = () => {
  const classes = useStyles();
  const [minOrMax, setMinOrMax] = useState("max");
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    fetch(`https://intense-tor-76305.herokuapp.com/merchants%60`)
      .then((resp) => resp.json())
      .then((resp) => {
        const customerList =
          resp && Object.keys(resp).length ? resp : customerData;
        setCustomerList(customerList);
      });
  }, []);
  const showBids = (bidsArr) => {
    const arr = bidsArr.map((obj) => obj.amount);
    return Math[minOrMax](...arr);
  };

  const handleMinMax = (e, newVal) => {
    setMinOrMax(newVal);
  };

  return (
    <div>
      <div className={classes.tableToolbar}>
        <ToggleButtonGroup value={minOrMax} exclusive onChange={handleMinMax}>
          <ToggleButton value="min">Min</ToggleButton>
          <ToggleButton value="max">Max</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <table className={classes.customerTable}>
        <tbody>
          <tr>
            <th>Customer name (with avatar)</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Premium</th>
            <th>Max/Min</th>
          </tr>
          {customerList.map((item) => (
            <tr key={item.id}>
              <td>{item.firstname + " " + item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.hasPremium ? "Yes" : "No"}</td>
              <td>{showBids(item.bids)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

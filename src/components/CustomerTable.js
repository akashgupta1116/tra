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
  const [minOrMax, setisMinOrMax] = useState("max");
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
  const showMaxBid = (bidsArr) => {
    let max = 0;
    bidsArr.forEach((bid) => {
      if (bid.amount > max) {
        max = bid.amount;
      }
    });

    return max;
  };

  const showMinBid = (bidsArr) => {
    let min = bidsArr[0].amount;
    bidsArr.forEach((bid) => {
      if (bid.amount < min) {
        min = bid.amount;
      }
    });

    return min;
  };
  const handleMinMax = (e, newVal) => {
    setisMinOrMax(newVal);
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
              <td>
                {minOrMax === "min"
                  ? showMinBid(item.bids)
                  : showMaxBid(item.bids)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

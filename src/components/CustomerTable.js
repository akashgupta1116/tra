import React, { useState, useEffect } from "react";
import { customerData } from "../CustomerData";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  customerTable: {
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
  const [sortOrder, setSortOrder] = useState(1);
  const history = useHistory();

  useEffect(() => {
    fetch(`https://intense-tor-76305.herokuapp.com/merchants%60`)
      .then((resp) => resp.json())
      .then((resp) => {
        // if user could not fetch data then we have added dummy data
        const customerList =
          resp && Object.keys(resp).length ? resp : customerData;
        setCustomerList(customerList);
      });
  }, []);
  const showBids = (bidsArr) => {
    const arr = bidsArr ? bidsArr.map((obj) => obj.amount) : [];
    return Math[minOrMax](...arr);
  };

  const sortArr = (arr, order) => {
    const newArr = arr.map((obj) => {
      const newObj = { ...obj };
      newObj["sortBid"] = showBids(newObj.bids);
      return newObj;
    });
    return newArr.sort((a, b) => (a.sortBid - b.sortBid) * order);
  };

  const handleMinMax = (e, newVal) => {
    setMinOrMax(newVal);
  };

  const toggleSort = () => {
    // sorting can be done by clicking on Min col header
    setSortOrder(sortOrder === 1 ? -1 : 1);
    setCustomerList(sortArr(customerList, sortOrder));
  };

  return (
    <div style={{ width: "100vw" }}>
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
            <th onClick={toggleSort}>{minOrMax === "min" ? "Min" : "Max"}</th>
          </tr>
          {customerList.map((item) => (
            <tr key={item.id} onClick={() => history.push(`/bids/${item.id}`)}>
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

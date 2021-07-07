import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TransactionCard from "../../components/card/TransactionCard";

// TODO: Remove on cleaning

// Sample Datas
const sampleData = [
  {
    id: "1",
    category: {
      title: "others",
      group: "others",
      icon: "others_icon",
    },
    notes:
      "Some Random Notes Some Random Notes  Some Random Notes  Some Random Notes  Some Random Notes",
    amount: {
      type: "expense",
      value: 4600,
    },
    currency: "INR",
    date: new Date(2020, 7, 14),
    wallet: {
      name: "HDFC",
    },
  },
  {
    id: "2",
    category: {
      title: "internet",
      group: "bills and utilities",
      icon: "internet",
    },
    notes: "Some Random Notes 2",
    amount: {
      type: "expense",
      value: 1200,
    },
    currency: "INR",
    date: new Date(2020, 7, 14),
    wallet: {
      name: "HDFC",
    },
  },
  {
    id: "3",
    category: {
      title: "phone",
      group: "internet",
      icon: "phone",
    },
    notes: "Some Random Notes 3",
    amount: {
      type: "expense",
      value: 300,
    },
    currency: "INR",
    date: new Date(2020, 7, 15),
    wallet: {
      name: "Cash",
    },
  },
  {
    id: "4",
    category: {
      title: "Groceries",
      group: "Food and Beverage",
      icon: "Groceries",
    },
    notes: "Some Random Notes 4",
    amount: {
      type: "expense",
      value: 420.5,
    },
    currency: "INR",
    date: new Date(2020, 7, 16),
    wallet: {
      name: "Cash",
    },
  },
];

/****** Sample Datas *****/

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  gridRootCentered: {
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  contentGrid: {
    flex: "1 0 auto",
  },
  detailGrid: {
    transition: theme.transitions.create(["width", "height"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const Transaction = () => {
  const classes = useStyles();

  const expenses = sampleData;

  const [detailView, setDetailView] = useState(false);

  const handleDetailViewDisplay = (show) => {
    setDetailView(show);
  };

  return (
    <Grid
      container
      spacing={2}
      wrap="nowrap"
      className={clsx(
        !detailView ? classes.gridRootCentered : classes.gridRoot
      )}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        className={classes.contentGrid}
        zeroMinWidth
      >
        <Paper elevation={3}>
          <TransactionCard
            expenses={expenses}
            handleDetailViewDisplay={handleDetailViewDisplay}
          />
        </Paper>
      </Grid>
      {detailView && (
        <Grid item xs={12} sm={6} md={7} className={classes.detailGrid}>
          <Paper elevation={3}>
            <TransactionCard
              expenses={expenses}
              handleDetailViewDisplay={handleDetailViewDisplay}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
export default Transaction;

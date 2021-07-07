import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DateUtils from "../../utils/date";
import { Num } from "../../utils/number";
import groupByPeriod from "../../utils/transactionGroupBy";

const useStyles = makeStyles((theme) => ({
  listHeaderCard: {
    borderRadius: 0,
  },
  listLayer: {
    backgroundColor: theme.palette.grey[300], // dark theme - #333
    paddingBottom: "30px",
    paddingTop: "30px",

    "& + $listLayer": {
      paddingTop: 0,
    },

    "& .MuiListItem-secondaryAction": {
      paddingRight: "75px",
    },
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
  },
  cardHeader: {
    backgroundColor: theme.palette.background.paper,
    "& .MuiCardHeader-action": {
      marginTop: "8px",
      marginRight: "0",
    },
  },
}));

const TransactionCard = (props) => {
  const classes = useStyles();

  const { expenses, handleDetailViewDisplay } = props;

  const expensesByDate = groupByPeriod(expenses, "date", "day");

  const handleExpenseEdit = (expense) => {
    handleDetailViewDisplay(true);
  };

  return Object.entries(expensesByDate).map(([key, value]) => {
    let dateKey = new Date(value.date),
      month = DateUtils.getMonthNameLong(dateKey),
      year = DateUtils.getYear(dateKey),
      monthYearCombo = month + " " + year,
      day = DateUtils.getDayNameLong(dateKey),
      dateDD = DateUtils.getDateDD(dateKey);

    // console.log("key ----", new Date(value.date));

    let computeTotalAmount = value.transactions.reduce((acc, fv) => {
      if (fv.amount.type === "expense") {
        acc = acc - parseFloat(fv.amount.value);
      } else if (fv.amount.type === "income") {
        acc = acc + parseFloat(fv.amount.value);
      }
      return acc;
    }, 0);

    return (
      <List
        key={key}
        dense
        subheader={
          <ListSubheader disableGutters>
            <Card key={key} elevation={0} className={classes.listHeaderCard}>
              <CardHeader
                avatar={<Typography variant="h4">{dateDD}</Typography>}
                title={day}
                subheader={monthYearCombo}
                className={classes.cardHeader}
                action={
                  <Typography variant="body2" color="inherit" component="p">
                    <b>{Num(computeTotalAmount)}</b>
                  </Typography>
                }
              />
              <Divider />
            </Card>
          </ListSubheader>
        }
        className={classes.listLayer}
      >
        {value.transactions &&
          value.transactions.map((expense, idx) => (
            <React.Fragment key={idx}>
              <ListItem
                className={classes.listItem}
                button
                onClick={(e) => handleExpenseEdit(expense)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={expense.category.title}
                    src={expense.category.icon}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={expense.category.title}
                  secondary={expense.notes}
                />
                <ListItemSecondaryAction>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {Num(expense.amount.value)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    );
  });
};

export default TransactionCard;

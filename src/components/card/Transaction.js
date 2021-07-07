import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
  },
  cardActionAreaSub: {
    display: "flex",
  },
  cardHeader: {
    flex: "1 1 auto",
    minWidth: 0,

    "& .MuiCardHeader-content": {
      //avatar takes up 56px
      minWidth: 0,
    },
  },
  transactionCardSub: {
    // maxWidth: "inherit",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    flex: "0 1 auto",
  },
}));

const Transaction = (props) => {
  const classes = useStyles();

  const { expense } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.cardActionAreaSub}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                alt={expense.category.title}
                src={expense.category.icon}
              />
            }
            title={expense.category.title}
            subheader={expense.notes}
            subheaderTypographyProps={{ noWrap: true }}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" color="textSecondary" component="p">
              {expense.amount.value}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default Transaction;

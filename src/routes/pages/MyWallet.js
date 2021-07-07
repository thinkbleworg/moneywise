import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import sampleWallets from "../../constants/sampleWallets.json";

import ListCard from "../../components/card/ListCard";
import { Num } from "../../utils/number";

const wallets = sampleWallets;

const useStyles = makeStyles((theme) => ({
  contentGrid: {
    flex: "1 0 auto",
  },

  detailsGridZeroWidth: {
    // maxWidth: 0,
    // padding: 0,
  },
  contentPaper: {
    maxHeight: "calc(100% - 15px)", // 64px for header, padding - 16px for container
    overflowY: "auto",
  },
}));

const MyWallet = () => {
  const classes = useStyles();

  const archivedUI = <Chip size="small" label="Archived" />;

  const walletDataIncInTotal = wallets
    .filter((w) => !w.excludeFromTotal)
    .map((w, idx) => {
      return {
        id: "included-in-total-" + idx,
        icon: {
          src: w.walletIcon.iconPath,
          alt: w.walletIcon.iconName,
          grayScale: w.archived,
        },
        primaryTitle: w.walletName,
        secondaryTitle: Num(w.openBalance),
        secondaryAction: w.archived ? archivedUI : "",
      };
    });
  const walletDataExcInTotalList = wallets
    .filter((w) => w.excludeFromTotal)
    .map((w, idx) => {
      return {
        id: "excluded-in-total-" + idx,
        icon: {
          src: w.walletIcon.iconPath,
          alt: w.walletIcon.iconName,
          grayScale: w.archived,
        },
        primaryTitle: w.walletName,
        secondaryTitle: Num(w.openBalance),
        secondaryAction: w.archived ? archivedUI : "",
      };
    });

  const totalWallets = [
    {
      title: "Included in Total",
      data: walletDataIncInTotal,
    },
    {
      title: "Excluded in Total",
      data: walletDataExcInTotalList,
    },
  ];
  return (
    <Grid container spacing={2} justify="center" wrap="nowrap">
      <Grid
        item
        xs={12}
        sm={7}
        md={5}
        className={classes.contentGrid}
        zeroMinWidth
      >
        <Paper elevation={3} className={classes.contentPaper}>
          <ListCard items={totalWallets} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyWallet;

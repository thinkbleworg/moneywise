import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Check";

import withDialog from "../dialog/withDialog";
import ImageLoad from "../utils/ImageLoad";

const useContentStyles = makeStyles((theme) => ({
  formControl: {
    minHeight: "200px",
    minWidth: "300px",
    transition: theme.transitions.create(["width", "height"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  gridRoot: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // display: "flex",
    // "& li": {
    //   flex: "1 0 50%",
    // },
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  flagOptionImg: {
    flex: "0 0 auto",
    width: "32px",
    minWidth: "auto",
    height: "32px",
    display: "flex",
    alignItems: "center",
  },
  flagOptionContent: {
    paddingLeft: "20px",
    width: "175px",
  },
}));

const WalletListForm = (props) => {
  const { handleSaveDialog, wallet, DialogContent, dialogRendered, wallets } =
    props;
  const classes = useContentStyles();

  const [selected, setSelected] = useState(wallet || {});

  const handleListItemClick = (event, option) => {
    console.log("option value----", option);
    setSelected(option);
    handleSaveDialog({
      ...option,
      displayName: option.primaryTitle,
    });
  };

  const walletDataIncInTotal = wallets
    .filter((w) => !w.excludeFromTotal)
    .map((w, idx) => {
      return {
        id: "Inc-" + idx,
        icon: {
          src: w.walletIcon.iconPath,
          alt: w.walletIcon.iconName,
          grayScale: w.archived,
        },
        primaryTitle: w.walletName,
        secondaryTitle: w.openBalance,
      };
    });
  const walletDataExcInTotalList = wallets
    .filter((w) => w.excludeFromTotal)
    .map((w, idx) => {
      return {
        id: "Exc-" + idx,
        icon: {
          src: w.walletIcon.iconPath,
          alt: w.walletIcon.iconName,
          grayScale: w.archived,
        },
        primaryTitle: w.walletName,
        secondaryTitle: w.openBalance,
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

  const ListItemUI = ({ option }) => (
    <ListItem
      button
      dense
      key={option.id}
      className={classes.listItem}
      selected={selected.id === option.id}
      onClick={(event) => handleListItemClick(event, option)}
    >
      <ListItemIcon className={classes.flagOptionImg}>
        <ImageLoad
          src={option.icon.src}
          width="100%"
          alt={option.icon.alt}
          className={clsx(option.icon.grayScale && classes.grayScale)}
        />
      </ListItemIcon>
      <ListItemText
        className={classes.flagOptionContent}
        primary={option.primaryTitle}
        primaryTypographyProps={{
          noWrap: true,
        }}
        inset
        secondary={
          <Typography variant="body2" gutterBottom>
            {option.secondaryTitle}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <CheckIcon
          style={{
            visibility: selected.id === option.id ? "visible" : "hidden",
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  const ListUI = ({ wallet, index }) => (
    <>
      {index !== 0 ? <Divider /> : ""}
      <List
        component="nav"
        className={classes.gridRoot}
        subheader={
          <ListSubheader component="li" disableSticky={true}>
            {wallet.title}
          </ListSubheader>
        }
      >
        {wallet.data.map((option) => (
          <ListItemUI option={option} key={option.id} />
        ))}
      </List>
    </>
  );

  return (
    <>
      <DialogContent dividers>
        <FormControl className={classes.formControl}>
          {totalWallets &&
            totalWallets.map((wallet, idx) => (
              <ListUI key={idx} wallet={wallet} index={idx} />
            ))}
        </FormControl>
      </DialogContent>
    </>
  );
};

const WalletListModal = withDialog(WalletListForm);

export default WalletListModal;

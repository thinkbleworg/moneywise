import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";

import withDialog from "../../dialog/withDialog";
import ImageLoad from "../../utils/ImageLoad";

import Portal from "../../utils/Portal";

const useContentStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  root: {
    borderRadius: 0,
    padding: 0,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  iconPadder: {
    padding: "10px",

    "&:hover": {
      background: "rgba(45,184,76,.2)",
    },

    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: 0,

    "& img": {
      width: "100%",
    },
  },
  checkedIiconPadder: {
    background: "rgba(45,184,76,.2)",
  },
}));

const IconModalContent = (props) => {
  const { selectedIcon, DialogContent, walletIcons, handleSaveDialog } = props;
  const classes = useContentStyles();

  const [selection, setSelection] = useState(selectedIcon);

  const handleIconSelection = (e) => {
    let value = walletIcons.filter(
      (icon) => icon.iconName === e.target.value
    )[0];
    setSelection(value);
    handleSaveDialog(value);
  };

  const IconUI = (obj) => {
    return (
      <Box
        className={clsx(
          classes.iconPadder,
          obj.checked && classes.checkedIiconPadder
        )}
      >
        <div className={classes.iconBox}>
          <ImageLoad src={obj.icon.iconPath} alt={obj.icon.iconName} />
        </div>
      </Box>
    );
  };

  return (
    <>
      <DialogContent dividers>
        <FormControl className={classes.formControl}>
          {walletIcons &&
            walletIcons.map((icon) => (
              <Radio
                key={icon.id}
                checked={selection.iconName === icon.iconName}
                value={icon.iconName}
                className={classes.root}
                name="wallet-icons"
                checkedIcon={<IconUI checked={true} icon={icon} />}
                icon={<IconUI icon={icon} />}
                onChange={handleIconSelection}
              />
            ))}
        </FormControl>
      </DialogContent>
    </>
  );
};

const AddWalletIconModal = withDialog(IconModalContent);

export default AddWalletIconModal;

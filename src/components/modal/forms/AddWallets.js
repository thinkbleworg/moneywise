import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { getDefaultIcons } from "../../../utils/iconMap";
import { getWalletTypes } from "../../../utils/walletType";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import withDialog from "../../dialog/withDialog";

import AddWalletIconModal from "./AddWalletIcon";
import AddCurrencyModal from "./AddCurrency";
import DropdownTextField from "../../utils/DropdownTextField";
import ButtonTextField from "../../utils/ButtonTextField";

import ImageLoad from "../../utils/ImageLoad";

const AdornmentIcon = React.memo(({ option, classes }) => {
  return (
    <div className={classes.adornmentIcon}>
      <ImageLoad
        src={option.flagBase64}
        width="100%"
        alt={option.countryName}
      />
    </div>
  );
});

const useFormStyles = makeStyles((theme) => ({
  boxes: {
    display: "flex",
    marginBottom: 30,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: 0,

    "& img": {
      width: "100%",
    },
  },
  inputControls: {
    marginRight: "20px",
  },
  selectFormControl: {
    flex: "1 0 auto",
  },
}));

const AddWalletForm = ({
  actionProps,
  setDisableSaveButton,
  DialogContent,
  DialogActions,
  dialogRendered,
  ...props
}) => {
  const classes = useFormStyles();

  const walletIcons = getDefaultIcons();
  const walletTypes = getWalletTypes();

  const categoriesList = [
    {
      id: 0,
      name: "global",
      label: "Global",
    },
  ];

  const [walletIcon, setWalletIcon] = useState("");
  const [walletName, setWalletName] = useState("");
  const [currency, setCurrency] = useState("");
  const [openBalance, setOpenBalance] = useState(0);
  const [excludeFromTotal, setExcludeFromTotal] = useState(false);
  const [categories, setCategories] = useState(categoriesList[0]);
  const [enableNotification, setEnableNotification] = useState(false);
  const [type, setType] = useState("");

  const [openWalletIconDialog, setOpenWalletIconDialog] = useState(false);

  const handleSubmitWalletForm = (event) => {
    event.preventDefault();
    const walletObj = {
      type: type,
      walletIcon: walletIcon,
      walletName: walletName,
      currency: currency,
      openBalance: openBalance,
      enableNotification: enableNotification,
      excludeFromTotal: excludeFromTotal,
      categories: categories,
    };
    // console.log("walletObj ----", walletObj);
    props.handleSaveDialog();
  };

  // Form Input Event Handlers
  const handleWalletTypeInput = (event) => {
    let selectedType = walletTypes.filter(
      (c) => c.walletType === event.target.value
    )[0];
    setType(selectedType);
  };

  const handleWalletCategoriesInput = (event) => {
    let category = categoriesList.filter(
      (c) => c.name === event.target.value
    )[0];
    setCategories(category);
  };

  const handleWalletNameInput = (event) => {
    let value = event.target.value;
    setWalletName(value);
  };

  const handleOpenBalanceInput = (event) => {
    setOpenBalance(event.target.value);
  };

  // Dialogs Event Handlers
  // const handleOpenWalletIconDialog = () => {
  //   setOpenWalletIconDialog(true);
  // };

  // const handleCloseWalletIconDialog = () => {
  //   setOpenWalletIconDialog(false);
  // };

  // const handleSaveWalletIconDialog = (icon) => {
  //   setWalletIcon(icon);
  //   handleCloseWalletIconDialog();
  // };

  useEffect(() => {
    setWalletIcon(walletIcons[0]);
  }, walletIcons);

  // Save Button disable|enable
  useEffect(() => {
    if (
      type &&
      type.walletType &&
      walletName.trim() !== "" &&
      currency &&
      currency.displayName
    ) {
      setDisableSaveButton(false);
    } else {
      setDisableSaveButton(true);
    }
  }, [type, walletName, currency]);

  return (
    <>
      <DialogContent dividers>
        <Box className={classes.boxes}>
          <FormControl
            required
            variant="outlined"
            className={clsx(classes.selectFormControl, classes.inputControls)}
          >
            <InputLabel id="wallet-type-label">Wallet Type</InputLabel>
            <Select
              labelId="wallet-type-label"
              id="wallet-type"
              value={type.walletType ? type.walletType : ""}
              onChange={handleWalletTypeInput}
              label="Wallet Type"
            >
              {walletTypes.map((typ) => (
                <MenuItem key={typ.walletType} value={typ.walletType}>
                  {typ.walletTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            required
            variant="outlined"
            className={clsx(classes.selectFormControl, classes.inputControls)}
          >
            <InputLabel id="wallet-categories-label">
              Wallet Categories
            </InputLabel>
            <Select
              labelId="wallet-categories-label"
              id="wallet-categories"
              value={categories.name ? categories.name : ""}
              onChange={handleWalletCategoriesInput}
              label="Wallet Categories"
              inputProps={{ readOnly: true }}
            >
              {categoriesList.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.boxes}>
          {/* {walletIcons && (
            <Button
              variant="outlined"
              size="small"
              color="default"
              className={classes.inputControls}
              onClick={handleOpenWalletIconDialog}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <div className={classes.iconBox}>
                <img src={walletIcon.iconPath} />
              </div>
            </Button>
          )} */}
          {walletIcons && walletIcon && (
            <ButtonTextField
              className={classes.inputControls}
              DialogComponent={AddWalletIconModal}
              setFormFieldValue={setWalletIcon}
              fieldValue={{
                img: walletIcon.iconPath,
                altName: walletIcon.iconName,
              }}
              dialogProps={{
                dialogTitle: "Select a Wallet Icon",
                showCloseButton: true,
                walletIcons: walletIcons,
                selectedIcon: walletIcon,
              }}
            />
          )}
          <TextField
            label="Wallet Name"
            variant="outlined"
            required
            placeholder="Your preferred Wallet Name?"
            id="wallet-name"
            defaultValue={walletName}
            className={classes.inputControls}
            onChange={handleWalletNameInput}
          />
        </Box>
        <Box className={classes.boxes}>
          {/* <SelectCurrency
            countryCurrencies={countryCurrencies}
            currency={currency}
            setCurrency={setCurrency}
          /> */}
          <DropdownTextField
            className={classes.inputControls}
            fieldLabel="Currency"
            required
            setFormFieldValue={setCurrency}
            fieldValue={currency}
            DialogComponent={AddCurrencyModal}
            AdornmentIconComponent={AdornmentIcon}
            DefaultAdornmentIcon={MonetizationOnIcon}
            dialogProps={{
              dialogTitle: "Select a currency",
              showCloseButton: true,
              currency: currency,
            }}
          />
          <TextField
            label="Opening Balance"
            variant="outlined"
            placeholder="Your preferred Wallet Name?"
            id="open-balance"
            defaultValue={openBalance}
            className={classes.inputControls}
            onChange={handleOpenBalanceInput}
          />
        </Box>
        <Box display="block" marginBottom="25px">
          <FormControlLabel
            control={
              <Checkbox
                checked={excludeFromTotal}
                onChange={(e) => setExcludeFromTotal(!excludeFromTotal)}
                name="excludeFromTotal"
                color="default"
              />
            }
            label={
              <>
                <Typography variant="body2" gutterBottom>
                  Exclude from Total
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Ignore this wallet and its balance in the "Total" mode.
                </Typography>
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enableNotification}
                onChange={(e) => setEnableNotification(!enableNotification)}
                name="enableNotification"
                color="default"
              />
            }
            label={
              <>
                <Typography variant="body2" gutterBottom>
                  Enable Notification
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Get Notified when there are changes to this wallet's
                  transactions.
                </Typography>
              </>
            }
          />
        </Box>
      </DialogContent>
      <DialogActions
        actionProps={actionProps}
        handleSave={handleSubmitWalletForm}
      />
      {/* {openWalletIconDialog && (
        <AddWalletIconModal
          dialogOpen={openWalletIconDialog}
          dialogTitle="Select a Wallet Icon"
          handleCloseDialog={handleCloseWalletIconDialog}
          handleSaveDialog={handleSaveWalletIconDialog}
          showCloseButton={true}
          saveText="Save"
          cancelText="Cancel"
          walletIcons={walletIcons}
          selectedIcon={walletIcon}
        />
      )} */}
    </>
  );
};

const AddWalletDialog = withDialog(AddWalletForm);

export default AddWalletDialog;

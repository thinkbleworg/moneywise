import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CategoryIcon from "@material-ui/icons/Category";

import withDialog from "../../dialog/withDialog";

import AddWalletIconModal from "./AddWalletIcon";
import WalletListModal from "../WalletListModal";
import CategoryListModal from "../CategoryListModal";
import DropdownTextField from "../../utils/DropdownTextField";
import ButtonTextField from "../../utils/ButtonTextField";
import ImageLoad from "../../utils/ImageLoad";

import { groupCategoriesToTree } from "../../../utils/category";
import { getDefaultIcons } from "../../../utils/iconMap";

import sampleWallets from "../../../constants/sampleWallets.json";

const AdornmentIcon = React.memo(({ option, classes }) => {
  return (
    <div className={classes.adornmentIcon}>
      <ImageLoad src={option.icon.src} width="100%" alt={option.icon.alt} />
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

const AddCategoryForm = ({
  actionProps,
  setDisableSaveButton,
  DialogContent,
  DialogActions,
  dialogRendered,
  ...props
}) => {
  const classes = useFormStyles();

  const defaultIcons = getDefaultIcons();
  const wallets = sampleWallets;
  const categories = groupCategoriesToTree();

  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [filteredCategoriesList, setFilteredCategoriesList] = useState([]);
  const [wallet, setWallet] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const handleSubmitCategoryForm = (event) => {
    console.log("event preventing ----", event);
    event.preventDefault();
    let walletObj = wallets.find((w) => w.walletName === wallet.displayName);

    const categoryObj = {
      categoryType: categoryType,
      categoryIcon: categoryIcon,
      categoryName: categoryName,
      wallet: walletObj,
      parentCategory: parentCategory,
    };
    console.log("categoryObj ----", categoryObj);
    props.handleSaveDialog();
  };

  // Form Input Event Handlers
  const handleCategoryChange = (event) => {
    setCategoryType(event.target.value);
  };

  const handleWalletCategoriesInput = (event) => {
    // let category = categoriesList.filter(
    //   (c) => c.name === event.target.value
    // )[0];
    // setCategories(category);
  };

  const handleCategoryNameInput = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setCategoryName(value);
  };

  useEffect(() => {
    setCategoryIcon(defaultIcons[0]);
    // setCategoryType("Income");
  }, [defaultIcons]);

  // Save Button disable|enable
  useEffect(() => {
    if (
      categoryName.trim() !== "" &&
      wallet &&
      wallet.displayName &&
      parentCategory &&
      parentCategory.displayName
    ) {
      setDisableSaveButton(false);
    } else {
      setDisableSaveButton(true);
    }
  }, [categoryName, wallet, parentCategory]);

  useEffect(() => {
    if (categoryType) {
      setFilteredCategoriesList([
        {
          type: categoryType,
          data: categories[categoryType],
        },
      ]);
    }
    // let totalCategories = [];
    // Object.keys(categories).forEach((key) => {
    //   totalCategories.push({
    //     type: key,
    //     data: categories[key],
    //   });
    // });
    // setFilteredCategoriesList(totalCategories);
  }, [categoryType]);

  return (
    <>
      <DialogContent dividers>
        <Box className={classes.boxes}>
          <FormControl
            required
            variant="outlined"
            className={clsx(classes.selectFormControl, classes.inputControls)}
          >
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="Income"
              value={categoryType}
              onChange={handleCategoryChange}
            >
              <FormControlLabel
                value="Income"
                control={<Radio color="primary" />}
                label="Income"
              />
              <FormControlLabel
                value="Expense"
                control={<Radio color="primary" />}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className={classes.boxes}>
          {defaultIcons && categoryIcon && (
            <ButtonTextField
              className={classes.inputControls}
              DialogComponent={AddWalletIconModal}
              setFormFieldValue={setCategoryIcon}
              fieldValue={{
                img: categoryIcon.iconPath,
                altName: categoryIcon.iconName,
              }}
              dialogProps={{
                dialogTitle: "Select a Category Icon",
                showCloseButton: true,
                defaultIcons: defaultIcons,
                selectedIcon: categoryIcon,
              }}
            />
          )}
          <TextField
            label="Category Name"
            variant="outlined"
            required
            placeholder="Category Name"
            id="category-name"
            defaultValue={categoryName}
            className={classes.inputControls}
            onChange={handleCategoryNameInput}
          />
        </Box>
        <Box className={classes.boxes}>
          <DropdownTextField
            className={classes.inputControls}
            fieldLabel="Wallet"
            required
            setFormFieldValue={setWallet}
            fieldValue={wallet}
            DialogComponent={WalletListModal}
            AdornmentIconComponent={AdornmentIcon}
            DefaultAdornmentIcon={AccountBalanceWalletIcon}
            dialogProps={{
              dialogTitle: "Select a wallet",
              showCloseButton: true,
              wallet: wallet,
              wallets: wallets,
            }}
          />
          <DropdownTextField
            className={classes.inputControls}
            fieldLabel="Parent Category"
            required
            setFormFieldValue={setParentCategory}
            fieldValue={parentCategory}
            DialogComponent={CategoryListModal}
            AdornmentIconComponent={AdornmentIcon}
            DefaultAdornmentIcon={CategoryIcon}
            dialogProps={{
              dialogTitle: "Select Category",
              showCloseButton: true,
              parentCategory: parentCategory,
              categories: filteredCategoriesList,
              categoryType: categoryType,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions
        actionProps={actionProps}
        handleSave={handleSubmitCategoryForm}
      />
    </>
  );
};

const AddCategoryDialog = withDialog(AddCategoryForm);

export default AddCategoryDialog;

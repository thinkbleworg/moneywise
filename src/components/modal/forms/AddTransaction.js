import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

import withDialog from "../../dialog/withDialog";

const useFormStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const wallets = [
  {
    type: "basic",
    walletIcon: "",
    currency: {
      flag: "INR",
      symbol: "₹",
      name: "Indian Rupee",
      code: "INR",
    },
    openBalance: 0,
    enableNotification: false,
    excludeFromTotal: false,
    walletName: "Cash",
    categories: "global",
  },
  {
    type: "basic",
    icon: "",
    currency: {
      flag: "INR",
      symbol: "₹",
      name: "Indian Rupee",
      code: "INR",
    },
    openBalance: 0,
    enableNotification: false,
    excludeFromTotal: false,
    walletName: "HDFC",
    categories: "global",
  },
];

const AddTransactionForm = (props) => {
  const classes = useFormStyles();

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  return (
    <form className={classes.container}>
      <FormControl className={classes.formControl}>
        <Autocomplete
          id="combo-box-demo"
          options={wallets}
          getOptionLabel={(option) => option.walletName}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      </FormControl>
    </form>
  );
};

const AddTransactionDialog = withDialog(AddTransactionForm);

export default AddTransactionDialog;

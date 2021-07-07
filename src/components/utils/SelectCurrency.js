import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import CheckIcon from "@material-ui/icons/Check";

import ImageLoad from "./ImageLoad";

const useStyles = makeStyles((theme) => ({
  autoCompleteSelect: {
    flex: "1 0 auto",
    marginRight: "20px",
  },
  optionElement: {
    display: "flex",
    width: "100%",
  },
  flagOptionImg: {
    flex: "0 0 auto",
    width: "32px",
    height: "32px",
    margin: "8px 10px 8px 0px",
    display: "flex",
    alignItems: "center",
  },
  flagOptionContent: {
    flex: "2 0 auto",
    width: "calc(100% - 50px)",
    overflowX: "hidden",
  },
}));

const FLAG_IMAGE_CDN = "https://flagcdn.com/";

const FlagIcon = React.memo(({ option, classes }) => {
  return (
    <div className={classes.flagOptionImg}>
      <ImageLoad
        src={FLAG_IMAGE_CDN + "32x24/" + option.flagCode + ".png"}
        srcSet={
          FLAG_IMAGE_CDN +
          "64x48/" +
          option.flagCode +
          ".png 2x, " +
          FLAG_IMAGE_CDN +
          "96x72/" +
          option.flagCode +
          ".png 3x"
        }
        width="100%"
        alt={option.countryName}
      />
    </div>
  );
});

const FlagIconBase = ({ option, classes }) => (
  <div className={classes.flagOptionImg}>
    <ImageLoad src={option.flagBase64} width="100%" alt={option.countryName} />
  </div>
);

const RenderOption = ({ option, classes, selected }) => (
  <div className={classes.optionElement}>
    {/* <FlagIcon option={option} classes={classes} /> */}
    <div className={classes.flagOptionContent}>
      <Typography variant="body2" noWrap gutterBottom>
        {option.displayName}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {`${option.code} - ${option.symbol}`}
      </Typography>
    </div>
    <div>
      <CheckIcon style={{ visibility: selected ? "visible" : "hidden" }} />
    </div>
  </div>
);

const SelectCurrency = (props) => {
  const { countryCurrencies, currency, setCurrency } = props;
  const classes = useStyles();

  return (
    <Autocomplete
      options={countryCurrencies}
      value={currency}
      className={classes.autoCompleteSelect}
      onChange={(event, newValue) => {
        setCurrency(newValue);
      }}
      getOptionLabel={(option) => option.displayName || ""}
      getOptionSelected={(option, value) =>
        option.displayName === value.displayName
      }
      renderOption={(option, { selected }) => (
        <RenderOption option={option} classes={classes} selected={selected} />
      )}
      renderInput={(params) => {
        const selectedCurrency = countryCurrencies.find(
          ({ displayName }) => displayName === params.inputProps.value
        );
        return (
          <TextField
            {...params}
            label="Select currency"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
              startAdornment: selectedCurrency && (
                <InputAdornment position="start">
                  <FlagIcon option={selectedCurrency} classes={classes} />
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
};

//References:
// https://www.userbugreport.com/blog/mui-autocomplete-with-ngram/
// https://www.gitmemory.com/issue/mui-org/material-ui/18443/555265265
// https://stackoverflow.com/questions/62997374/react-form-hook-with-autocomplete-material-ui
// https://spectrum.chat/react-hook-form/help/how-to-connect-to-autocomplete-in-material-ui~e8c40a4a-fee0-4d0b-8651-44111f973d9c
// https://stackoverflow.com/questions/61947941/material-ui-autocomplete-warning-the-value-provided-to-autocomplete-is-invalid
// https://stackoverflow.com/questions/63361323/material-ui-autocomplete-unable-to-populate-nested-array-data-as-seperate-label
export default SelectCurrency;

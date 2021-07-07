import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

import withDialog from "../../dialog/withDialog";
import ImageLoad from "../../utils/ImageLoad";
import { getAllCurrencies, filterCurrency } from "../../../utils/currency";

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
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",

    "& li": {
      flex: "1 0 50%",
    },
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

const FLAG_IMAGE_CDN = "https://flagcdn.com/";

const FlagIcon = React.memo(({ option }) => {
  return (
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
      isLocal={false}
    />
  );
});

const FlagIconBase = ({ option }) => (
  <ImageLoad
    src={option.flagBase64}
    width="100%"
    alt={option.countryName}
    isLocal={false}
  />
);

const CurrencyModalContent = (props) => {
  const { handleSaveDialog, currency, DialogContent, dialogRendered } = props;
  const classes = useContentStyles();

  const countryCurrencies = getAllCurrencies();

  const [selected, setSelected] = useState(currency || {});

  const [countryList, setCountryList] = useState(countryCurrencies);

  const handleListItemClick = (event, option) => {
    setSelected(option);
    handleSaveDialog(option);
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    if (value.trim("").length) {
      let filteredValue = filterCurrency(countryList, value);
      setCountryList(filteredValue);
    } else {
      setCountryList(countryCurrencies);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <div>
          <TextField
            placeholder="Search"
            autoFocus={true}
            type="search"
            margin="dense"
            variant="outlined"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <FormControl className={classes.formControl}>
          <List component="nav" className={classes.gridRoot}>
            {countryList &&
              countryList.map((option) => (
                <ListItem
                  button
                  dense
                  key={option.id}
                  className={classes.listItem}
                  selected={selected.id === option.id}
                  onClick={(event) => handleListItemClick(event, option)}
                >
                  <ListItemIcon className={classes.flagOptionImg}>
                    <FlagIcon option={option} />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.flagOptionContent}
                    primary={option.displayName}
                    primaryTypographyProps={{
                      noWrap: true,
                    }}
                    inset
                    secondary={
                      <Typography variant="body2" gutterBottom>
                        {`${option.code} - ${option.symbol}`}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <CheckIcon
                      style={{
                        visibility:
                          selected.id === option.id ? "visible" : "hidden",
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </FormControl>
      </DialogContent>
    </>
  );
};

const AddCurrencyModal = withDialog(CurrencyModalContent);

export default AddCurrencyModal;

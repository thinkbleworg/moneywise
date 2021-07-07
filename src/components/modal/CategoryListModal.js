import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

import withDialog from "../dialog/withDialog";
import ImageLoad from "../utils/ImageLoad";

import { flatCategoriesFromTree } from "../../utils/category";

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
    // paddingTop: 0,
    // paddingBottom: 0,
  },
  nested: {
    paddingLeft: theme.spacing(6),

    "&::before": {
      content: "''",
      position: "absolute",
      borderLeftWidth: "1px",
      borderLeftStyle: "dashed",
      borderLeftColor: theme.palette.grey[500],
      width: "20px",
      height: "100%",
      top: 0,
      left: `calc(${theme.spacing(6)}px/2)`,
    },

    "&::after": {
      content: "''",
      position: "absolute",
      borderTopWidth: "1px",
      borderTopStyle: "dashed",
      borderTopColor: theme.palette.grey[500],
      width: "10px",
      height: "1px",
      top: "50%",
      transform: "translateY(-50%)",
      left: `calc(${theme.spacing(6)}px/2)`,
    },
  },
  nestedRoot: {
    "& .MuiListItem-container:last-of-type $nested::before": {
      height: "50%",
    },
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

const CategoryTabPanel = (props) => {
  const { children, value, index, currentActiveTab, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== currentActiveTab}
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
      {...other}
    >
      {value === currentActiveTab && <Box p={3}>{children}</Box>}
    </div>
  );
};

CategoryTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  currentActiveTab: PropTypes.any.isRequired,
};

const allyProps = (index) => {
  return {
    id: `category-tab-${index}`,
    "aria-controls": `category-tabpanel-${index}`,
  };
};

const CategoryListForm = (props) => {
  const {
    handleSaveDialog,
    parentCategory,
    DialogContent,
    dialogRendered,
    categories,
    categoryType,
  } = props;
  const classes = useContentStyles();

  const [selected, setSelected] = useState(parentCategory || {});
  const [tabValue, setTabValue] = useState("");
  const [categoriesList, setCategoriesList] = useState(
    JSON.parse(JSON.stringify(categories))
  );

  const handleTabChange = (event, newValue) => {
    // console.log("tabchange value----", newValue);
    setTabValue(newValue);
  };

  const handleListItemClick = (event, option) => {
    // console.log("option value----", option);
    setSelected(option);
    handleSaveDialog({
      ...option,
      displayName: option.primaryTitle,
    });
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let originalData = JSON.parse(JSON.stringify(categories));
    if (value.trim("").length) {
      // console.log("categories ----", originalData);
      let currentCategoriesList = originalData.find(
        (list) => list.type === tabValue
      ).data;
      let flatArray = flatCategoriesFromTree(currentCategoriesList);
      setCategoriesList([
        {
          type: tabValue,
          data: flatArray.filter(
            (item) =>
              item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
          ),
        },
      ]);
    } else {
      // console.log("categories ----", categories);
      setCategoriesList(originalData);
    }
  };

  useEffect(() => {
    setTabValue(categoriesList[0].type);
  }, []);

  const ListItemUI = (option, isChild, showDivider) => (
    <>
      <ListItem
        button
        dense
        key={option.id}
        className={clsx(classes.listItem, isChild && classes.nested)}
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
        />
        <ListItemSecondaryAction>
          <CheckIcon
            style={{
              visibility: selected.id === option.id ? "visible" : "hidden",
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {showDivider && <Divider />}
    </>
  );
  const renderListItem = (items, isChild) => {
    // console.log("renderListItem calling", items);
    return items.map((item, idx) => {
      // console.log("item name ---", item, isChild);
      if (!item.children || item.children.length === 0) {
        // console.log("item no children", item);
        let showDivider = !isChild || idx === items.length - 1;
        return (
          <React.Fragment key={`items-${item.id}`}>
            {ListItemUI(item, isChild, showDivider)}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={`items-${item.id}`}>
            {ListItemUI(item, isChild)}
            <List component="div" disablePadding className={classes.nestedRoot}>
              {renderListItem(item.children, true)}
            </List>
          </React.Fragment>
        );
      }
    });
  };

  return (
    <>
      <DialogContent dividers>
        <Box display="flex" justifyContent="center" marginBottom="20px">
          <TextField
            placeholder="Search within Category"
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
        </Box>
        <Divider />
        <FormControl className={classes.formControl}>
          {tabValue !== "" && (
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              {categoriesList.map((category, idx) => (
                <Tab
                  label={category.type}
                  key={category.type}
                  value={category.type}
                  {...allyProps(idx)}
                />
              ))}
            </Tabs>
          )}
          <Divider />
          {tabValue !== "" &&
            categoriesList &&
            categoriesList.map((category, idx) => (
              <CategoryTabPanel
                value={category.type}
                currentActiveTab={tabValue}
                index={idx}
                key={`tabpanel-${idx}`}
              >
                <List component="div" className={classes.gridRoot}>
                  {renderListItem(category.data)}
                </List>
              </CategoryTabPanel>
            ))}
        </FormControl>
      </DialogContent>
    </>
  );
};

const CategoryListModal = withDialog(CategoryListForm);

export default CategoryListModal;

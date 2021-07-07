import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";

import ImageLoad from "../utils/ImageLoad";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "inherit",
    // backgroundColor: theme.palette.background.paper,
    maxHeight: "500px",
  },
  listSection: {
    backgroundColor: "inherit",
    listStyle: "none",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
    listStyle: "none",
    margin: 0,
  },
  listSubHeader: {
    backgroundColor: theme.palette.grey[100],
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

    "& ~ $nested:last-of-type::before": {
      height: "50%",
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
  grayScale: {
    filter: "grayScale(100%)",
  },
}));

const ListCard = React.memo((props) => {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const [selected, setSelected] = useState();

  // console.log("listcard component");

  const handleClick = (event, item) => {
    // console.log("item ---", item);
    setSelected(item);
    let computeOpenItem = (item) => {
      if (open && open.id) {
        if (open.children.length > 0) {
          if (open.children.some((child) => child.id === item.id)) {
            return null;
          } else {
            return item;
          }
        } else if (open.id === item.id) {
          return null;
        } else {
          return item;
        }
      } else {
        return item;
      }
    };
    if (
      item.children &&
      item.children.length &&
      computeOpenItem(item) !== null
    ) {
      // console.log("setopne");
      setOpen(item);
    }
  };

  const computedSelected = (selected, item) => {
    if (item.categoryType) {
      // Categories
      return (
        selected &&
        selected.id === item.id &&
        selected.categoryType === item.categoryType
      );
    } else {
      return selected && selected.id === item.id;
    }
  };

  const listItemUI = (item, hasChildren, isChild, showDivider) => (
    <>
      <ListItem
        button
        key={item.id}
        className={clsx(isChild && classes.nested)}
        onClick={(e) => handleClick(e, item)}
        selected={computedSelected(selected, item)}
      >
        <ListItemAvatar>
          <Avatar>
            <ImageLoad
              src={item.icon.src}
              width="100%"
              alt={item.icon.alt}
              className={clsx(item.icon.grayScale && classes.grayScale)}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.primaryTitle}
          secondary={item.secondaryTitle ? item.secondaryTitle : null}
        />
        {item.secondaryAction && (
          <ListItemSecondaryAction>
            {item.secondaryAction}
          </ListItemSecondaryAction>
        )}
        {hasChildren &&
          (open && open.id === item.id ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {showDivider && <Divider />}
    </>
  );

  const renderListItem = (listItems, isChild) => {
    // console.log("renderListItem calling", listItems);
    return listItems.map((item, idx) => {
      // console.log("item name ---", item);
      // item.id = item.categoryType ? item.categoryType + "-" + item.id : item.id;
      if (!item.children || item.children.length === 0) {
        // console.log("item no children", item);
        let showDivider = !isChild;
        return (
          <React.Fragment key={`items-${item.id}`}>
            {/* {idx !== 0 && !isChild && <Divider />} */}
            {listItemUI(item, false, isChild, showDivider)}
          </React.Fragment>
        );
      } else {
        // setHasChildren(true);
        // console.log("item with children ----", item.children);
        return (
          <React.Fragment key={`items-${item.id}`}>
            {listItemUI(item, true, isChild)}
            <Collapse
              key={`collapse-${item.id}`}
              in={open && open.id === item.id}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                className={classes.nestedRoot}
              >
                {renderListItem(item.children, true)}
              </List>
            </Collapse>
            <Divider />
          </React.Fragment>
        );
      }
    });
  };

  return (
    <List component="div" subheader={<li />} className={classes.root}>
      {props.items.map((item, idx) => (
        <li key={`section-${idx}`} className={classes.listSection}>
          <ul className={classes.ul}>
            {item.title && (
              <ListSubheader className={classes.listSubHeader}>
                <b>{item.title}</b>
              </ListSubheader>
            )}
            {renderListItem(item.data)}
          </ul>
        </li>
      ))}
    </List>
  );
});

export default ListCard;

// A List contains a header, and children
// Children can be present with icons, nested tree, labels, sublabels, and actions
// Nested tree can be expanded and shrinked dynamically

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListCard from "../../components/card/ListCard";

import { groupCategoriesToTree } from "../../utils/category";

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

const Category = () => {
  const classes = useStyles();
  const categories = groupCategoriesToTree();
  const categoriesMap = Object.keys(categories).map((c) => {
    return {
      title: c,
      data: categories[c],
    };
  });

  // console.log("categoriesMap ----", categoriesMap);

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
          <ListCard items={categoriesMap} />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Category;

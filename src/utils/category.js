import globalCategories from "../constants/globalCategories.json";
import { getSelectedIconFromAliasName } from "./iconMap";

// https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript

const categoriesToListConversion = (type) => {
  let categories = type || globalCategories;
  var rootObj = {};
  for (let type of Object.keys(categories)) {
    const categoryType = type;
    let list = categories[categoryType];
    let listObj = list.map((l, idx) => {
      let iconMap = getSelectedIconFromAliasName(l.icon.name);
      return {
        ...l,
        id: l.id,
        categoryType: categoryType,
        icon: {
          src: iconMap ? iconMap.iconPath : null,
          alt: iconMap ? iconMap.aliasName : null,
        },
        primaryTitle: l.name,
      };
    });
    rootObj[type] = listObj;
  }
  return rootObj;
};

export const groupCategoriesToTree = (type) => {
  let categories = categoriesToListConversion(type);
  var rootObj = {};

  for (let type of Object.keys(categories)) {
    var map = {},
      node,
      roots = [],
      i;

    let list = categories[type];

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    rootObj[type] = roots;
  }
  //console.log("categories to tree --->", rootObj);
  return rootObj;
};

export const flatCategoriesFromTree = (categories) => {
  const flatten = (arr, flatTree) => {
    return arr.reduce((acc, cur) => {
      if (Array.isArray(cur.children) && cur.children.length) {
        let children = [...cur.children];
        cur.children = [];
        acc = [...acc, cur];
        return flatten(children, acc);
      } else {
        acc = [...acc, cur];
        return acc;
      }
    }, flatTree);
  };

  let flatTree = flatten(categories, []);
  return flatTree;
};

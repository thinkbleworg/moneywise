import iconData from "../constants/defaultIconMapper.json";

export const getDefaultIcons = () => {
  return iconData.map((item) => {
    item.iconPath = `${item.iconPath}`;
    return item;
  });
};

export const getSelectedIconFromDefault = (name) => {
  let allIcons = getDefaultIcons();
  return allIcons.filter((icon) => name === icon.iconName);
};

export const getSelectedIconFromAliasName = (name) => {
  let allIcons = getDefaultIcons();
  return allIcons.find((icon) => name === icon.aliasName);
};

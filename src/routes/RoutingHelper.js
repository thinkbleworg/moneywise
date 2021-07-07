import { Routes } from "./Routing";

const homeRoutes = Routes.filter(
  (r) => r.name === "Home" || r.name === "Transactions"
);

export const currentRoute = (path) => {
  return Routes.find((r) => r.path === path);
};

export const isHomeRoute = (path) => {
  return homeRoutes.some((r) => r.path === path);
};

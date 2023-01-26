import { Route, useRoutes } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NotFound from "@/pages/NotFound/NotFound";
import Welcome from "@/pages/Welcome/Welcome";


export const POSSIBLE_ROUTES = {
  HOMEPAGE: "HOMEPAGE",
  NOTFOUND: "NOTFOUND",
};

export const routes = {

  [POSSIBLE_ROUTES.HOMEPAGE]: {
    element: <Welcome/>,
    path: "/",
  },
  [POSSIBLE_ROUTES.NOTFOUND]: {
    element: <NotFound/>,
    path: "*",
  },
};


function Pages() {

  const generated_routes = useRoutes(Object.values(routes));
  return generated_routes;
}

export default Pages;

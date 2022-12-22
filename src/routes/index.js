import HomeIcon from "@mui/icons-material/Home";
import NotFound from "@/pages/NotFound/NotFound";
import Welcome from "@/pages/Welcome/Welcome";

const Pages = {
  HOMEPAGE: "HOMEPAGE",
  NOTFOUND: "NOTFOUND",
};

const routes = {
  [Pages.HOMEPAGE]: {
    component: Welcome,
    path: "/",
    title: "Welcome",
    icon: HomeIcon,
  },
  [Pages.NOTFOUND]: {
    component: NotFound,
    path: "*",
  },
};

export default routes;

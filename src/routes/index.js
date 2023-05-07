import CreateNewPost from "../pages/CreateNewPost";
import Home from "../pages/Home";
import Post from "../pages/Post";
import SummaryPage from "../pages/SummaryPage";

const routes = [
  {
    url: "/",
    component: <Home />,
  },
  {
    url: "/CreateNewPost",
    component: <CreateNewPost />,
  },
  {
    url: "/post",
    component: <Post />,
  },
  {
    url: "/summary",
    component: <SummaryPage />,
  },
];

export default routes;

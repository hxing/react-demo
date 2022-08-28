import Login from "../pages/login/login";
import Main from "../pages/main";
import Home from "../pages/home/home";
import Page1 from "../pages/page1/page1";
import Page2 from "../pages/page2/page2";

export const routes = [
    {path: "/login", element: <Login/>},
    {
        path: "/", element: <Main/>,
        children: [
            {index: true, element: <Home/>},
            {path: "home", element: <Home/>},
            {path: "page1", element: <Page1/>},
            {path: "page2", element: <Page2/>},
            {path: "*", element: <h1 style={{color: "red"}}>Bad Link</h1>}
        ]
    }
];

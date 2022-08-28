import {useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {useRoutes} from "react-router-dom";
import {useRequest} from "ahooks";

import {routes} from "./config/route-config";
import {apiGetUser, initAxios} from "./api/api";
import {setUserName} from "./redux/userSlice";
import "./app.less";

const App = () => {
    const dispatch = useDispatch();
    const {runAsync} = useRequest(apiGetUser, {manual: true});

    useLayoutEffect(() => {
        initAxios(dispatch);
        runAsync().then(response => {
            response.status === 200 && dispatch(setUserName({userName: response.data?.data?.name ?? "", version:response.data?.data?.version ?? ""}));
        });
    }, []);

    return useRoutes(routes);
};

export default App;

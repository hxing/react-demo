import {useDispatch, useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button, Menu, Modal} from "antd";
import {useLayoutEffect, useState} from "react";
import {useRequest} from "ahooks";
import {AlertOutlined, DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

import {apiLogout} from "../api/api";
import {setUserName} from "../redux/userSlice";
import styles from "./main.module.scss";

const {confirm} = Modal;

const Main = () => {
    const items = [
        {label: "首页", key: "home", icon: <DashboardOutlined/>},
        {
            label: "其他页面", key: "fault", icon: <AlertOutlined/>, children: [
                {label: "页面1", key: "page1"},
                {label: "页面2", key: "page2"}
            ]
        }
    ];
    const [collapsed, setCollapsed] = useState(false);
    const {userName} = useSelector(state => state.user);
    const [detect, setDetect] = useState(false);
    const {loading, runAsync} = useRequest(apiLogout, {manual: true});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname: from} = useLocation();

    useLayoutEffect(() => {
        if (userName === "" || userName == null) {
            detect ? confirm({
                content: "是否退出？",
                onOk: () => {
                    navigate("/login", {state: {from}});
                }
            }) : navigate("/login", {state: {from}});
        } else {
            setDetect(true);
        }
    }, [userName]);


    const handleClick = () => {
        confirm({
            content: "是否退出？",
            onOk: () => {
                setDetect(false);
                runAsync().then(() => {
                    dispatch(setUserName(""));
                    navigate("/login");
                });
            }
        });
    };

    const handleMenuClick = ({key}) => {
        // 没有子节点的情况下收缩其他已展开节点
        if (items.find(item => (key === item.key) && (!item.hasOwnProperty("children") || (item.children.length === 0)))) setOpenKeys([]);
        navigate("/" + key);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <Button type="primary" onClick={toggleCollapsed}>
                    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
                <h1>Demo</h1>
                <div className={styles.header_space}/>
                <span>{`用户名: ${userName}`}</span>
                <Button className={styles.header_exit} type="primary" loading={loading}
                        onClick={handleClick}>退出</Button>
            </header>
            <section className={styles.content}>
                <aside className={styles.aside}>
                    <Menu
                        mode="inline"
                        onClick={handleMenuClick} className={styles.menu}
                        defaultSelectedKeys={[from.replace("/", "")]}
                        inlineCollapsed={collapsed}
                        items={items}
                    />
                </aside>
                <main className={styles.main}>
                    {<Outlet/>}
                </main>
            </section>
            <footer className={styles.footer}>
                <div>{`@Copyright by Ethen, ${new Date().getFullYear()}`}</div>
                <div>TTTTTTTT</div>
            </footer>
        </section>
    );
};

export default Main;

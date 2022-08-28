import {useEffect, useState} from "react";
import {Button, Input, message} from "antd";
import {useRequest} from "ahooks";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {apiLogin} from "../../api/api";
import {setUserName} from "../../redux/userSlice";
import styles from "./login.module.scss";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Login = () => {
    const {userName} = useSelector(state => state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {loading, runAsync} = useRequest(apiLogin, {manual: true});
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
            userName?.length > 0 && navigate(location.state?.from ?? "/home", {replace: true});
        }, [userName]
    );

    const handleClick = () => {
        if (!(username || password)) {
            message.error("用户名密码不能为空！").then();
            return;
        }
        runAsync({username, password}).then((response) => {
            if (response.status !== "ok") {
                message.error("登录失败").then();
                return;
            }

            dispatch(setUserName({userName: response.currentAuthority, version: response.version}));
            navigate(location.state?.from ?? "/home", {replace: true});
        });
    }

    const currentYear = new Date().getFullYear();
    const handleUsernameChange = e => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };
    return (
        <section className={styles.layout}>
            <header className={styles.layout_header}>
                <span className={styles.header1}>AAA</span>
                <span>BBB</span>
            </header>
            <main className={styles.layout_content}>
                <div className={styles.login}>
                    <Input className={styles.username} prefix={<UserOutlined/>}
                           placeholder={"用户名"}
                           value={username} onChange={handleUsernameChange}/>
                    <Input.Password className={styles.password} prefix={<LockOutlined/>}
                                    placeholder={"密码"}
                                    value={password} onChange={handlePasswordChange}/>
                    <Button type="primary" className={styles.loginBtn} loading={loading}
                            onClick={handleClick}>登录</Button>
                </div>
            </main>
            <footer className={styles.layout_footer}>
                <div className={styles.logo}/>
                <a href="https://www.ebai.com" target="_blank">{`@${currentYear} ebai`}</a>
            </footer>
        </section>
    );
};

export default Login;

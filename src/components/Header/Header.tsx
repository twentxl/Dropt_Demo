import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import logo from "../../../public/logo.svg";
import logo_black from "../../../public/logo_black.svg";
import Button from "../ui/Button/Button";

interface HeaderProps {

    children?: React.ReactNode;
}
export const HeaderWorkspace: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className={`${style.header} ${style.headerWorkspace}`}>
            <div className={style.container} style={{ padding: "5px 20px" }}>
                <div className={style.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                {children}
            </div>
        </header>
    )
};

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={style.header}>
            <div className={`${style.container} container`}>
                <div className={style.logo}>
                    <img src={logo_black} alt="logo"/>
                </div>
                <ul className={style.headerList}>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Documentation</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                    <li>
                        <Button text="Try Dropt" type="warning" onClick={() => navigate("workspace")} />
                    </li>
                </ul>
            </div>
        </header>
    )
};

export default Header;
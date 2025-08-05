import React from "react";
import style from "./Header.module.css";
import logo from "../../../public/logo.svg";

interface HeaderProps {
    children?: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                {children}
            </div>
        </header>
    )
};

export default Header;
import React from 'react';
import style from "./Sidebar.module.css";

interface SidebarProps {
    title?: string;
    children: React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children, title }) => {
    return (
        <div className={style.sidebar}>
            <h2 style={{ marginBottom: "20px" }}>{title}</h2>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
};

export default Sidebar;
import React from 'react';
import style from "./ToolsItem.module.css";

interface ToolsItemProps {
    icon: string;
    text: string;
    onClick?: () => void;
}
const ToolsItem: React.FC<ToolsItemProps> = ({ icon, text, onClick }) => {
    return (
        <div className={style.toolsItem} onClick={onClick}>
            <img src={icon} alt="text" />
            <span style={{ marginTop: "5px", fontSize: "14px" }}>{text}</span>
        </div>
    )
};

export default ToolsItem;
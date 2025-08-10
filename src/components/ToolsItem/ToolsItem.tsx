import React from 'react';
import style from "./ToolsItem.module.css";

interface ToolsItemProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    onClick?: () => void;
}
const ToolsItem: React.FC<ToolsItemProps> = ({ icon: Icon, text, onClick }) => {
    return (
        <div className={style.toolsItem} onClick={onClick}>
            <Icon width={30} height={30} style={{ fill: '#fff' }}/>
            <span style={{ marginTop: "5px", fontSize: "14px" }}>{text}</span>
        </div>
    )
};

export default ToolsItem;
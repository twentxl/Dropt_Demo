import React, { useState, useRef, useEffect } from 'react';
import style from "./Workspace.module.css";
import Header from '../Header/Header';
import Button from '../ui/Button/Button';
import { IoSaveSharp, IoShareSharp} from "react-icons/io5";
import Sidebar from '../Sidebar/Sidebar';
import ToolsItem from '../ToolsItem/ToolsItem';
import Element from '../Element/Element';
import { GetCode } from '../../helper/helper';

import tableIcon from "../Toolbar_Icons/tableIcon.svg";
import chairIcon from "../Toolbar_Icons/chairIcon.svg";

import defaultCursor from '../../../public/cursor.svg';

interface ElementData {
  name: string;
  icon: any;
  color: string;
}
const Workspace = () => {
    const workspaceRef = useRef<HTMLDivElement>(null);

    const [elementsData, setElementsData] = useState<ElementData[]>([]);
    const [selectedElementName, setSelectedElementName] = useState<string | null>(null);
    const [elementName, setElementName] = useState<string | null>(null);
    const [elementPosition, setElementPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [elementColor, setElementColor] = useState<string>("#000000");

    const addElement = (name: string, icon: string) => {
        name = name + "=" + GetCode(8);
        const newElementData: ElementData = {
            name,
            icon,
            color: elementColor,
        };
        setElementsData((prev) => [...prev, newElementData]);
    };

    let scale = 1;
    const minScale = 0.5;
    const maxScale = 2;
    const handleWheel = (e: WheelEvent) => {
        if(e.ctrlKey) {
            e.preventDefault();

            const delta = e.deltaY;
            const step = 0.5;

            if(delta < 0) { scale = Math.min(maxScale, scale + step); }
            else { scale = Math.max(minScale, scale - step); }

            if(workspaceRef.current) { workspaceRef.current.style.transform = `scale(${scale})`; }
        }
    };

    const handleElementSelect = (name: string, position: { x: number; y: number }, color: string) => {
        setElementName(name);
        setElementPosition(position);
        setElementColor(color);
        setSelectedElementName(name);
    };
    const handleElementMove = (position: { x: number; y: number }) => {
        setElementPosition(prev => ({
            x: prev.x + position.x,
            y: prev.y + position.y,
        }));
    };

    const setNull = () => {
        setSelectedElementName(null);
        setElementName(null);
        setElementPosition({ x: 0, y: 0 });
        setSelectedElementName(null);
    };

    useEffect(() => {
        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel]);

    return (
        <>
        <div className={style.toolBar}>
            <div className={style.toolBar__content}>
                <div id="defaultCursor" className={style.cursor}>
                    <img src={defaultCursor} alt="defaultCursor" />
                </div>
            </div>
        </div>

        <Header>
            <div className="workspaceTitle">Untitled name</div>
            <ul className={style.headerList}>
                <li>
                    <Button text="Save" type="primary" icon={IoSaveSharp} />
                </li>
                <li>
                    <Button text="Export" type="warning" icon={IoShareSharp} />
                </li>
            </ul>
        </Header>

        <div className={style.content}>
            <div className={`${style.sidebar} ${style.toolsSidebar}`}>
                <Sidebar title="Tools">
                    <div className={style.toolsContent}>
                        <ToolsItem text="Table" icon={tableIcon}  onClick={() => addElement("Table", tableIcon)}/>
                        <ToolsItem text="Chair" icon={chairIcon} onClick={() => addElement("Chair", chairIcon)} />
                    </div>
                </Sidebar>
            </div>

            <div className={style.workspace} 
                ref={workspaceRef}
                onClick={(e: any) => { if (e.target === e.currentTarget || e.target.classList.contains(style.editor)) { setNull() } }}>
                <div className={style.editor}>
                    {elementsData.map((el) => (
                        <Element
                            icon={el.icon}
                            name={el.name}
                            color={el.color}
                            isSelected={selectedElementName === el.name}
                            onSelect={handleElementSelect}
                            onMove={handleElementMove}
                        />
                    ))}
                </div>
            </div>

            <div className={`${style.sidebar} ${style.propertiesSidebar}`}>
                <Sidebar title="Properties">
                    <div className={style.propertyItem}>
                        Name: <span>{elementName?.substring(0, elementName.indexOf("=")) || '—'}</span>
                    </div>
                    <div className={style.propertyItem}>
                        Position X: <span>{elementPosition.x}</span>
                    </div>
                    <div className={style.propertyItem}>
                        Position Y: <span>{elementPosition.y}</span>
                    </div>
                    <div className={style.propertyItem}>
                        Color: {elementColor}
                    </div>
                </Sidebar>
            </div>
        </div>
        </>
    )
};

export default Workspace;
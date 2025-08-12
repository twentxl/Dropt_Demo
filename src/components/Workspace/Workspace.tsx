import React, { useState, useRef, useEffect } from 'react';
import style from "./Workspace.module.css";
import Header from '../Header/Header';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import ContextMenu, { ContextMenuItem } from '../ui/ContextMenu/ContextMenu';
import { IoSaveSharp, IoShareSharp, IoTrash} from "react-icons/io5";
import Sidebar from '../Sidebar/Sidebar';
import ToolsItem from '../ToolsItem/ToolsItem';
import Element, { TextElement } from '../Element/Element';
import { GetCode } from '../../helper/helper';

import TableIcon from "../Toolbar_Icons/tableIcon.svg?react";
import ChairIcon from "../Toolbar_Icons/chairIcon.svg?react";

import defaultCursor from '../../../public/cursor.svg';
import textElementIcon from '../Toolbar_Icons/textElement.png';

interface ElementData {
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
  color: string;
}
const Workspace = () => {
    const workspaceRef = useRef<HTMLDivElement>(null);

    const [elementsData, setElementsData] = useState<ElementData[]>([]);
    const [selectedElementName, setSelectedElementName] = useState<string | null>(null);
    const [elementName, setElementName] = useState<string | null>(null);
    const [elementPosition, setElementPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [elementColor, setElementColor] = useState<string>("");
    const [elementSize, setElementSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    const addTextElement = (name: string) => {
        name = name + "=" + GetCode(8);
        const newElementData: ElementData = {
            name,
            color: "#000000",
        };
        setElementsData((prev) => [...prev, newElementData]);
    };
    const addElement = (name: string, icon?: any) => {
        name = name + "=" + GetCode(8);
        const newElementData: ElementData = {
            name,
            icon,
            color: "#000000",
        };
        setElementsData((prev) => [...prev, newElementData]);
    };
    const deleteElement = () => {
        if (!selectedElementName) return;
        setElementsData(prev => prev.filter(element => element.name !== selectedElementName));
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

    const handleTextElementSelect = (name: string, position: { x: number; y: number }, color: string) => {
        setElementName(name);
        setElementPosition(position);
        setElementColor(color);
        setSelectedElementName(name);
    };
    const handleElementSelect = (name: string, position: { x: number; y: number }, color: string, size: { width: number, height: number }) => {
        setElementName(name);
        setElementPosition(position);
        setElementColor(color);
        setSelectedElementName(name);
        setElementSize(size)
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

    const setColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newColor = e.target.value;
        setElementColor(newColor);

        setElementsData((prev) =>
            prev.map((el) =>
            el.name === selectedElementName ? { ...el, color: newColor } : el
            )
        );
    };

    return (
        <>
        <ContextMenu area={workspaceRef}>
            <ContextMenuItem text="Remove element" icon={IoTrash} onClick={deleteElement}/>
        </ContextMenu>
        <div className={style.toolBar}>
            <div className={style.toolBar__content}>
                <div id="defaultCursor" className={`${style.toolBar__element} ${style.active}`}>
                    <img src={defaultCursor} alt="defaultCursor" />
                </div>
                <div id="addTextElement" className={style.toolBar__element}>
                    <img src={textElementIcon} alt="defaultCursor" style={{ filter: 'invert(1)' }} onClick={() => addTextElement("Text")}/>
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
                        <ToolsItem text="Table" icon={TableIcon}  onClick={() => addElement("Table", TableIcon)}/>
                        <ToolsItem text="Chair" icon={ChairIcon} onClick={() => addElement("Chair", ChairIcon)} />
                    </div>
                </Sidebar>
            </div>

            <div className={style.workspace} 
                ref={workspaceRef}
                onClick={(e: any) => { if (e.target === e.currentTarget || e.target.classList.contains(style.editor)) { setNull() } }}>
                <div className={style.editor}>
                    {elementsData.map((el) => (
                        !el.icon ? (
                            <TextElement name={"TextTest"} 
                                color={"#000000"}
                                isSelected={selectedElementName === "TextTest"}
                                onSelect={handleTextElementSelect}
                                onMove={handleElementMove}/>
                        ) : (
                            <Element
                                icon={el.icon}
                                name={el.name}
                                color={el.color}
                                isSelected={selectedElementName === el.name}
                                onSelect={handleElementSelect}
                                onMove={handleElementMove}
                            />
                        )
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
                        Width: <span>{elementSize.width}</span>
                    </div>
                    <div className={style.propertyItem}>
                        Height: <span>{elementSize.height}</span>
                    </div>
                    <div className={style.propertyItem}>
                        Color: <span><Input value={elementColor} onChange={setColor} /></span>
                    </div>
                </Sidebar>
            </div>
        </div>
        </>
    )
};

export default Workspace;
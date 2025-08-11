import React, { useState, useEffect, useCallback, useRef } from 'react';
import style from './ContextMenu.module.css';

interface ContextMenuItemProps {
    text: string;
    icon: React.ElementType<{ size: number }>;
    onClick?: () => void;
}
export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ text, icon, onClick }) => {
    return (
        <li onClick={onClick}>
            <div style={{ marginRight: '5px' }}>{React.createElement(icon, { size: 14 })}</div>
            {text}
        </li>
    )
}

interface ContextMenuProps {
    children: React.ReactNode;
    area?: React.RefObject<HTMLElement | null>;
}
const ContextMenu: React.FC<ContextMenuProps> = ({ children, area }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const blockRef = useRef<HTMLDivElement | null>(null);

    const contextMenuShow = useCallback((event: MouseEvent) => {
        event.preventDefault();

        const cursorX = event.clientX;
        const cursorY = event.clientY;

        setPosition({ x: cursorX, y: cursorY });
        setVisible(true);
    }, []);

    const contextMenuHide = useCallback(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        const element = area && area.current ? area.current : document;

        element.addEventListener('contextmenu', contextMenuShow as EventListener);
        document.addEventListener('click', contextMenuHide);

        return () => {
        element.removeEventListener('contextmenu', contextMenuShow as EventListener);
        document.removeEventListener('click', contextMenuHide);
        };
    }, [contextMenuShow, contextMenuHide, area, children])

    return (
        <>
        {visible && (
            <div
          className={style.contextMenu}
          style={{ top: position.y, left: position.x }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          ref={blockRef}
        >
            <ul className={style.contextMenu}>
                {children}
            </ul>
        </div>
        )}
        </>
    )
}

export default ContextMenu;
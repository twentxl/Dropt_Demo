import React, { useState, useEffect, useRef } from 'react';
import style from './Element.module.css';

interface TextElementProps {
    name: string;
    isSelected: boolean;
    color: string;
    onSelect: (name: string, position: { x: number; y: number }, color: string) => void;
    onMove: (position: { x: number; y: number }) => void;
}

export const TextElement: React.FC<TextElementProps> = ({ name, isSelected, color, onSelect, onMove }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const lastX = useRef<number | null>(null);
    const lastY = useRef<number | null>(null);
    const isDragging = useRef(false);
    const isResizing = useRef(false);

    const [elementMove, setElementMove] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [text, setText] = useState<string>('Text');

    const elementClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const position = { x: Math.round(rect.left), y: Math.round(rect.top) };
            onSelect(name, position, color);
        }
    };

    const mouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!isSelected) return;
        e.preventDefault();
        isDragging.current = true;
        lastX.current = e.clientX;
        lastY.current = e.clientY;
    };
    const mouseUp = () => {
        isDragging.current = false;
        isResizing.current = false;
        lastX.current = null;
        lastY.current = null;
    };
    const mouseMove = (e: MouseEvent) => {
        if (isResizing.current && lastX.current !== null && lastY.current !== null) {
            lastX.current = e.clientX;
            lastY.current = e.clientY;
        } else if (isDragging.current && lastX.current !== null && lastY.current !== null) {
            const deltaX = e.clientX - lastX.current;
            const deltaY = e.clientY - lastY.current;

            setElementMove((prev) => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY,
            }));

            onMove({ x: elementMove.x + deltaX, y: elementMove.y + deltaY });

            lastX.current = e.clientX;
            lastY.current = e.clientY;
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [isSelected, elementMove, onMove]);

    useEffect(() => {
        if (elementRef.current && isSelected) {
            const rect = elementRef.current.getBoundingClientRect();
            const position = { x: Math.round(rect.left), y: Math.round(rect.top) };
            onSelect(name, position, color);
        }
    }, [isSelected, color, elementMove]);

    return (
        <div
            ref={elementRef}
            id={`element?${name}`}
            onClick={elementClick}
            onMouseDown={isSelected ? mouseDown : undefined}
            className={style.textElementWrapper}
            style={{
                position: 'absolute',
                left: `${elementMove.x}px`,
                top: `${elementMove.y}px`,
                border: isSelected ? '2px solid #ff7700' : '2px solid transparent',
                borderRadius: '4px',
                cursor: 'move',
                overflow: 'visible',
            }}
        >
            <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={handleTextChange}
                className={style.textElement}
                style={{
                    width: '100%',
                    height: '100%',
                    fontSize: '14px',
                    color: color,
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '0 6px',
                    boxSizing: 'border-box',
                }}
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

interface ElementProps {
    icon: React.ElementType;
    name: string;
    isSelected: boolean;
    color: string;
    onSelect: (name: string, position: { x: number; y: number }, color: string, size: { width: number; height: number }) => void;
    onMove: (position: { x: number; y: number }) => void;
    onResize?: (size: { width: number; height: number }) => void;
}
const Element: React.FC<ElementProps> = ({ icon: Icon, name, isSelected, color, onSelect, onMove, onResize }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const lastX = useRef<number | null>(null);
    const lastY = useRef<number | null>(null);
    const isDragging = useRef(false);
    const isResizing = useRef(false);

    const [elementMove, setElementMove] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [elementSize, setElementSize] = useState<{ width: number; height: number }>({ width: 50, height: 50 });
    const [elementColor] = useState<string>("#000000");

    const elementClick = () => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const position = { x: Math.round(rect.left), y: Math.round(rect.top) };
            const size = { width: elementSize.width, height: elementSize.height }
            onSelect(name, position, elementColor, size);
        }
    };

    const mouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!isSelected) return; 
        e.preventDefault();
        isDragging.current = true;
        lastX.current = e.clientX;
        lastY.current = e.clientY;
    }
    const mouseUp = () => {
        isDragging.current = false;
        lastX.current = null;
        lastY.current = null;
    }
    const mouseMove = (e: MouseEvent) => {
        if (isResizing.current && lastX.current !== null && lastY.current !== null) {
            const deltaX = e.clientX - lastX.current;
            const deltaY = e.clientY - lastY.current;

            const newWidth = Math.max(50, elementSize.width + deltaX);
            const newHeight = Math.max(50, elementSize.height + deltaY);

            setElementSize({ width: newWidth, height: newHeight });
            if (onResize) { onResize({ width: newWidth, height: newHeight }); }

            lastX.current = e.clientX;
            lastY.current = e.clientY;
        } else if (isDragging.current && lastX.current !== null && lastY.current !== null) {
            const deltaX = e.clientX - lastX.current;
            const deltaY = e.clientY - lastY.current;

            setElementMove((prev) => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY,
            }));

            onMove({ x: elementMove.x + deltaX, y: elementMove.y + deltaY });

            lastX.current = e.clientX;
            lastY.current = e.clientY;
        }
    };

    //Resize code begin
    const handleResizeStart = (
    e: React.MouseEvent<HTMLDivElement>,
    corner: 'nw' | 'ne' | 'sw' | 'se'
    ) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = elementSize.width;
    const initialHeight = elementSize.height;
    const initialX = elementMove.x;
    const initialY = elementMove.y;

    const handleResize = (moveEvent: MouseEvent) => {
        if (!isResizing.current) return;

        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        let newWidth = initialWidth;
        let newHeight = initialHeight;
        let newLeft = initialX;
        let newTop = initialY;

        if (corner === 'se') {
            newWidth = Math.max(20, initialWidth + deltaX);
            newHeight = Math.max(20, initialHeight + deltaY);
        } else if (corner === 'sw') {
            newWidth = Math.max(20, initialWidth - deltaX);
            newLeft = initialX + deltaX;
        } else if (corner === 'ne') {
            newHeight = Math.max(20, initialHeight - deltaY);
            newTop = initialY + deltaY;
        } else if (corner === 'nw') {
            newWidth = Math.max(20, initialWidth - deltaX);
            newHeight = Math.max(20, initialHeight - deltaY);
            newLeft = initialX + deltaX;
            newTop = initialY + deltaY;
        }

        setElementSize({ width: newWidth, height: newHeight });
        setElementMove({ x: newLeft, y: newTop });

        if (onResize) onResize({ width: newWidth, height: newHeight });
    };

    const stopResize = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
        };

        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
    };
    const getResizeHandleStyle = (corner: 'nw' | 'ne' | 'sw' | 'se'): React.CSSProperties => {
        const base: React.CSSProperties = {
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: '#ff7700',
            border: '1px solid white',
            borderRadius: '3px',
            cursor: `${corner}-resize`,
            zIndex: 10,
        };

        switch (corner) {
            case 'nw': return { ...base, top: -5, left: -5 };
            case 'ne': return { ...base, top: -5, right: -5 };
            case 'sw': return { ...base, bottom: -5, left: -5 };
            case 'se': return { ...base, bottom: -5, right: -5 };
        }
    };
    //Resize code end

    useEffect(() => {
        let element = elementRef.current; 
        if(element) { element.classList.toggle("iconIsActive", isSelected); }

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [isSelected, elementSize, elementMove, onResize, onMove]);

    return (
        <div id={`element?${name}`}
            ref={elementRef}
            onClick={elementClick}
            onMouseDown={isSelected ? mouseDown : undefined} 
            onMouseUp={isSelected ? mouseUp : undefined} 
            className={isSelected ? "iconIsActive" : ""}
            style={{ borderRadius: '5px', border: '2px solid transparent', 
                    width: `${elementSize.width}px`, height: `${elementSize.height}px`, 
                    position: 'relative', left:`${elementMove.x}px`, top: `${elementMove.y}px`
                    }}>
            <Icon aria-label={name} style={{  width: '100%',
                            height: '100%',
                            fill: color,
                            display: 'block',
                            margin: 'auto',
                            paddingTop: '10%'}}/>

            {isSelected && (
                <>
                    {(['nw', 'ne', 'sw', 'se'] as const).map((corner) => (
                        <div
                            key={corner}
                            onMouseDown={(e) => handleResizeStart(e, corner)}
                            style={getResizeHandleStyle(corner)}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default Element;
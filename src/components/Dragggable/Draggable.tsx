import "./Draggable.scss";
import { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { useStickyNote, useLockWidgetsStore } from "@Store";
import clsx from "clsx";

let GLOBAL_Z = 50;

export const DWrapper = ({
  children,
  toggleHook,
  defaultX,
  defaultY,
  setPosition,
  isSticky,
  stickyID,
  gridValues,
  handle,
}: {
  children: any;
  toggleHook: boolean;
  defaultX: number;
  defaultY: number;
  setPosition: any;
  isSticky: boolean;
  stickyID?: number;
  gridValues?: [number, number];
  handle?: string;
}) => {
  const { setStickyNotesPos } = useStickyNote();
  const { areWidgetsLocked } = useLockWidgetsStore();
  const [z, setZIndex] = useState(0);
  const ref = useRef();

  const changePosition = (data: any) => {
    if (isSticky) {
      setStickyNotesPos(stickyID, data.x, data.y);
    } else {
      setPosition(data.x, data.y);
    }
  };

  const getFocus = () => {
    setZIndex(++GLOBAL_Z);
  };

  const triggerMouseEvent = (element, eventType) => {
    const mouseEvent = new MouseEvent(eventType, { bubbles: true, cancelable: true });
    element.dispatchEvent(mouseEvent);
  };

  useEffect(() => {
    const listener = () => {
      triggerMouseEvent(ref.current, "mouseover");
      triggerMouseEvent(ref.current, "mousedown");
      triggerMouseEvent(document, "mousemove");
      triggerMouseEvent(ref.current, "mouseup");
      triggerMouseEvent(ref.current, "click");
    };

    addEventListener("resize", listener);
    return () => removeEventListener("resize", listener);
  }, []);

  useEffect(() => {
    if (toggleHook) {
      setZIndex(++GLOBAL_Z);
    }
  }, [toggleHook]);

  return (
    <>
      <Rnd
        bounds="parent"
        default={{
          x: defaultX,
          y: defaultY,
          width: "auto",
          height: "auto",
        }}
        onDragStop={(_, data) => changePosition(data)}
        onMouseDown={getFocus}
        disableDragging={areWidgetsLocked}
        // enableResizing={{
        //   top: true,
        //   right: true,
        //   bottom: false,
        //   left: false,
        //   topRight: false,
        //   bottomRight: true,
        //   bottomLeft: false,
        //   topLeft: false,
        // }}
        // resizeHandleStyles={{
        //   top: { display: "none" },
        //   right: { display: "none" },
        //   bottom: { display: "none" },
        //   left: { display: "none" },
        //   topRight: { display: "none" },
        //   bottomRight: { display: "block" },
        //   bottomLeft: { display: "none" },
        //   topLeft: { display: "none" },
        // }}
        className={clsx("inline-block", toggleHook ? "visible" : "pointer-events-none hidden")}
      >
        {/* isSticky? */}
        <div style={{ zIndex: z, position: "absolute" }} onMouseDown={getFocus}>
          <div ref={ref} className={clsx("inline-block", toggleHook ? "visible" : "pointer-events-none hidden")}>
            {children}
          </div>
        </div>
      </Rnd>
      {/* <Draggable
        bounds="parent"
        cancel=".cancelDrag"
        position={{ x: defaultX, y: defaultY }}
        onMouseDown={getFocus}
        onStop={(_, data) => changePosition(data)}
        grid={gridValues}
        disabled={areWidgetsLocked}
        handle={handle}
      >
        <div
          style={{ zIndex: z, position: "absolute" }}
          onMouseDown={getFocus}
          className={!isSticky && "dcard box dwidth"}
        >
          <div ref={ref} className={clsx("inline-block", toggleHook ? "visible" : "pointer-events-none hidden")}>
            {children}
          </div>
        </div>
      </Draggable> */}
    </>
  );
};

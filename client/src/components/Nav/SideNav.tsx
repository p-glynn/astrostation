import { NavItem } from "./NavItems";
import { IoMusicalNotesOutline, IoTennisball } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import {
  MdOutlineTimer,
  MdWbSunny,
  MdDarkMode,
  MdOutlineNoteAdd,
} from "react-icons/md";
import { VscDebugRestartFrame } from "react-icons/vsc";
import {
  BsArrowsFullscreen,
  BsFillChatLeftQuoteFill,
  BsTwitch,
} from "react-icons/bs";
import { FaSpotify } from "react-icons/fa";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useDarkToggleStore,
  useFullScreenToggleStore,
  useToggleQuote,
  useStickyNote,
  useToggleStickyNote,
  useToggleWidgetReset,
  useToggleTwitch,
  useSideNavOrderStore,
} from "@Store";
import { useState, useEffect } from "react";
import useMediaQuery from "@Utils/hooks/useMediaQuery";
import useSetDefault from "@App/utils/hooks/useSetDefault";
import { Tooltip } from "@mui/material";

import {
  toggledToastNotification,
  defaultToast,
  toastThemeNotification,
} from "@Utils/toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { fullscreenChanged, toggleFullScreen } from "@Utils/fullscreen";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const { isFullscreen } = useFullScreenToggleStore();
  const [active, setActive] = useState(false);
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();
  const { isTasksToggled, setIsTasksToggled } = useToggleTasks();
  const { isSpotifyToggled, setIsSpotifyToggled } = useSpotifyMusic();
  const { isQuoteToggled, setIsQuoteToggled } = useToggleQuote();
  const { isTwitchToggled, setIsTwitchToggled } = useToggleTwitch();

  const { isTimerShown } = useToggleTimer();
  const { isStickyNoteShown } = useToggleStickyNote();
  const { isTasksShown } = useToggleTasks();
  const { isMusicShown } = useToggleMusic();
  const { isSpotifyShown } = useSpotifyMusic();
  const { isDarkModeShown } = useDarkToggleStore();
  const { isFullscreenShown } = useFullScreenToggleStore();
  const { isQuoteShown } = useToggleQuote();
  const { isWidgetResetShown } = useToggleWidgetReset();
  const { isTwitchShown } = useToggleTwitch();

  const { sideNavOrder, setSideNavOrder } = useSideNavOrderStore();

  const { stickyNotes, addStickyNote } = useStickyNote();
  const isDesktop = useMediaQuery("(min-width: 641px)");
  const setDefault = useSetDefault();

  useEffect(() => {
    document.addEventListener("fullscreenchange", fullscreenChanged);
    document.addEventListener("keyup", function (e) {
      if (
        e.key === "F11" ||
        (e.key === "Escape" && document.fullscreenElement)
      ) {
        toggleFullScreen();
      }
    });
  }, []);

  function toggleDefaultPositions() {
    var answer = window.confirm(
      "This will reset tiles to default positon - are you sure?"
    );
    if (answer) {
      setDefault(false, false, true);
      defaultToast("Positions reset");
      window.location.reload();
    }
  }

  function addNewStickyNote() {
    addStickyNote("");
  }

  function toggleNavBar() {
    setActive((oldDate) => !oldDate);
  }

  let theme = isDark ? (
    <MdWbSunny className="h-6 w-6" />
  ) : (
    <MdDarkMode className="h-6 w-6" />
  );

  const sideNavItems = [
    {
      id: "1",
      content: <IoMusicalNotesOutline className="h-6 w-6" />,
      tooltipTitle: "Lofi Music",
      isToggled: isMusicToggled,
      setToggled: setIsMusicToggled,
      toggleString: "Music Toggled",
      toggleIcon: "🎵",
      isShown: isMusicShown,
    },
    {
      id: "2",
      content: <FaSpotify className="h-6 w-6" />,
      tooltipTitle: "Spotify",
      isToggled: isSpotifyToggled,
      setToggled: setIsSpotifyToggled,
      toggleString: "Spotify Toggled",
      toggleIcon: "🎧",
      isShown: isSpotifyShown,
    },
    {
      id: "3",
      content: <CgNotes className="h-6 w-6" />,
      tooltipTitle: "Task Tracker",
      isToggled: isTasksToggled,
      setToggled: setIsTasksToggled,
      toggleString: "Task Toggled",
      toggleIcon: "📓",
      isShown: isTasksShown,
    },
    {
      id: "4",
      content: <MdOutlineTimer className="h-6 w-6" />,
      tooltipTitle: "Pomodoro Timer",
      isToggled: isTimerToggled,
      setToggled: setIsTimerToggled,
      toggleString: "Timer Toggled",
      toggleIcon: "⏳",
      isShown: isTimerShown,
    },
    {
      id: "5",
      content: <MdOutlineNoteAdd className="h-6 w-6" />,
      tooltipTitle: "Sticky Note",
      isToggled: stickyNotes.length > 0,
      setToggled: addNewStickyNote,
      toggleString: "Sticky Note Toggled",
      toggleIcon: "📝",
      isShown: isStickyNoteShown,
    },
    {
      id: "6",
      content: <VscDebugRestartFrame className="h-6 w-6" />,
      tooltipTitle: "Reset Positions",
      isToggled: false,
      setToggled: toggleDefaultPositions,
      toggleString: "Reset Toggled",
      toggleIcon: "⏪",
      isShown: isWidgetResetShown,
    },
    {
      id: "7",
      content: theme,
      tooltipTitle: "Theme",
      isToggled: isDark,
      setToggled: toggleDarkMode,
      toggleString: "Theme Toggled",
      toggleIcon: "🌙",
      isShown: isDarkModeShown,
    },
    {
      id: "8",
      content: <BsFillChatLeftQuoteFill className="h-6 w-6" />,
      tooltipTitle: "Quotes",
      isToggled: isQuoteToggled,
      setToggled: setIsQuoteToggled,
      toggleString: "Quotes Toggled",
      toggleIcon: "💬",
      isShown: isQuoteShown,
    },
    {
      id: "9",
      content: <BsTwitch className="h-6 w-6" />,
      tooltipTitle: "Twitch Stream",
      isToggled: isTwitchToggled,
      setToggled: setIsTwitchToggled,
      toggleString: "Twitch Toggled",
      toggleIcon: "📺",
      isShown: isTwitchShown,
    },
    {
      id: "10",
      content: <BsArrowsFullscreen className="h-6 w-6" />,
      tooltipTitle: "Fullscreen",
      isToggled: isFullscreen,
      setToggled: toggleFullScreen,
      toggleString: "Fullscreen Toggled",
      toggleIcon: "",
      isShown: isFullscreenShown,
    },
  ];

  // a little function to help us with reordering the result
  const reorder = (
    list: number[],
    startIndex: number,
    endIndex: number
  ): number[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setSideNavOrder(
      reorder(sideNavOrder, result.source.index, result.destination.index)
    );
  }

  return (
    <div className="sideNav flex absolute">
      <aside className="flex flex-col">
        <ul>
          <div className="sm:hidden">
            <NavItem onClick={toggleNavBar} shown={true}>
              <IoMenu className="h-6 w-6" />
            </NavItem>
          </div>
          <div
            className={`${
              active ? "" : "hidden"
            } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sideNavOrder &&
                      sideNavOrder.map &&
                      sideNavOrder.map((id, index) => {
                        const item = sideNavItems[id];
                        if (!item) return;

                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Tooltip
                                  title={item.tooltipTitle}
                                  placement="right"
                                >
                                  <div>
                                    <NavItem
                                      onClick={() =>
                                        toggledToastNotification(
                                          item.isToggled,
                                          item.setToggled,
                                          item.toggleString,
                                          750,
                                          item.toggleIcon
                                        )
                                      }
                                      toggled={item.isToggled}
                                      shown={item.isShown}
                                    >
                                      {item.content}
                                      {item.tooltipTitle == "Sticky Note" &&
                                        stickyNotes.length > 0 && (
                                          <span className="h-[25px] w-[25px] bg-[#000] rounded-full absolute right-[8px] bottom-[8px] text-white text-center">
                                            {stickyNotes.length}
                                          </span>
                                        )}
                                    </NavItem>
                                  </div>
                                </Tooltip>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </ul>
      </aside>
    </div>
  );
};

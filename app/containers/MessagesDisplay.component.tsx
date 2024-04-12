import React from "react";

import Menu from "~/components/Menu.component";
import { SCREEN_SIZES } from "~/models";

interface MessagesDisplayProps {
  children?: React.ReactNode;
  menuOptions: Array<string>;
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  hideAllOption?: boolean;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  getMessageCountForSelectedOption: (option: string) => number;
  title?: string;
  shouldRenderTopicAcknowledgementButton?: boolean;
  acknowledgeSelectedOption?: (option: string) => void;
  screenSize: number;
}

const MessagesDisplay: React.FC<MessagesDisplayProps> = ({
  children,
  menuOptions,
  showMenu,
  setShowMenu,
  hideAllOption,
  selectedOption,
  setSelectedOption,
  getMessageCountForSelectedOption,
  shouldRenderTopicAcknowledgementButton,
  title,
  acknowledgeSelectedOption,
  screenSize,
}) => {
  const shouldRenderAcknowledgementButton =
    acknowledgeSelectedOption && shouldRenderTopicAcknowledgementButton;

  const listClassNameBase = "px-4 py-4 overflow-auto justify-self-end";
  const listClassName = showMenu
    ? `${listClassNameBase} w-4/5`
    : `${listClassNameBase} w-full`;

  const menuClassNameBase =
    "border-r border-gray-200 fixed overflow-y-auto top-20 bottom-0";
  const getMenuClassName = () => {
    if (screenSize >= SCREEN_SIZES.md) {
      return `${menuClassNameBase} w-1/5`;
    }
    return showMenu ? `${menuClassNameBase} w-full` : "hidden";
  };

  const shouldRenderList = screenSize >= SCREEN_SIZES.md || !showMenu;

  const handleOptionSelected = (option: string) => {
    // if the screen is small, hide the menu when an option is selected
    if (screenSize < SCREEN_SIZES.md) {
      setShowMenu(false);
    }
    setSelectedOption(option);
  };

  return (
    <div className="grid">
      {showMenu && (
        <div className={getMenuClassName()}>
          <Menu
            options={menuOptions}
            selectedOption={selectedOption}
            setSelectedOption={handleOptionSelected}
            getCountForOption={getMessageCountForSelectedOption}
            hideAllOption={hideAllOption}
          />
        </div>
      )}
      {shouldRenderList && (
        <div className={listClassName}>
          <div className="flex items-center justify-between">
            {title && <h1 className="text-xl font-bold mb-0 mr-4">{title}</h1>}
            {shouldRenderAcknowledgementButton && (
              <button
                className="px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-gray-200 hover:text-gray-800"
                onClick={() => acknowledgeSelectedOption(selectedOption)}
              >
                Acknowledge Topic
              </button>
            )}
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default MessagesDisplay;

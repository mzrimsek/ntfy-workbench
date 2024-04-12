import React from "react";

import Menu from "~/components/Menu.component";

interface MessagesDisplayProps {
  children?: React.ReactNode;
  menuOptions: Array<string>;
  showMenu: boolean;
  hideAllOption?: boolean;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  getMessageCountForSelectedOption: (option: string) => number;
  title?: string;
  shouldRenderTopicAcknowledgementButton?: boolean;
  acknowledgeSelectedOption?: (option: string) => void;
}

const MessagesDisplay: React.FC<MessagesDisplayProps> = ({
  children,
  menuOptions,
  showMenu,
  hideAllOption,
  selectedOption,
  setSelectedOption,
  getMessageCountForSelectedOption,
  shouldRenderTopicAcknowledgementButton,
  title,
  acknowledgeSelectedOption,
}) => {
  const shouldRenderAcknowledgementButton =
    acknowledgeSelectedOption && shouldRenderTopicAcknowledgementButton;
  return (
    <div className="grid">
      {showMenu && (
        <div className="w-1/5 border-r border-gray-200 fixed overflow-y-auto top-20 bottom-0">
          <Menu
            options={menuOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            getCountForOption={getMessageCountForSelectedOption}
            hideAllOption={hideAllOption}
          />
        </div>
      )}
      <div className="w-4/5 px-4 py-4 overflow-auto justify-self-end">
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
    </div>
  );
};

export default MessagesDisplay;

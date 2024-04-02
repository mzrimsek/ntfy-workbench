import React from "react";

import { DisplayState } from "~/enums";

type DisplayStateSwitchProps = {
  displayState: DisplayState;
  setDisplayState: React.Dispatch<React.SetStateAction<DisplayState>>;
};

const DisplayStateSwitch: React.FC<DisplayStateSwitchProps> = ({
  displayState,
  setDisplayState,
}) => {
  const handleToggle = () => {
    setDisplayState((prevState) =>
      prevState === DisplayState.Topic ? DisplayState.Tag : DisplayState.Topic
    );
  };

  return (
    <div className="flex space-x-2">
      <button
        type="button"
        className={`px-4 py-2 rounded-md font-medium ${
          displayState === DisplayState.Topic
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 hover:text-gray-800"
        }`}
        onClick={handleToggle}
      >
        Topic
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded-md font-medium ${
          displayState === DisplayState.Tag
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 hover:text-gray-800"
        }`}
        onClick={handleToggle}
      >
        Tag
      </button>
    </div>
  );
};

export default DisplayStateSwitch;

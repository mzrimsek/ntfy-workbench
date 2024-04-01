import React from "react";

import { DisplayState } from "~/enums";

type DisplayStateSwitchProps = {
  displayState: DisplayState;
  setDisplayState: (displayState: DisplayState) => void;
};

const DisplayStateSwitch: React.FC<DisplayStateSwitchProps> = ({
  displayState,
  setDisplayState,
}) => {
  return (
    <div>
      <button
        onClick={() => setDisplayState(DisplayState.All)}
        className={displayState === DisplayState.All ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => setDisplayState(DisplayState.Topic)}
        className={displayState === DisplayState.Topic ? "active" : ""}
      >
        Topic
      </button>
      <button
        onClick={() => setDisplayState(DisplayState.Tag)}
        className={displayState === DisplayState.Tag ? "active" : ""}
      >
        Tag
      </button>
    </div>
  );
};

export default DisplayStateSwitch;

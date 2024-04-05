import React from "react";
import MenuButton from "./MenuButton.component";
import { ALL_OPTIONS } from "~/models";

type MenuProps = {
  options: Array<string>;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  getCountForOption?: (option: string) => number;
};

const Menu: React.FC<MenuProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  getCountForOption,
}) => {
  const getCount = (option: string) => {
    return getCountForOption ? getCountForOption(option) : 0;
  };

  return (
    <div className="flex flex-col space-y-2">
      <MenuButton
        value={ALL_OPTIONS}
        display="All"
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      ></MenuButton>
      {options.map((topic, index) => (
        <MenuButton
          key={index}
          value={topic}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          messageCounter={getCount(topic)}
        ></MenuButton>
      ))}
    </div>
  );
};

export default Menu;

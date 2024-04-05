import React from "react";
import MenuButton from "./MenuButton.component";
import { ALL_OPTIONS } from "~/models";

type MenuProps = {
  options: Array<string>;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  getCountForOption?: (option: string) => number;
  hideAllOption?: boolean;
};

const Menu: React.FC<MenuProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  getCountForOption,
  hideAllOption,
}) => {
  const getCount = (option: string) => {
    return getCountForOption ? getCountForOption(option) : 0;
  };

  const shouldRenderAllOption = !hideAllOption;

  return (
    <div className="flex flex-col space-y-2">
      {shouldRenderAllOption && (
        <MenuButton
          value={ALL_OPTIONS}
          display="All"
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></MenuButton>
      )}
      {options.map((option, index) => (
        <MenuButton
          key={index}
          value={option}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          messageCounter={getCount(option)}
        ></MenuButton>
      ))}
    </div>
  );
};

export default Menu;

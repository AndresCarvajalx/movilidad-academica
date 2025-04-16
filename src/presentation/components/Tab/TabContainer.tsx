import React, { useState } from "react";
import { ITab } from "../../../types";
import Tab from "./Tab";

interface TabContainerProps {
  tabs: ITab[];
  onTabChange?: (tab: ITab) => void;
}

const TabContainer: React.FC<TabContainerProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: ITab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="w-full bg-gray-100 p-1 rounded-lg flex justify-between">
      {tabs.map((tab) => (
        <Tab
          key={tab.route}
          isActive={activeTab.route === tab.route}
          onClick={() => handleTabClick(tab)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
};

export default TabContainer;

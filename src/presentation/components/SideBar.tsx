import React from "react";
import View from "../../data/DashBoardViews";

import escudo_unitropico_1 from "../../assets/escudo_unitropico_1.png";

interface SidebarProps {
  menu: {
    key: View;
    label: string;
    icon: React.ReactNode;
  }[];
  activeView: View;
  setActiveView: (view: View) => void;
}

const SideBar: React.FC<SidebarProps> = ({ activeView, setActiveView, menu }) => {
  return (
    <aside className="w-64 bg-white border-r shadow-md h-full">
      <img className="p-4 mx-auto w-28" src={escudo_unitropico_1} />
      <nav className="mt-4">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveView(item.key)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-green-100 hover:text-black transition ${
              activeView === item.key
                ? "bg-(--green-color) text-white font-semibold"
                : "text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;

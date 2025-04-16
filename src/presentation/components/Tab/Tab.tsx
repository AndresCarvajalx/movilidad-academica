interface TabProps {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }
  
  const Tab: React.FC<TabProps> = ({
    children,
    isActive,
    onClick,
  }) => {
    return (
      <button
        className={`flex-1 py-3 px-6 font-medium text-sm focus:outline-none transition-all ${
          isActive
            ? "bg-white text-black shadow-sm rounded-md"
            : "text-gray-500 hover:text-black"
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Tab;
  
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";

import ArchivosAdjuntos from "./components/ArchivosAdjuntos";
import { useAuth } from "../auth/AuthProvider";
import TabContainer from "./components/Tab/TabContainer";
import { ITab } from "../types";
import PersonalInfo from "./components/PersonalInfo";
import Button from "./components/Button";

const Profile: React.FC = () => {
  const tabs: ITab[] = [
    {
      route: "personal-info",
      label: "Información Personal",
      component: <PersonalInfo />,
    },
    {
      route: "personal-files",
      label: "Archivos Adjuntos",
      component: <ArchivosAdjuntos />,
    },
  ];

  const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);
  const { signout } = useAuth();

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <TabContainer tabs={tabs} onTabChange={setActiveTab} />
      <div className="p-6">{activeTab.component}</div>
      <Button
        onClick={signout}
        className="bg-red-50 border border-red-600 text-red-700 hover:bg-red-100"
      >
        Cerrar Sesion <FiLogOut />
      </Button>
    </div>
  );
};

export default Profile;

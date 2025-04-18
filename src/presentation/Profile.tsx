import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";

import { useAuth } from "../auth/AuthProvider";
import { useUser } from "../domain/UserInfoProvider";
import { ITab } from "../types";
import ArchivosAdjuntos from "./components/ArchivosAdjuntos";
import Button from "./components/Button";
import LoadingScreen from "./components/LoadingScreen";
import PersonalInfo from "./components/PersonalInfo";
import TabContainer from "./components/Tab/TabContainer";

const Profile: React.FC = () => {
  
  const { signout } = useAuth();
  const { userData, loading } = useUser();

  const tabs: ITab[] = [
    {
      route: "personal-info",
      label: "Información Personal",
      component: <PersonalInfo  />,
    },
    {
      route: "personal-files",
      label: "Archivos Adjuntos",
      component: <ArchivosAdjuntos />,
    },
  ];
  const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (userData?.rol == "admin") {
    return (
      <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">¡Hola Administrador!</h1>
        <p className="text-gray-700 mb-4">Bienvenido al sistema de gestión.</p>
        <p className="text-gray-700 mb-4">
          Desde aquí puedes gestionar los convenios y las solicitudes.
        </p>
        <Button
          onClick={signout}
          className="bg-red-50 border border-red-600 text-red-700 hover:bg-red-100"
        >
          Cerrar Sesion <FiLogOut />
        </Button>
      </div>
    );
  }
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

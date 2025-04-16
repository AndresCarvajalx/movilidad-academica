import { useState } from "react";
import View from "../data/DashBoardViews.ts";
import SideBar from "./components/SideBar.tsx";
import Profile from "./Profile.tsx";
import Agreement from "./Agreement.tsx";

export function Home() {
  const [activeView, setActiveView] = useState<View>(View.Convenio); // Inicializar con el enum

  const renderContent = () => {
    switch (activeView) {
      case View.Convenio:
        return <Agreement />;
      case View.Solicitudes:
        return <h1>Solicitudes</h1>;
      case View.Alertas:
        return <h1>Alertas</h1>;
      case View.Perfil:
        return <Profile />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };
  return (
    <div className="flex h-screen">
      <SideBar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

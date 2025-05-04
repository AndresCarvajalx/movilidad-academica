import { useEffect, useState } from "react";
import { FaUser, FaBell, FaFileAlt, FaHandshake } from "react-icons/fa";

import View from "../data/DashBoardViews.ts";
import SideBar from "./components/SideBar.tsx";
import Profile from "./Profile.tsx";
import Agreement from "./Agreement.tsx";
import Solicitudes from "./Solicitudes.tsx";
import { useUser } from "../core/UserInfoProvider.tsx";
import AdminAgreement from "../admin/presentation/Agreement/AdminAgreement.tsx";
import AdminAgreementManager from "../admin/presentation/Agreement/AdminAgreementManager.tsx";
import Alerts from "./Alerts.tsx";
import Charts from "../admin/presentation/Charts.tsx";

let menu: { label: string; key: View; icon: React.ReactNode }[] = [
  { label: "Convenio", key: View.Convenio, icon: <FaHandshake /> },
  { label: "Solicitudes", key: View.Solicitudes, icon: <FaFileAlt /> },
  { label: "Alertas", key: View.Alertas, icon: <FaBell /> },
  { label: "Perfil", key: View.Perfil, icon: <FaUser /> },
];

export function Home() {
  const [activeView, setActiveView] = useState<View>(View.Convenio);
  const { userData } = useUser();
  const isAdmin = userData?.rol === "admin";
  
  useEffect(() => {
    menu = menu
      .map((item) => {
        if (item.key === View.Alertas && isAdmin) {
          return { ...item, label: "Metricas" };
        }
        return item;
      })
      .filter(Boolean);
  });

  const renderContent = () => {
    switch (activeView) {
      case View.Convenio:
        return !isAdmin ? <Agreement /> : <AdminAgreementManager />;
      case View.Solicitudes:
        return !isAdmin ? <Solicitudes /> : <AdminAgreement />;
      case View.Alertas:
        return !isAdmin ? <Alerts /> : <Charts />;
      case View.Perfil:
        return <Profile />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };
  return (
    <div className="flex h-screen">
      <SideBar
        activeView={activeView}
        setActiveView={setActiveView}
        menu={menu}
      />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

/**
 rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /solicitudes/{solicitudId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.usuarioId;
      allow read: if request.auth != null && (
        resource.data.usuarioId == request.auth.uid || // estudiante ve sus solicitudes
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == "admin" // admin ve todas
      );
      allow update: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == "admin";
    }

    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

 */

import { useState } from "react";
import View from "../data/DashBoardViews.ts";
import SideBar from "./components/SideBar.tsx";
import Profile from "./Profile.tsx";
import Agreement from "./Agreement.tsx";
import Solicitudes from "./Solicitudes.tsx";
import { useUser } from "../core/UserInfoProvider.tsx";
import AdminAgreement from "../admin/presentation/Agreement/AdminAgreement.tsx";

export function Home() {
  const [activeView, setActiveView] = useState<View>(View.Convenio);
  const { userData } = useUser();

  const renderContent = () => {
    switch (activeView) {
      case View.Convenio:
        return <Agreement />;
      case View.Solicitudes:
        return userData?.rol !== "admin" ? (<Solicitudes />) : (<AdminAgreement />);
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

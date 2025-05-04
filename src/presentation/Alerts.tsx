import React, { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { IRequestForm } from "../types";
import { useUser } from "../core/UserInfoProvider";
import { db } from "../api/firebase";

const Alerts: React.FC = () => {
  const { userData: user, loading } = useUser();
  const [requests, setRequests] = useState<IRequestForm[]>([]);
  const [fetching, setFetching] = useState(true);
  console.log("UserData from context:", user);

  const fetchAlerts = useCallback(async () => {
    if (!user?.uid) {
      console.log("User not found or user.uid is undefined.");
      setFetching(false);
      return;
    }

    try {
      const q = query(
        collection(db, "solicitudes"),
        where("userId", "==", user.uid),
        where("vistoPorEstudiante", "==", false)
      );

      console.log("Fetching alerts for user:", user.uid);

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("No new alerts found.");
        setRequests([]);
      } else {
        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as IRequestForm))
          .filter((req) => req.observacionesAdmin);

        setRequests(data);
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setFetching(false);
    }
  }, [user]);

  const markAsSeen = async (id: string) => {
    try {
      await updateDoc(doc(db, "solicitudes", id), {
        vistoPorEstudiante: true,
      });
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error updating vistoPorEstudiante:", err);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      fetchAlerts();
    }
  }, [user, loading, fetchAlerts]);

  if (loading || fetching) {
    return <p className="text-center text-gray-500">Cargando alertas...</p>;
  }

  if (requests.length === 0) {
    return <p className="text-center text-gray-500">No hay nuevas alertas.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      {requests.map((req) => (
        <div
          key={req.id}
          className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-md shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-bold">Nueva observación administrativa</h3>
              <p className="text-sm text-gray-700 mt-1">{req.observacionesAdmin}</p>
            </div>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => markAsSeen(req.id)}
            >
              Marcar como leída
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;

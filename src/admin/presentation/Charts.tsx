import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../api/firebase";
import { IRequestForm } from "../../types";

const Charts: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  const fetchData = async () => {
    if (!startDate || !endDate) return;

    const start = Timestamp.fromDate(new Date(startDate));
    const end = Timestamp.fromDate(new Date(endDate + "T23:59:59"));

    const q = query(
      collection(db, "solicitudes"),
      where("fechaCreacion", ">=", start),
      where("fechaCreacion", "<=", end)
    );

    const snapshot = await getDocs(q);
    const rawData: Record<string, number> = {};

    snapshot.forEach((doc) => {
      const data = doc.data() as IRequestForm;
      const dateStr = data.fechaCreacion.toDate().toISOString().split("T")[0];
      rawData[dateStr] = (rawData[dateStr] || 0) + 1;
    });

    const formatted = Object.entries(rawData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setData(formatted);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Solicitudes por Fecha</h2>

      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium">Fecha Inicio</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha Fin</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No hay datos para el rango seleccionado.</p>
      )}
    </div>
  );
};

export default Charts;

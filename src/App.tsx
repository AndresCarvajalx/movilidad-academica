import { Route, Routes } from "react-router";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Login from "./presentation/Login.tsx";
import { Home } from "./presentation/Home.tsx";
import { Signup } from "./presentation/Signup.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

export function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

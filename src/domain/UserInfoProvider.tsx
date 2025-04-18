import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserData } from "./GetUserInfo";
import { IUserData } from "../types";
import { useAuth } from "../auth/AuthProvider";
import { db } from "../api/firebase";
import { doc, setDoc } from "firebase/firestore";

interface UserContextType {
  userData: IUserData | null;
  loading: boolean;
  updateUserData: (newData: Partial<IUserData>) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const UserInfoProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (authUser) {
        try {
          const data = await getUserData(authUser.uid);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [authUser]);
  
  const updateUserData = async (newData: Partial<IUserData>) => {
    if (!authUser) return;
  
    const userRef = doc(db, "usuarios", authUser.uid);
  
    await setDoc(userRef, newData, { merge: true });
  
    setUserData((prev) => ({
      ...prev!,
      ...newData,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, loading, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

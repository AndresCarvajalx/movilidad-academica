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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebase";

interface UserContextType {
  userData: IUserData | null;
  loading: boolean;
  updateUserData: (newData: Partial<IUserData>) => Promise<void>;
  uploadUserFiles: (tipo: string, archivo: File) => Promise<string | null>;
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

  const uploadUserFiles = async (type: string, file: File): Promise<string | null> => {
    if (!authUser) return null;
  
    try {
      const storageRef = ref(storage, `estudiantes/${authUser.uid}/${type}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
  
      const userRef = doc(db, "usuarios", authUser.uid);
      await setDoc(userRef, { files: { [type]: url } }, { merge: true });
  
      setUserData((prev) => ({
        ...prev!,
        files: {
          ...prev?.files,
          [type]: url,
        },
      }));
  
      return url;
    } catch (error) {
      console.error("Error al subir archivo:", error);
      return null;
    }
  };
  return (
    <UserContext.Provider value={{ userData, loading, updateUserData, uploadUserFiles }}>
      {children}
    </UserContext.Provider>
  );
};

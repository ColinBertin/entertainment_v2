// import { createContext, useContext, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { verifyTokenAndGetData } from "./Auth";
// import { useNavigate } from "react-router-dom";

// interface User {
//   _id: string;
//   username: string;
// }

// interface AuthContextType {
//   user: User | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies(["token"]);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = cookies.token;
//     if (token) {
//       verifyTokenAndGetData()
//         .then((userData: User) => {
//           setUser(userData);
//         })
//         .catch((error) => {
//           console.error("Failed to verify token:", error);
//           removeCookie("token", "");
//           navigate("/login");
//         });
//     }
//   }, [cookies, removeCookie, navigate]);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { useState, useEffect, createContext } from "react";
import {
  OtherUser,
  User,
  UserResponse,
  UsersContext,
} from "../utils/interfaces";
import UserService from "../services/userService";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const INITIAL_STATE: UsersContext = {
  currentUser: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : null,
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") as string)
    : null,
};

UserService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth") as string).token
    }`;
  }
  return req;
});

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  let location = useLocation();

  const [currentUser, setCurrentUser] = useState<UserResponse | null>(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null
  );

  const [users, setUsers] = useState<OtherUser[]>(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") as string)
      : null
  );

  const decodeJWT = (token: string): any => {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth") as string);

    if (user) {
      const decodedJWT = decodeJWT(user.token);

      if (decodedJWT.exp * 1000 < Date.now()) {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [location]);

  const handleGetUsers = async () => {
    const users = await UserService.getUsers();
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
      setUsers(users);
    }
  };

  const handleSignUp = async (user: User) => {
    const currentUser = await UserService.signUp(user);
    if (currentUser) {
      localStorage.setItem("auth", JSON.stringify(currentUser));
      setCurrentUser(currentUser);
    }
  };

  const handleSignIn = async (user: User) => {
    const currentUser = await UserService.signIn(user);
    if (currentUser) {
      localStorage.setItem("auth", JSON.stringify(currentUser));
      setCurrentUser(currentUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setCurrentUser(null);
  };

  const handleResetPassword = async (email: string) => {
    await UserService.resetPassword(email);
  };

  const handleChangePassword = async (token: string, data: object) => {
    await UserService.changePassword(token, data);
  };

  const handleDeleteUser = async () => {
    const deleteduser = await UserService.deleteUser();
    if (!deleteduser.user) {
      localStorage.removeItem("auth");
      setCurrentUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        onGetUsers: handleGetUsers,
        onSignUp: handleSignUp,
        onSignIn: handleSignIn,
        onLogout: handleLogout,
        onResetPassword: handleResetPassword,
        onChangePassword: handleChangePassword,
        onDeleteUser: handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

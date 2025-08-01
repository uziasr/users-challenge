import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUsers } from "../api/users";
import type { User, UserTitle } from "../types/user";
import type { SortType } from "../constants";
import { UNSELECTED, ASCENDING, DESCENDING } from "../constants";

interface UserContextType {
  users: Array<User>;
  setUsers: (user: Array<User>) => void;
  filterUsers: (field: UserTitle, sortType: SortType) => void;
  createUser: (newUser: User) => void;
  searchUsers: (searchTerm: string) => Array<User>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = async () => {
    const users = await fetchUsers();
    if (users) {
      setUsers(users);
    }
  };

  const createUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const searchUsers = (searchTerm: string) => {
    if (!searchTerm) {
      return users;
    }
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterUsers = (field: UserTitle, sortType: SortType) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortType === ASCENDING) {
        return a[field].localeCompare(b[field]);
      } else if (sortType === DESCENDING) {
        return b[field].localeCompare(a[field]);
      } else if (sortType === UNSELECTED) {
        return a.id > b.id ? 1 : -1;
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  useEffect(() => {
    // initial fetch of users
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        filterUsers,
        createUser,
        searchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

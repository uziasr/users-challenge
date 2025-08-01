import React, { useState } from "react";
import { UsersTable } from "./UsersTable";
import { useUserContext } from "../../store/UserContext";
import type { User } from "../../types/user";
import { UserModal } from "./UserModal";
import { Button, Flex, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const { searchUsers } = useUserContext();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterString, setFilterString] = useState("");

  const setSelectedUserNull = () => {
    setSelectedUser(null);
  };

  const filteredUsers = searchUsers(filterString);

  return (
    <div>
      <Flex justify={"space-between"} align={"center"}>
        <h1>Users</h1>
        <TextInput
          placeholder="Search users..."
          onChange={(e) => setFilterString(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button onClick={() => navigate("/create")}>Create User</Button>
      </Flex>
      <UsersTable users={filteredUsers} setSelectedUser={setSelectedUser} />
      <UserModal user={selectedUser} onClose={setSelectedUserNull} />
    </div>
  );
};

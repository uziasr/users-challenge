import { Table, Text, Box } from "@mantine/core";
import React from "react";
import type { User, UserTitle } from "../../types/user";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

import {
  titleActionMap,
  UNSELECTED,
  ASCENDING,
  DESCENDING,
  type SortType,
  type TitleSortType,
} from "../../constants";

const IconMap = {
  [UNSELECTED]: IconSelector,
  [ASCENDING]: IconChevronUp,
  [DESCENDING]: IconChevronDown,
};
import { useUserContext } from "../../store/UserContext";

import "./UsersTable.css";
interface Props {
  users: Array<User>;
  setSelectedUser: (user: User | null) => void;
}

export const UsersTable = (props: Props) => {
  const { users, setSelectedUser } = props;

  const { filterUsers } = useUserContext();

  const [titleSort, setTitleSort] = React.useState<TitleSortType>({
    name: UNSELECTED,
    username: UNSELECTED,
    email: UNSELECTED,
  });

  const handleSort = (title: UserTitle) => {
    const currentSort: SortType = titleSort[title];
    const newSort = titleActionMap[currentSort];
    const tempSort = {
      name: UNSELECTED,
      username: UNSELECTED,
      email: UNSELECTED,
      [title]: newSort,
    };
    filterUsers(title, newSort);
    setTitleSort(tempSort);
  };

  const NameIcon = IconMap[titleSort.name];
  const UsernameIcon = IconMap[titleSort.username];
  const EmailIcon = IconMap[titleSort.email];

  return (
    <Table>
      <Table.Thead>
        <Table.Tr className="titles">
          <>
            <Table.Th onClick={() => handleSort("name")}>
              <Box flex="row" display="flex">
                <Text mr={10}>Name</Text>
                <NameIcon />
              </Box>
            </Table.Th>
          </>
          <>
            <Table.Th onClick={() => handleSort("username")}>
              <Box flex="row" display="flex">
                <Text mr={10}>Username</Text>
                <UsernameIcon />
              </Box>
            </Table.Th>
          </>
          <>
            <Table.Th onClick={() => handleSort("email")}>
              <Box flex="row" display="flex">
                <Text mr={10}>Email</Text>
                <EmailIcon />
              </Box>
            </Table.Th>
          </>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr
            className="rows"
            key={user.id}
            onClick={() => setSelectedUser(user)}
          >
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.username}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

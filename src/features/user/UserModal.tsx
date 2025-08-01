import { Modal, Box, Text, Title, Flex } from "@mantine/core";
import React from "react";
import type { User } from "../../types/user";
import { IconUserCircle } from "@tabler/icons-react";

interface Props {
  user: User | null;
  onClose: () => void;
}

export const UserModal = (props: Props) => {
  const { user, onClose } = props;

  if (!user) {
    return null; // If no user is selected, don't render the modal
  }

  let dynanicWidth = 0;
  if (user.address && user.address.city) {
    dynanicWidth = 35;
  }
  if (user.company && user.company.name) {
    dynanicWidth = 35 + dynanicWidth;
  }
  const dynamicWidthStyle =
    dynanicWidth == 0 ? {} : { width: `${dynanicWidth}%` };

  return (
    <>
      <Modal
        opened={!!user} // boolean check of user
        onClose={onClose}
        title="User Details"
        size={`${dynanicWidth == 0 ? 50 : dynanicWidth}%`}
        centered
      >
        <Box>
          <Flex justify={"space-evenly"} align={"center"}>
            <IconUserCircle size={200} color="dodgerblue" />
            <Flex
              style={dynamicWidthStyle}
              direction={"row"}
              justify={"space-between"}
              align={"flex-start"}
            >
              <Box>
                <Title>Personal</Title>
                <Text>Name: {user.name}</Text>
                <Text>Username: {user.username}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
                <Text>Website: {user.website}</Text>
              </Box>
              {user.address && (
                <Box>
                  <Title>Address</Title>
                  <Text>Street: {user.address.street}</Text>
                  <Text>Suite: {user.address.suite}</Text>
                  <Text>City: {user.address.city}</Text>
                </Box>
              )}

              {user.company && (
                <Box>
                  <Title>Company</Title>
                  <Text>Name: {user.company.name}</Text>
                  <Text>Catch Phrase: {user.company.catchPhrase}</Text>
                  <Text>BS: {user.company.bs}</Text>
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
      </Modal>
    </>
  );
};

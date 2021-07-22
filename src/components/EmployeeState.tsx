import { Box, Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { updateEmployeeState } from "../api/authService";
import { Employee } from "../types/Employee";

const boxStyles = {
  p: 20,
  border: "1px solid #EBEDF0",
  cursor: "pointer",
  _hover: {
    bg: "#1D5AD4",
    color: "white",
  },
};
const textStyles = {
  color: "inherit",
};
const STATES = {
  ADDED: "ADDED",
  IN_CHECK: "IN-CHECK",
  APPROVED: "APPROVED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};
export default function EmployeeState({ id, state }: Employee) {
  const [activeState, setActiveState] = useState<string>("");

  useEffect(() => {
    activeState === undefined && setActiveState(state);
  }, [activeState, state]);

  const handleStateSelect = (stateName: string) => {
    updateEmployeeState(id, stateName)
      .then(() => setActiveState(stateName))
      .catch((err) => console.error(err));
  };

  return (
    <Flex>
      {Object.keys(STATES).map((key) => (
        <Box
          {...boxStyles}
          key={key}
          bg={activeState === key ? "#1D5AD4" : ""}
          color={activeState === key ? "white" : ""}
          onClick={() => handleStateSelect(key)}
        >
          <Text {...textStyles}>{key}</Text>
        </Box>
      ))}
    </Flex>
  );
}

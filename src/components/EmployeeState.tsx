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
      <Box
        {...boxStyles}
        bg={activeState === STATES.ADDED ? "#1D5AD4" : ""}
        color={activeState === STATES.ADDED ? "white" : ""}
        onClick={() => handleStateSelect(STATES.ADDED)}
      >
        <Text {...textStyles}>{STATES.ADDED}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={activeState === STATES.IN_CHECK ? "#1D5AD4" : ""}
        color={activeState === STATES.IN_CHECK ? "white" : ""}
        onClick={() => handleStateSelect(STATES.IN_CHECK)}
      >
        <Text {...textStyles}>{STATES.IN_CHECK}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={activeState === STATES.APPROVED ? "#1D5AD4" : ""}
        color={activeState === STATES.APPROVED ? "white" : ""}
        onClick={() => handleStateSelect(STATES.APPROVED)}
      >
        <Text {...textStyles}>{STATES.APPROVED}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={activeState === STATES.ACTIVE ? "#1D5AD4" : ""}
        color={activeState === STATES.ACTIVE ? "white" : ""}
        onClick={() => handleStateSelect(STATES.ACTIVE)}
      >
        <Text {...textStyles}>{STATES.ACTIVE}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={activeState === STATES.INACTIVE ? "#1D5AD4" : ""}
        color={activeState === STATES.INACTIVE ? "white" : ""}
        onClick={() => handleStateSelect(STATES.INACTIVE)}
      >
        <Text {...textStyles}>{STATES.INACTIVE}</Text>
      </Box>
    </Flex>
  );
}

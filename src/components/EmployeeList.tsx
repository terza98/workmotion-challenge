import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { forwardRef, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  addNewEmployee,
  deleteEmployee,
  getAllEmployees,
} from "../api/authService";
import { Employee } from "../types/Employee";
import EmployeeState from "./EmployeeState";

const Paragraph = forwardRef<TextProps, "span">((props, ref) => (
  <Text fontWeight="bold" ml={4} ref={ref} {...props} />
));

export default function EmployeeList({ ...rest }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState<string>("");

  //on page mount load all employees
  useEffect(() => {
    if (employees.length === 0)
      getAllEmployees().then((res) => setEmployees(res.data));
  }, [employees]);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addNewEmployee(newEmployeeName).then((res) => {
      let newEmployees = [...employees, res.data];
      setEmployees(newEmployees);
    });
  };

  const handleDeleteEmployee = (id: number, index: number) => {
    deleteEmployee(id).then((res) => {
      let newEmployees = [...employees];
      if (index !== -1) {
        newEmployees.splice(index, 1);
      }
      setEmployees(newEmployees);
    });
  };

  return (
    <Box {...rest} textAlign="center">
      <form onSubmit={(e: React.SyntheticEvent) => onSubmit(e)}>
        <Flex mb={10} align="center" justify="end">
          <Text>Add new employee:</Text>
          <Input
            width="200px"
            placeholder="Employee Name:"
            name="employee-name"
            ml={10}
            onChange={(e) => setNewEmployeeName(e.target.value)}
          />
          <Button ml={10} type="submit">
            ADD
          </Button>
        </Flex>
      </form>
      {employees.length === 0 && (
        <Box textAlign="center">
          <Text>There are no existing employees</Text>
        </Box>
      )}
      {employees?.map((employee, index) => (
        <Box key={employee.id} my={20}>
          <Flex align="center" mb={4}>
            <Text>
              ID:
              <Paragraph>{employee.id}</Paragraph>
            </Text>
            <Text ml={10}>
              NAME:
              <Paragraph>{employee.name}</Paragraph>
            </Text>
            <Text ml={10}>
              CREATED AT:
              <Paragraph>{employee.createdAt}</Paragraph>
            </Text>
            <Button
              ml={20}
              onClick={() => handleDeleteEmployee(employee.id, index)}
            >
              Delete this employee
            </Button>
          </Flex>
          <EmployeeState
            id={employee.id}
            state={employee.state}
            name={employee.name}
          />
        </Box>
      ))}
    </Box>
  );
}

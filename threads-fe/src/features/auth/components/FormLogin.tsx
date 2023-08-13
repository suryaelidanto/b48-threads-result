import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";

export function FormLogin() {
  const { handleChange, handleLogin } = useLogin()

  return (
    <FormControl
      isRequired
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      width={"300px"}
    >
      <Text color={"brand.green"} fontSize={"2xl"} fontWeight={"bold"}>
        Connect
      </Text>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Login Connect
      </Text>
      <Input placeholder="Email" name="email" onChange={handleChange} />
      <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
      <Box display="flex" justifyContent={"flex-end"}>
        <Text>Forgot password?</Text>
      </Box>
      <Button backgroundColor={"green"} colorScheme="green" color={"white"} onClick={handleLogin}>
        Login
      </Button>
    </FormControl>
  );
}

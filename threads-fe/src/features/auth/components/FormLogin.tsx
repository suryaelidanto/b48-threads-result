import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";

export function FormLogin() {
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
      <Input placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Box display="flex" justifyContent={"flex-end"}>
        <Text>Forgot password?</Text>
      </Box>
      <Button backgroundColor={"green"} colorScheme="green" color={"white"}>
        Login
      </Button>
    </FormControl>
  );
}

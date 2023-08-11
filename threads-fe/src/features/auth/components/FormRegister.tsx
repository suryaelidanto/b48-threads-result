import { Button, FormControl, Input, Text } from "@chakra-ui/react";

export function FormRegister() {
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
        Create Account Connect
      </Text>
      <Input placeholder="First name" name="full_name" />
      <Input placeholder="Username" name="username" />
      <Input placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button backgroundColor={"green"} colorScheme="green" color={"white"}>Create</Button>
    </FormControl>
  );
}

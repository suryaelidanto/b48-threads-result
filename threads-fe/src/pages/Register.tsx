import { FormRegister } from "@/features/auth";
import { Box, Text } from "@chakra-ui/react";

export default function Register() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={"50px"}
    >
      <FormRegister />
      <Box display={"flex"} gap={2}>
        <Text>Already have account?</Text>
        <Text color={"brand.green"} cursor={"pointer"}>
          Login
        </Text>
      </Box>
    </Box>
  );
}

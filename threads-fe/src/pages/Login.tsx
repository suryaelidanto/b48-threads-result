import { FormLogin } from "@/features/auth";
import { Box, Text } from "@chakra-ui/react";

export default function Login() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={"50px"}
    >
      <FormLogin />
      <Box display={"flex"} gap={2}>
        <Text>Don't have an account yet?</Text>
        <Text color={"brand.green"} cursor={"pointer"}>
          Create account
        </Text>
      </Box>
    </Box>
  );
}

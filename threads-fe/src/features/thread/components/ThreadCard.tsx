import { Box, Button, Image, Text } from "@chakra-ui/react";

interface User {
  id?: number,
  full_name?: string,
  username?: string,
  email?: string,
  picture?: string,
}

export interface ThreadCard {
  id?: number,
  user: User,
  posted_at?: string;
  content?: string;
  image?: string;
  likes_count?: number;
  replies_count?: number;
  is_liked: boolean;
}

// not hoisted
export function ThreadCard(props: ThreadCard) {
  return (
    <>
      <Box
        display={"flex"}
        width="500px"
        borderBottom={"2px solid white"}
        padding={"20px 0px"}
      >
        <Image
          src={props.user?.picture}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
        />
        <Box>
          <Box display={"flex"}>
            <Text>{props.user?.full_name}</Text>
            <Text color="grey">@{props.user?.username}</Text>
            <Text color="grey">{props.posted_at}</Text>
          </Box>
          <Text>{props.content}</Text>
          <Text>{props.image}</Text>
          <Box display={"flex"} gap={2} marginTop={"10px"}>
            <Button backgroundColor={props.is_liked ? "red" : "grey"}>
              {props.likes_count}
            </Button>
            <Button>{props.replies_count} Replies</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

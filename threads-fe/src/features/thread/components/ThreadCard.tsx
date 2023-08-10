import { IThreadCard } from "@/interfaces/thread";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

export function ThreadCard(props: IThreadCard) {
  const [showImage, setShowImage] = useState<boolean>(true);

  return (
    <>
      <Box
        display={"flex"}
        width="100%"
        borderBottom={"1px solid white"}
        padding={"20px 0px"}
      >
        <Image
          src={
            props.user?.picture ? props.user?.picture : "/user-placeholder.png"
          }
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
          alt="user_profile_image"
        />

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"}>
            <Text>{props.user?.full_name}</Text>
            <Text color="brand.grey">@{props.user?.username}</Text>
            <Text color="brand.grey">{props.posted_at}</Text>
          </Box>
          <Text>{props.content}</Text>
          {showImage && (
            <Image
              src={props.image}
              onError={() => setShowImage(false)}
              alt="content_image"
            />
          )}

          <Box display={"flex"} gap={2} marginTop={"10px"}>
            <Button backgroundColor={props.is_liked ? "red" : "brand.grey"}>
              {props.likes_count}
            </Button>
            <Button>{props.replies_count} Replies</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { IFollow } from "@/interfaces/follow";
import { API } from "@/libs/api";
import { Box, Button, Image, Text } from "@chakra-ui/react";

export function FollowCard(props: IFollow) {
  async function handleFollow(followedUserId: number, isFollowed: boolean) {
    try {
      if (!isFollowed) {
        const response = await API.post(`/follow`, {
          followed_user_id: followedUserId,
        });
        console.log("berhasil follow!", response.data);
      } else {
        const response = await API.delete(`/follow/${followedUserId}`);
        console.log("berhasil unfollow!", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Box display={"flex"} width="100%" padding={"20px 0px"}>
        <Image
          src={props.picture ?? "/user-placeholder.png"}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
          alt="user_profile_image"
        />

        <Box display={"flex"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
            <Box display={"flex"}>
              <Text>{props.full_name}</Text>
            </Box>
            <Text color="brand.grey">@{props.username}</Text>
            <Text>{props.description}</Text>
          </Box>
          <Box flex={1} display="flex" justifyContent={"flex-end"}>
            <Button onClick={() => handleFollow(props.id, props.is_followed)}>
              {props.is_followed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

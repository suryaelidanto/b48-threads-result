import { ThreadCard, useThreadDetail } from "@/features/thread";
import { Box, FormControl, Image, Input, Text } from "@chakra-ui/react";

export default function Detail() {
  const { thread, handlePost, handleChange, replies } = useThreadDetail();

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          width="600px"
          borderRight={"1px solid"}
          borderLeft={"1px solid"}
          borderColor={"brand.grey"}
          padding={"20px"}
        >
          <ThreadCard
            id={thread?.id}
            user={thread?.user}
            content={thread?.content}
            posted_at={thread?.posted_at}
            image={thread?.image}
            likes_count={thread?.likes_count}
            replies_count={thread?.replies_count}
          />
          <Box marginTop={"20px"}>
            <form onSubmit={handlePost} encType="multipart/form-data">
              <FormControl display={"flex"} flexDirection={"column"} gap={2}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Input
                    placeholder="What is happening?!"
                    name="content"
                    onChange={handleChange}
                  />
                  <Input
                    type="submit"
                    backgroundColor={"brand.green"}
                    color={"white"}
                    colorScheme="green"
                    value={"Post"}
                    fontSize={"12px"}
                    width={"70px"}
                  />
                </Box>
              </FormControl>
            </form>
          </Box>
          <Box>
            {replies?.map((reply) => {
              return (
                <Box
                  key={reply.id}
                  display={"flex"}
                  alignItems={"center"}
                  width={"600px"}
                  padding={"20px"}
                >
                  <Image
                    src={
                      reply.user?.picture
                        ? reply.user?.picture
                        : "/user-placeholder.png"
                    }
                    width={"50px"}
                    height={"50px"}
                    objectFit={"cover"}
                    borderRadius={"50%"}
                    marginRight={"20px"}
                    alt="user_profile_image"
                  />
                  <Text>{reply.content} </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

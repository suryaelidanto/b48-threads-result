import { ThreadCard } from "@/features/thread";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useThreads } from "@/features/thread";

export default function Home() {
  const { handleChange, handlePost, threads } = useThreads()

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
          <FormControl display={"flex"} flexDirection={"column"} gap={2}>
            <FormLabel>Content</FormLabel>
            <Input
              placeholder="isikan apa yang kamu pikirkan..."
              name="content"
              onChange={handleChange}
            />
            <Input
              placeholder="image..."
              name="image"
              onChange={handleChange}
            />
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                backgroundColor={"brand.green"}
                color={"white"}
                colorScheme="green"
                onClick={handlePost}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
          {threads?.map((item) => {
            return (
              <ThreadCard
                key={item.id}
                user={item.user}
                content={item.content}
                likes_count={item.likes_count}
                posted_at={item.posted_at}
                replies_count={item.replies_count}
                image={item.image}
                is_liked={item.is_liked}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}

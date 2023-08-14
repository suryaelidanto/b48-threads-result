import { ThreadCard, useThreads } from "@/features/thread";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { BiSolidImageAdd } from "react-icons/bi";

export default function Home() {
  const { handleChange, handlePost, threads, fileInputRef, handleButtonClick } =
    useThreads();

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
          <form onSubmit={handlePost} encType="multipart/form-data">
            <FormControl display={"flex"} flexDirection={"column"} gap={2}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Input
                  placeholder="What is happening?!"
                  name="content"
                  onChange={handleChange}
                />
                <Button
                  variant={"ghost"}
                  color={"brand.green"}
                  onClick={handleButtonClick}
                >
                  <BiSolidImageAdd
                    style={{
                      height: "50px",
                      width: "50px",
                    }}
                  />
                </Button>
                <Input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
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

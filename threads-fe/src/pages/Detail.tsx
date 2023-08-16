import { ThreadCard } from "@/features/thread";
import { IReplyPost } from "@/interfaces/reply";
import { IThreadCard } from "@/interfaces/thread";
import { API } from "@/libs/api";
import { Box, FormControl, Image, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [replies, setReplies] = useState<IThreadCard[]>();
  const [thread, setThread] = useState<IThreadCard>();
  const { id } = useParams();

  const [form, setForm] = useState<IReplyPost>({
    content: "",
    thread_id: parseInt(id as string),
  });

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const response = await API.post("/reply", form);
      console.log("berhasil menambahkan reply", response.data);
      getReplies();
    } catch (err) {
      console.log("gagal menambahkan reply", err);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function getData() {
    try {
      const response = await API.get(`/thread/${id}`);
      setThread(response.data);
      console.log("ini data thread detail", response.data);
    } catch (err) {
      console.log("gagal mengambil data thread by id : ", err);
    }
  }

  async function getReplies() {
    try {
      const response = await API.get(`/replies?thread_id=${id}`);
      setReplies(response.data);
      console.log("ini reply untuk thread id", response.data);
    } catch (err) {
      console.log("gagal mengambil replies data thread by id : ", err);
    }
  }

  useEffect(() => {
    getData();
    getReplies();
  }, []);

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

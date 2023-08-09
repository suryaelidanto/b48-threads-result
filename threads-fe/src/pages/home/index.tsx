import { ThreadCard } from "@/features/thread";
import { API } from "@/libs/api";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

interface ThreadPost {
  content: string,
  image?: string,
}

export function Home() {
  const [threads, setThreads] = useState<ThreadCard[]>();
  const [form, setForm] = useState<ThreadPost>({
    content: "",
    image: "",
  })

  async function getThreads() {
    const response = await API.get('/threads')
    console.log("ini threads", response.data)
    setThreads(response.data)
  }

  async function handlePost() {
    const response = await API.post('/thread', form)
    console.log("berhasil menambahkan thread", response)
    getThreads()
  }

  useEffect(() => {
    getThreads()
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          width={"300px"}
          height={"fit-content"}
          position={"fixed"}
          left={"30px"}
          top={"30px"}
        >
          <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
            <Text fontWeight={"bold"} fontSize={"50px"} color={"green"}>
              Circle
            </Text>
            <Button display={"flex"} justifyContent={"flex-start"} variant={"ghost"}>
              <AiFillHome />
              <Text marginLeft={"10px"}>Home</Text>
            </Button>
            <Button display={"flex"} justifyContent={"flex-start"} variant={"ghost"}>
              <AiOutlineSearch />
              <Text marginLeft={"10px"}>Search</Text>
            </Button>
            <Button display={"flex"} justifyContent={"flex-start"} variant={"ghost"}>
              <AiOutlineHeart />
              <Text marginLeft={"10px"}>Follows</Text>
            </Button>
            <Button display={"flex"} justifyContent={"flex-start"} variant={"ghost"}>
              <AiOutlineUser />
              <Text marginLeft={"10px"}>Profile</Text>
            </Button>
            <Button
              bgColor={"green"}
              colorScheme="green"
              color="white"
              borderRadius={"30px"}
              marginTop={"30px"}
            >
              <Text>Create Post</Text>
            </Button>
          </Box>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          padding={"10px"}
        >
          <FormControl display={"flex"} flexDirection={"column"} gap={2}>
            <FormLabel>Content</FormLabel>
            <Input placeholder="isikan apa yang kamu pikirkan..." name="content" onChange={handleChange} />
            <Input placeholder="image..." name="image" onChange={handleChange} />
            <Box display={"flex"} justifyContent={"end"}>
              <Button backgroundColor={"green"} color={"white"} colorScheme="green" onClick={handlePost}>Submit</Button>
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

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={5}
          position={"fixed"}
          right={"30px"}
          top={"30px"}
        >
          <Box display={"flex"} width={"300px"} height={"fit-content"}>
            <Card width={"100%"}>
              <Text fontWeight={"bold"} marginLeft={"10px"} marginTop={"10px"}>
                My Profile
              </Text>
              <Box>
                <Image
                  src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985001.jpg&fm=jpg"
                  objectFit={"cover"}
                  padding={"10px"}
                  borderRadius={"20px"}
                  height={"100px"}
                  width={"100%"}
                />
                <Avatar
                  src="https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
                  position={"absolute"}
                  border={"2px solid black"}
                  top={70}
                  left={5}
                  width={"75px"}
                  height={"75px"}
                />
              </Box>
              <CardBody>
                <Text fontWeight={"bold"}>Surya Elidanto</Text>
                <Text>@suryaelidanto</Text>
                <Text>Life's too short, be badass</Text>
                <Box display={"flex"} gap={3}>
                  <Box display={"flex"} gap={2}>
                    <Text fontWeight={"bold"}>291</Text>
                    <Text>Following</Text>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Text fontWeight={"bold"}>23</Text>
                    <Text>Followers</Text>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Box>

          <Box display={"flex"} width={"300px"} height={"fit-content"}>
            <Card width={"100%"}>
              <Text fontWeight={"bold"} marginLeft={"10px"} marginTop={"10px"}>
                Suggested for You
              </Text>
              <CardBody display={"flex"} gap={2}>
                <Avatar
                  src="https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
                  border={"2px solid black"}
                />
                <Box display={"flex"} flexDirection={"column"}>
                  <Text fontWeight={"bold"}>Muhammad Jawahir</Text>
                  <Text color={"grey"}>@em.jawahir</Text>
                </Box>
                <Button variant={"outline"}>Follow</Button>
              </CardBody>
            </Card>
          </Box>

          <Card>
            <CardBody display={"flex"} alignItems={"center"} gap={2}>
              <Text fontSize={"12px"} fontWeight={"bold"}>
                Developed by SuryaElz
              </Text>
              <AiFillGithub />
              <AiFillLinkedin />
              <AiFillFacebook />
              <AiFillInstagram />
            </CardBody>
          </Card>
        </Box>
      </Box>
    </>
  );
}

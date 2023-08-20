import { IThreadCard } from "@/interfaces/thread";
import { API } from "@/libs/api";
import { GET_THREADS, SET_LIKE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ThreadCard(props: IThreadCard) {
  const [showImage, setShowImage] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread);

  function loopMyThings(thread_id: number | undefined, threads: IThreadCard[]) {
    return new Promise((resolve, reject) => {
      const tempThreads: IThreadCard[] = [];

      threads.forEach((thread) => {
        const likes_count = thread.is_liked
          ? (thread.likes_count ? thread.likes_count : 0) - 1
          : (thread.likes_count ? thread.likes_count : 0) + 1;

        if (thread.id === thread_id) {
          tempThreads.push({
            ...thread,
            is_liked: !thread.is_liked,
            likes_count: likes_count,
          });
        } else {
          tempThreads.push(thread);
        }

        resolve(tempThreads);
      });
    });
  }

  async function handlePostLike(
    thread_id: number | undefined,
    is_liked: boolean | undefined
  ) {
    if (!is_liked) {
      const newThreads = await loopMyThings(thread_id, threads);
      console.log("ini new threads post", newThreads);
      dispatch(GET_THREADS(newThreads));
      const response = await API.post("/like", { thread_id: thread_id });
      console.log("berhasil menambahkan like", response.data);
    } else {
      const newThreads = await loopMyThings(thread_id, threads);
      console.log("ini new threads delete", newThreads);
      dispatch(GET_THREADS(newThreads));
      const response = await API.delete(`/like/${thread_id}`);
      console.log("berhasil delete like", response.data);
    }
  }

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

        <Box display={"flex"} flexDirection={"column"}>
          <Box
            cursor={"pointer"}
            onClick={() => navigate(`/detail/${props.id}`)}
          >
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
            </Box>
          </Box>

          <Box display={"flex"} gap={2} marginTop={"10px"}>
            <Button
              backgroundColor={props.is_liked ? "red" : "brand.grey"}
              onClick={() => handlePostLike(props.id, props.is_liked)}
            >
              {props.likes_count}
            </Button>
            <Button>{props.replies_count} Replies</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

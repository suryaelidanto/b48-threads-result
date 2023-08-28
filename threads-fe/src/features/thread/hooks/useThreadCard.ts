import { API } from "@/libs/api";
import { SET_THREAD_LIKE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { useDispatch, useSelector } from "react-redux";

export function useThreadCard() {
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread.threads);

  async function handlePostLike(id: number, isLiked: boolean) {
    try {
      if (!isLiked) {
        await API.post("/like", { thread_id: id });
        // console.log("berhasil menambahkan like", response.data);
      } else {
        await API.delete(`/like/${id}`);
        // console.log("berhasil delete like", response.data);
      }
      dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }));
    } catch (err) {
      console.log("Failed updating like!", err);
    }
  }

  return {
    threads,
    handlePostLike,
  };
}

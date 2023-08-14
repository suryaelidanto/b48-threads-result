import { IThreadCard, IThreadPost } from "@/interfaces/thread";
import { API } from "@/libs/api";
import { ChangeEvent, useEffect, useState, useRef, FormEvent } from "react";

export function useThreads() {
  const [threads, setThreads] = useState<IThreadCard[]>();
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });

  async function getThreads() {
    const response = await API.get("/threads");
    console.log("ini threads", response.data);
    setThreads(response.data);
  }

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // console.log(form);
    console.log("test image", form.image);

    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("image", form.image as File);

    const response = await API.post("/thread", formData);
    console.log("berhasil menambahkan thread", response);
    getThreads();
  }

  useEffect(() => {
    getThreads();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    console.log("testing", name, value, files);

    if (files) {
      console.log("masuk file");
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      console.log("masuk biasa");
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  return { handleChange, handlePost, threads, fileInputRef, handleButtonClick };
}

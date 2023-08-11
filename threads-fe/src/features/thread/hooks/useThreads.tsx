import { IThreadCard, IThreadPost } from "@/interfaces/thread";
import { API } from "@/libs/api";
import { ChangeEvent, useEffect, useState } from "react";

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

    async function handlePost() {
        const response = await API.post("/thread", form);
        console.log("berhasil menambahkan thread", response);
        getThreads();
    }

    useEffect(() => {
        getThreads();
    }, []);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    return { handleChange, handlePost, threads }

}
import { IUserLogin } from '@/interfaces/user';
import { API, setAuthToken } from '@/libs/api';
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGIN } from '@/stores/rootReducer';
import { useDispatch } from 'react-redux';


export function useLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [form, setForm] = useState<IUserLogin>({
        email: "",
        password: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    async function handleLogin() {
        try {
            const response = await API.post('/auth/login', form)
            dispatch(AUTH_LOGIN(response.data))
            // console.log("login berhasil", response.data.token)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return { handleChange, handleLogin }

}
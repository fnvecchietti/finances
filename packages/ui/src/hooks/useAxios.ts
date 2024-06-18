import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react"


export const useAxios = ({url, method, body = null}: {url: string, method: 'get' | 'post' | 'put' | 'patch', body: any}) => {
    const [response, setResponse ] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState<AxiosError | string>('')
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        axios[method](url,body)
        .then((res)=> {
            setResponse(res.data)
        })
        .catch((err)=> {
            setError(err)
        })
        .finally(()=> {
            setLoading(false)
        })
    }

    useEffect(()=> {
        console.log(method, url, body);
        
        fetchData();
    },[method,url,body])

    return {response, error, loading, setLoading}
}
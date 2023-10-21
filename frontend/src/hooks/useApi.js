import { useState, useEffect } from "react";
import axios from "axios";

export function useApi(url) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const TIMEOUT = 1000;

    // Link to docs:https://axios-http.com/docs/cancellation...
    useEffect(() => {
        const controller = new AbortController();   // instance of AbortController...
        setLoading(true);

        const getDataFromApi = async () => {
            try {
                const response = await axios.get(url, {
                    signal: controller.signal,
                })
    
                const data = await response.data;
                setResult([...data]);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                setError(true);
                console.log(`ERROR:${err}`);
            }
        }

        getDataFromApi();
        const timer = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);    // after 1 second the request will be aborted...

        return () => clearTimeout(timer);
        // controller.abort();
    }, [url]);

    return [result, loading, error];
}
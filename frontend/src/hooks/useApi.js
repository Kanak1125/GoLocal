import { useState, useEffect } from "react";
import axios from "axios";

export function useApi(url) {
    const [result, setResult] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("idle");
    const TIMEOUT = 5000;

    // Link to docs:https://axios-http.com/docs/cancellation...
    useEffect(() => {
        // const controller = new AbortController();   // instance of AbortController...
        const timer = setTimeout(() => {
            if (fetchStatus !== "success" || fetchStatus !== "error") {
                setFetchStatus("delayed");
            }
        }, TIMEOUT);    // after 5 secs the request will be aborted...

        console.log(fetchStatus);

        const getDataFromApi = async () => {
            setFetchStatus("loading");
            try {
                const response = await axios.get(url)
                const data = await response.data;
                setResult([...data]);
                setFetchStatus("success");
                clearTimeout(timer);
            } catch(err) {
                setFetchStatus("error");
                console.log(`ERROR:${err}`);
                clearTimeout(timer);
            }
        }

        getDataFromApi();

        return () => clearTimeout(timer);
    }, [url]);

    return [result, setResult, fetchStatus];
}
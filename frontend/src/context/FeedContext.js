import  { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const FeedContext = createContext();

export function useFeedContext() {
    return useContext(FeedContext);
}

export function FeedProvider({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log(data);
    useEffect(() => {
        setLoading(true);

        const getDataFromApi = async () => {
        try {
            const response = await axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/post-create-list/",
            });

            const data = await response.data;
            setData([...data]);
            setLoading(false);
        } catch (err) {
            console.log(`ERROR:${err}`);
            setLoading(false);
        }
        };

        getDataFromApi();
        console.log(data);
    }, []);

    return (
        <FeedContext.Provider value={{
            feedData: data,
        }}>
            {!loading && children}
        </FeedContext.Provider>
    )
}
import  { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useApi } from '../hooks/useApi';

const FeedContext = createContext();

export function useFeedContext() {
    return useContext(FeedContext);
}

export function FeedProvider({ children }) {
    const [data, setData] = useState([]);

    const [ result, loading, error ] = useApi('http://127.0.0.1:8000/api/post-create-list/');
    
    useEffect(() => {
        if (error) {
            setData([]);
        } else {
            setData([...result]);
        }
    }, [result]);
    console.log(result);

    return (
        <FeedContext.Provider value={{
            feedData: data,
        }}>
            {!loading && children}
        </FeedContext.Provider>
    )
}
import  { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useApi } from '../hooks/useApi';

const FeedContext = createContext();

export function useFeedContext() {
    return useContext(FeedContext);
}

export function FeedProvider({ children }) {
    const [ result, setResult, fetchStatus ] = useApi('http://127.0.0.1:8000/api/post-create-list/');
    
    console.log(result);

    return (
        <FeedContext.Provider value={{
            feedData: result,
            setFeedData: setResult,
            fetchStatus: fetchStatus,
        }}>
            {fetchStatus !== "loading" && children}
        </FeedContext.Provider>
    )
}
import { useState, useEffect } from 'react'

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);

        if(jsonValue !== null) return JSON.parse(jsonValue);

        return (typeof initValue === 'function') ? initValue() : initValue;   // if the initValue is 'function' type it will return the function version of state to the value else returns the initValue to the 'value' state...
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage
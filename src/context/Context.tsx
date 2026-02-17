import React, { useState, useEffect, createContext } from 'react';

type ApiContextType = {
    data: any;
    loading: boolean;
    error: boolean;
};

const ApiContent = createContext<ApiContextType>({
    data: null,
    loading: true,
    error: false,
});

function Dataprovider({children}: {children: React.ReactNode}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const apiData = () => {
        fetch("/data.json").then(async (res)=>setData(await res.json())).catch(()=>setError(true)).finally(()=>setLoading(false));
    }

    useEffect(() => {
        apiData();
    }, []);

    return (
        <ApiContent.Provider value={{data, loading, error}}>
            {children}
        </ApiContent.Provider>
    );
}

export const useData = () => React.useContext(ApiContent);

export { ApiContent, Dataprovider };
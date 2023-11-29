import React, { useState, createContext, ReactNode } from 'react';

interface ContextGlobalProps {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    // loading: boolean;
    // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContextGlobalPropsDefault = {
    token: "",
    setToken: function () { },
    // loading: false,
    // setLoading: function () { }
}

export const ContextGlobal = createContext<ContextGlobalProps>(ContextGlobalPropsDefault);

export const StoreGlobal: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(sessionStorage.token || '');

    return (
        <ContextGlobal.Provider value={{ token, setToken }}>
            {children}
        </ContextGlobal.Provider>
    );
};
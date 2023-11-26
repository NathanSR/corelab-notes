// Esse context serve como uma variável global que pode ser acessada em qualquer parte do sistema
import React, { useState, createContext, ReactNode } from 'react';

interface ContextGlobalProps {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const ContextGlobalPropsDefault = {
    token: "",
    setToken: function () { }
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
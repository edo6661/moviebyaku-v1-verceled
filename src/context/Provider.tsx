import { ReactNode, useState } from 'react';
import context from './context';
interface Props {
    children: ReactNode
}
export const ContextProvider = ({ children }: Props) => {
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleTerm = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

    return (
        <context.Provider value={{
            // ! search
            search, setSearch, searchTerm, setSearchTerm, handleTerm
        }}>
            {children}
        </context.Provider>
    )
}
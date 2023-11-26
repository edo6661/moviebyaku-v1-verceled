import { ReactNode } from 'react';
import context from './context';
interface Props {
    children: ReactNode
}
export const ContextProvider = ({ children }: Props) => {
    // const [search, setSearch] = useState(false);
    // const [searchTerm, setSearchTerm] = useState('');
    return (
        <context.Provider value={{

        }}>
            {children}
        </context.Provider>
    )
}
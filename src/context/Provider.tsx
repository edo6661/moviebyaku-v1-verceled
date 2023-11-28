import { ReactNode, useState } from 'react';
import { useFavoriteStatusQuery, useGetWatchListMovQuery } from '../features/movie/movieApiSlice';
import useStatus from '../hooks/useStatus';
import context from './context';
interface Props {
    children: ReactNode
}
export const ContextProvider = ({ children }: Props) => {
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorite, setFavorite] = useState<Record<string, boolean>>({});
    const [watchlist, setWatchlist] = useState<Record<string, boolean>>({});

    const temporaryArg = { account_id: '20730095', page: '1' };
    const { data: favoriteStatus } = useFavoriteStatusQuery(temporaryArg);
    const { data: watchListStatus } = useGetWatchListMovQuery(temporaryArg)

    // ! search
    const handleTerm = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

    // ! toggle status post request
    useStatus(favoriteStatus, setFavorite)
    useStatus(watchListStatus, setWatchlist)

    return (
        <context.Provider value={{
            // ! search
            search, setSearch, searchTerm, setSearchTerm, handleTerm,
            // ! check and toggle post data
            favorite, watchlist, setWatchlist, setFavorite
        }}>
            {children}
        </context.Provider>
    )
}
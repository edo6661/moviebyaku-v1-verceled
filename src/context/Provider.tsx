import { ReactNode, useEffect, useState } from 'react';
import { useFavoriteStatusQuery, useGetWatchListMovQuery } from '../features/movie/movieApiSlice';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../helpers/getSetLocal';
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
    const [requestToken, setRequestToken] = useState("")

    const [profile, setProfile] = useState<ResponseAccount>({
        avatar: { gravatar: { hash: '' }, tmdb: { avatar_path: '' } },
        id: 0,
        iso_639_1: '',
        iso_3166_1: '',
        name: '',
        include_adult: false,
        username: '',
    });
    const temporaryArg = { account_id: '20730095', page: '1' };
    const { data: favoriteStatus } = useFavoriteStatusQuery(temporaryArg);
    const { data: watchListStatus } = useGetWatchListMovQuery(temporaryArg);

    // ! search
    const handleTerm = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

    // ! toggle status post request
    useStatus(favoriteStatus, setFavorite)
    useStatus(watchListStatus, setWatchlist)

    // ! save token
    const [localToken, setLocalToken] = useState(getItemFromLocalStorage('initialToken'));

    useEffect(() => {
        setItemInLocalStorage('token', localToken);
    }, [localToken]);

    return (
        <context.Provider value={{
            // ! search
            search, setSearch, searchTerm, setSearchTerm, handleTerm,
            // ! check and toggle post data
            favorite, watchlist, setWatchlist, setFavorite,
            // ! request token
            requestToken, setRequestToken, localToken, setLocalToken, profile, setProfile
        }}>
            {children}
        </context.Provider>
    )
}
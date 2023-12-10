import { ReactNode, useState } from 'react';
import { useFavoriteStatusQuery, useGetWatchListMovQuery } from '../features/movie/movieApiSlice';
import { initialProfile } from '../helpers/initialProfile';
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
    const [profile, setProfile] = useState<ResponseAccount>(initialProfile);
    const [sessionId, setSessionId] = useState('')
    const [isExpandImage, setIsExpandImages] = useState(false)

    const temporaryArg = { account_id: profile.id.toString(), page: '1', session_id: sessionId };
    const { data: favoriteStatus } = useFavoriteStatusQuery(temporaryArg);
    const { data: watchListStatus } = useGetWatchListMovQuery(temporaryArg);

    // ! search
    const handleTerm = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

    // ! toggle status post request
    useStatus(favoriteStatus, setFavorite)
    useStatus(watchListStatus, setWatchlist)

    // ! image expand single page

    const trueExpandImage = () => setIsExpandImages(true)
    const falseExpandImage = () => setIsExpandImages(false)

    return (
        <context.Provider value={{
            // ! search
            search, setSearch, searchTerm, setSearchTerm, handleTerm,
            // ! check and toggle post data
            favorite, watchlist, setWatchlist, setFavorite,
            // ! request token
            requestToken, setRequestToken, profile, setProfile, setSessionId, sessionId,
            // ! image expand single page
            isExpandImage, setIsExpandImages, trueExpandImage, falseExpandImage
        }}>
            {children}
        </context.Provider>
    )
}
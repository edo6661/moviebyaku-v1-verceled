import { FaFacebook, FaImdb, FaInstagram, FaTwitter, FaWikipediaW } from "react-icons/fa";
import { useExternalIdQuery } from "../../features/movie/movieApiSlice";
import OptionsButton from '../OptionsButton';
import ErrorMessage from "../errAndLoading/TemporaryError";
import HoverIconLink from "./HoverIconLink";

const MovieDetails = ({ title, release_date, genres, tagline, overview, vote_average, idParams, id }: MovieDetails) => {
    let notNullId = ''
    if (idParams) {
        notNullId = id
    }

    const { data: external, isError: isErrE, isLoading: loadingE, error: errE } = useExternalIdQuery(id ?? '')
    const errMsgE = isErrE && errE && <ErrorMessage error={errE} />

    let percentageVote;
    if (vote_average) percentageVote = Math.round(vote_average * 10)

    if (isErrE) return errMsgE

    const links = [
        { id: external?.facebook_id, IconComponent: FaFacebook, color: "#4267B2", base: "https://www.facebook.com/" },
        { id: external?.twitter_id, IconComponent: FaTwitter, color: "#1DA1F2", base: "https://twitter.com/" },
        { id: external?.instagram_id, IconComponent: FaInstagram, color: "#405DE6", base: "https://www.instagram.com/" },
        { id: external?.wikidata_id, IconComponent: FaWikipediaW, color: "#C0C0C0", base: "https://www.wikidata.org/wiki/" },
        { id: external?.imdb_id, IconComponent: FaImdb, color: "#deb522", base: "https://www.imdb.com/title/" },
    ];

    const moreDetails = (
        <>
            <p className=' text-myWhite opacity-80'>{tagline}</p>
            <p className="sm:text-xl text-lg font-semibold">{overview?.length ? 'Overview' : 'No Overview'}</p>
            <p className="sm:text-lg text-base">{overview?.length ? overview : ''}</p>

        </>
    )


    return (
        <div className='detailsSingleMovie  '>
            <h2 className=' '>{title} <span className='text-myWhite'>({release_date.substring(0, 4)})</span></h2>
            <div className='secondDetailsSingleMovie'>
                {release_date && <p>({release_date}) (US)</p>}
                <div className='flex gap-1'>
                    {genres.map(g =>
                        <p key={g.name}>{g.name}</p>
                    )}
                </div>
            </div>
            <OptionsButton id={notNullId} percentageVote={percentageVote} />
            {moreDetails}
            {!loadingE && external &&
                <div className="flex gap-2 mt-2 ">
                    {links.map((link) => link.id && <HoverIconLink key={link.id} IconComponent={link.IconComponent} color={link.color} to={`${link.base}${link.id}`} />)}
                </div>
            }
        </div>
    )
}

export default MovieDetails
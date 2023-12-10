import MediaItem from "./MediaItem";
import SearchPagePagination from "./SearchPagePagination";

interface Props {
    data: DataMulti | undefined
    page: string;
    handlePage: (i: string) => void
}

const MediaList = ({ data, page, handlePage }: Props) => {
    return (
        data?.results.length ? (
            <div className="detailsSearchPage">
                {data?.results.map((media) => {
                    return (
                        <MediaItem key={media.id} media={media} />
                    )
                })}

                {data?.total_pages > 1 && <SearchPagePagination data={data} page={page} handlePage={handlePage} />}
            </div>
        ) : ''
    );
};

export default MediaList
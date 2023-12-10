// Komponen GenreButton
interface Props {
    genre: Genre;
    isActiveGenre: Record<string, boolean>;
    handleActiveGenre: (id: string) => void;
}
const GenreButton = ({ genre, isActiveGenre, handleActiveGenre }: Props) => {
    const activeGenre = isActiveGenre[genre.id.toString()] ? 'dark:bg-darkBlue bg-lightBlue transition-all duration-300 text-white' : '';
    return (
        <div key={genre.id}>
            <button className={`py-1 px-3 rounded-xl shadowCard ${activeGenre} focus:outline-none focus:outline-darkBlue`} onClick={() => handleActiveGenre(genre.id.toString())}>
                {genre.name}
            </button>
        </div>
    );
};

export default GenreButton

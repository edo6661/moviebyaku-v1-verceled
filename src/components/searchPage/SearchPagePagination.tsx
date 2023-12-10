interface Props {
    data: DataMulti;
    page: string;
    handlePage: (i: string) => void;
}

const SearchPagePagination = ({ data, page, handlePage }: Props) => {

    // ! menampilkan 1 dan 1 nomor sebelum current page
    const startPage = Math.max(1, +page - 1);
    // ! menampilkan total page dan 1 nomor sesudah current page
    const lastPage = Math.min(data.total_pages, +page + 1);

    const pageNumbers = [];

    for (let i = startPage; i <= lastPage; i++) {
        pageNumbers.push(i);
    }
    // ! kalo startPage lebih besar dari 1 menampilkan 1 dan ...
    if (startPage > 1) {
        pageNumbers.unshift('...');
        pageNumbers.unshift(1);
    }
    // ! nampilin total page dari awal
    if (lastPage < data.total_pages) {
        pageNumbers.push('...');
        pageNumbers.push(data.total_pages);
    }


    return (
        <div className="mx-auto mt-8 flex flex-wrap">
            {pageNumbers.map((number, index) => {
                const isFirst = index === 0 ? 'rounded-l-md' : '';
                const isLast = index === pageNumbers.length - 1 ? 'rounded-r-md' : '';
                const currentPageStyle = page === number.toString() ? 'opacity-70' : '';

                const dot = number === '...'
                const validNumber = dot && 'cursor-not-allowed'

                return (
                    <button className={`buttonPagination duration-200 ${isFirst} ${isLast} ${currentPageStyle} ${validNumber} ${!dot && 'hover:opacity-80'} `} key={index}
                        onClick={() => {
                            !dot && handlePage(number.toString())
                        }}>
                        {number}
                    </button>
                );
            })}
        </div >
    );
};

export default SearchPagePagination
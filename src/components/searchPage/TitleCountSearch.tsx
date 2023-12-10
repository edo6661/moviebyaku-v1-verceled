interface Props {
    title: string; total: number | undefined; handleType: (title: string) => void; type: string;
}
const TitleCountSearch = ({ title, total, handleType, type }: Props) => {

    const activeType = type === title ? 'opacity-50' : ''

    return (
        <button className={`sortingSearch ${activeType}`} onClick={() => handleType(title)}>
            <p>{title}</p>
            <span >{total}</span>
        </button>
    )
}


export default TitleCountSearch
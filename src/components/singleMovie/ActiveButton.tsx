type MyButtonProps = {
    active: boolean;
    setActive: () => void;
    label: string;
    count: number;
};
function MyButton({ active, setActive, label, count }: MyButtonProps) {
    const shadow = 'shadowButtonImgSliderMedia';
    return (
        <button
            className={`buttonImgSliderMedia ${active ? shadow : ' '}`}
            onClick={setActive}
        >
            {label} <span >{count}</span>
        </button>
    );
}

export default MyButton;


const PercentageVote = ({ percentageVote }: { percentageVote: number }) => {
    return (
        <div className="score-circle">
            <svg viewBox="0 0 36 36">
                <path className="circle-bg"
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="circle"
                    // className={percentageVote < 40 ? 'stroke-red-500' : percentageVote > 40 ? 'stroke-yellow-500' : percentageVote > 60 ? 'stroke-green-500' : 'NR'}
                    // !  membuat efek “dash” pada stroke, dan panjang dash diatur berdasarkan percentageVote.
                    strokeDasharray={`${percentageVote}, 100`}
                    d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
            <p className="text-base text-white">{percentageVote}<sup>%</sup></p>
        </div>

    )
}

export default PercentageVote
import { useState } from 'react';
import { IconType } from 'react-icons';
const HoverIcon = ({ IconComponent, color, to }: { IconComponent: IconType; color: string; to: string }) => {

    const [hover, setHover] = useState(false)

    const hovered = () => setHover(true)
    const unhovered = () => setHover(false)

    return (
        <a href={to} target='_blank' rel='noopener noreferrer'>
            <span onMouseEnter={hovered} onMouseLeave={unhovered}>
                <IconComponent size={30} color={hover ? color : ''} />
            </span>
        </a>
    )
}

export default HoverIcon
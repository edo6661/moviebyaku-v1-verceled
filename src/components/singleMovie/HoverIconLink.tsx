import { IconType } from "react-icons";
import HoverIcon from "./HoverIcon";

function HoverIconLink({ IconComponent, color, to }: { IconComponent: IconType; color: string; to: string }) {

    return <HoverIcon IconComponent={IconComponent} color={color} to={to} />;
}

export default HoverIconLink
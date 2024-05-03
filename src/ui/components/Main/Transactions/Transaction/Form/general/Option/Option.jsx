import { components } from "react-select";
import cn from "./Option.module.css";
import { PermissionLabel } from "../PermissionLabel/PermissionLabel.jsx";



const getText = (publicKey) => publicKey.slice('ed25519:'.length);

export const Option = ({ children, ...props }) => (
  <components.Option {...props}>
    <div className={cn.container}>
      {getText(props.data.value)}
      <PermissionLabel permission={props.data.permission} />
    </div>
  </components.Option>
);
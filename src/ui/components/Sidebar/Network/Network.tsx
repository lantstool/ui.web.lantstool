import cn from "../Sidebar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const Network = () => {
  return (
    <div className={cn.subtitleGroup}>
      <h4 className={cn.subtitle}>TestNet</h4>
      <KeyboardArrowDownIcon style={{ color: 'white' }} />
    </div>
  )
}
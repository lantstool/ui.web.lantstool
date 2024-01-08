import cn from './RemoveButton.module.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const RemoveButton = ({ remove }: any) => {
  return (
    <button className={cn.removeButton} onClick={remove}>
      <DeleteOutlineOutlinedIcon className={cn.deleteIcon} sx={{ fontSize: 29 }} />
    </button>
  );
};

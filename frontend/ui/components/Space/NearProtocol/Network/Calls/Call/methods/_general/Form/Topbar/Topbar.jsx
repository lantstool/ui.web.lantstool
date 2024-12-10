import { Button } from '../../../../../../../../../_general/Button/Button.jsx';
import { EditName } from './EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { dateFormatter } from '../../../../../../../../../../../store/helpers/formatDate.js';
import { TrashBinOutline } from '../../../../../../../../../_general/icons/TrashBinOutline.jsx';
import { DuplicateOutline } from '../../../../../../../../../_general/icons/DuplicateOutline.jsx';
import { ExportLinear } from '../../../../../../../../../_general/icons/ExportLinear.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { useState } from 'react';
import cn from './Topbar.module.scss';

export const Topbar = ({ call }) => {
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.calls.duplicateOne);
  const [isOpen, setOpen] = useState(false);
  const { spaceId, networkId, callId } = useParams();

  const duplicate = () => duplicateOne({ spaceId, networkId, callId });
  const openModal = () => setOpen(true);

  return (
    <>
      <div className={cn.topbar}>
        <div className={cn.container}>
          <div>
            <EditName call={call} />
            <p className={cn.date}>Created {dateFormatter(call.createdAt)}</p>
          </div>
          <div className={cn.buttonWrapper}>
            <Tooltip arrow={false} content="Duplicate" placement="top">
              <Button
                onClick={duplicate}
                size="medium"
                color="secondary"
                IconLeft={DuplicateOutline}
              />
            </Tooltip>
            <Tooltip arrow={false} content="Export JSON" placement="top">
              <Button size="medium" color="secondary" IconLeft={ExportLinear} />
            </Tooltip>
            <Tooltip arrow={false} content="Delete" placement="top">
              <Button
                onClick={openModal}
                size="medium"
                color="secondary"
                IconLeft={TrashBinOutline}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {isOpen && <DeleteModal call={call} setOpen={setOpen} />}
    </>
  );
};

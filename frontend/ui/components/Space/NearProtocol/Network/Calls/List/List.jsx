import { useToggler } from '@hooks/useToggler.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { callImportSchema } from '../_general/validations/callImportSchema.js';
import { Item } from './Item/Item.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tooltip } from '../../../../../_general/Tooltip/Tooltip.jsx';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import cn from './List.module.scss';

export const List = ({ list }) => {
  const [isImportOpen, openImport, closeImport] = useToggler(false);
  const reorder = useStoreEffect((store) => store.nearProtocol.calls.reorder);
  const createOne = useStoreEffect((store) => store.nearProtocol.calls.createOne);
  const importOneFromJson = useStoreEffect((store) => store.nearProtocol.calls.importOneFromJson);
  const importOneFromFile = useStoreEffect((store) => store.nearProtocol.calls.importOneFromFile);

  const params = useParams();
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorder({
      source: result.source.index,
      destination: result.destination.index,
    });
  };

  const create = () => createOne({ spaceId, networkId, navigate });

  return (
    <>
      <div className={cn.list}>
        <div className={cn.topBar}>
          <button className={cn.createBtn} onClick={create}>
            <span className={cn.addIcon} />
            <h2 className={cn.title}>Create Call</h2>
          </button>
          <Tooltip style={cn.tooltip} arrow={false} content="Import Call" placement="top">
            <button className={cn.exportBtn} onClick={openImport}>
              <span className={cn.importIcon} />
            </button>
          </Tooltip>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="calls">
            {(provided) => (
              <div className={cn.scrollBar}>
                <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
                  {list.map((call, index) => (
                    <Item
                      key={call.callId}
                      isActive={call.callId === params?.callId}
                      call={call}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isImportOpen && (
        <ImportModal
          closeModal={closeImport}
          yupSchema={callImportSchema}
          importOneFromJson={importOneFromJson}
          importOneFromFile={importOneFromFile}
          entityName="Call"
        />
      )}
    </>
  );
};

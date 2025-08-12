import { ExportModal } from '../../../../../../../_general/ExportModal/ExportModal.jsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect, useStoreState } from '@react-vault';

export const ExportCall = ({ callId, closeExport }) => {
  const exportOneAsZip = useStoreEffect((store) => store.nearProtocol.calls.exportOneAsZip);
  const callDraft = useStoreState(
    (store) => store.nearProtocol.calls.drafts[callId],
    [callId],
  );
  const exportOneAsJson = useStoreEffect(
    (store) => store.nearProtocol.calls.exportOneAsJson,
  );
  const exportOneAsJsonFile = useStoreEffect(
    (store) => store.nearProtocol.calls.exportOneAsJsonFile,
  );

  const form = useForm({
    defaultValues: callDraft?.origin?.body,
    mode: 'all',
  });

  return (
    <ExportModal
      origin={callDraft?.origin}
      form={form}
      closeModal={closeExport}
      exportOneAsJson={exportOneAsJson}
      exportOneAsJsonFile={exportOneAsJsonFile}
      exportOneAsZip={exportOneAsZip}
    />
  );
};

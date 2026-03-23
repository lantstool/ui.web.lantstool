import { ExportModal } from '../../../../../../../_general/ExportModal/ExportModal.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../../../../../../Transaction/Form/validations/transactionSchema.js';
import { useStoreEffect, useStoreState } from '@react-vault';

export const ExportTransaction = ({ transactionId, closeExport }) => {
  const exportOneAsZip = useStoreEffect((store) => store.nearProtocol.transactions.exportOneAsZip);
  const transactionDraft = useStoreState(
    (store) => store.nearProtocol.transactions.drafts[transactionId],
    [transactionId],
  );
  const exportOneAsJson = useStoreEffect(
    (store) => store.nearProtocol.transactions.exportOneAsJson,
  );
  const exportOneAsJsonFile = useStoreEffect(
    (store) => store.nearProtocol.transactions.exportOneAsJsonFile,
  );

  const form = useForm({
    defaultValues: transactionDraft?.origin?.body,
    mode: 'all',
    resolver: yupResolver(transactionSchema),
  });

  return (
    <ExportModal
      origin={transactionDraft?.origin}
      form={form}
      closeModal={closeExport}
      exportOneAsJson={exportOneAsJson}
      exportOneAsJsonFile={exportOneAsJsonFile}
      exportOneAsZip={exportOneAsZip}
    />
  );
};

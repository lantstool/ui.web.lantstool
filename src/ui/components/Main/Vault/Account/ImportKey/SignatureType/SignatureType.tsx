import { ModalGroup } from '../general/ModalGroup/ModalGroup.tsx';

export const SignatureType = ({ closeModal, navigate, isOpen }: any) => {
  const onImportType = () => {
    navigate('importType');
  };
  const onExtraService = () => console.log(1);

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal}>
      <h2>Where do you like to sign your transactions?</h2>
      <button onClick={onImportType}>Locally, without extra steps</button>
      <button onClick={onExtraService}>On external service</button>
    </ModalGroup>
  );
};

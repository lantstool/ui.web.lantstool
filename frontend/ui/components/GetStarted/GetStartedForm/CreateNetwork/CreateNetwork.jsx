import { GeneralPageForm } from '../../../_general/nearProtocol/GeneralPageForm/GeneralPageForm.jsx';
import { ManuallyForm } from '../../../_general/nearProtocol/ManuallyForm/ManuallyForm.jsx';
import { PresetForm } from '../../../_general/nearProtocol/PresetForm/PresetForm.jsx';

export const CreateNetwork = ({
  availablePresets,
  form,
  goBack,
  onSubmit,
  btnText,
  navigationBack,
  setTab,
  tab,
}) => {
  return (
    <GeneralPageForm navigationBack={navigationBack} setTab={setTab} tab={tab}>
      {tab === 'selectPredefined' && (
        <PresetForm
          availablePresets={availablePresets}
          onSubmit={onSubmit}
          form={form}
          btnText={btnText}
          goBack={goBack}
        />
      )}
      {tab === 'addManually' && (
        <ManuallyForm form={form} onSubmit={onSubmit} goBack={goBack} btnText={btnText} />
      )}
    </GeneralPageForm>
  );
};

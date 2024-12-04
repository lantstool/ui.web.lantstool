import { useFieldArray } from 'react-hook-form';
import { Button } from '../../../../../../../../../_general/Button/Button.jsx';
import { AccountKeyPair } from './AccountKeyPair/AccountKeyPair.jsx';
import { AddSquareOutline } from '../../../../../../../../../_general/icons/AddSquareOutline.jsx';
import cn from './AccountKeyPairs.module.scss';

const getPlaceholderData = (accountKeyPairs) =>
  accountKeyPairs.map((_, index) => ({
    accountId: null,
    publicKey: null,
    id: index,
  }));

export const AccountKeyPairs = ({ form, accountKeyPairs }) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'accountKeyPairs',
  });

  // We use it to avoid screen blinking cuz during init render
  // 'fields' is always an empty array
  const list = fields.length === 0 ? getPlaceholderData(accountKeyPairs) : fields;
  const add = () => append({ accountId: null, publicKey: null });

  return (
    <>
      <div className={cn.list}>
        {list.map((field, index) => (
          <AccountKeyPair
            key={field.id}
            index={index}
            remove={remove}
            form={form}
            control={control}
            isDisabled={list.length < 2}
          />
        ))}
      </div>
      <Button IconLeft={AddSquareOutline} size="medium" color="secondary" onClick={add}>
        Add Pair
      </Button>
    </>
  );
};

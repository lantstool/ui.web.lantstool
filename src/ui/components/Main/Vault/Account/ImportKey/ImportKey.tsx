import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState } from 'react';
import cn from './ImportKey.module.css';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { useForm, useWatch } from "react-hook-form";

export const ImportKey = (accountId: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const onGetAccessKeyList = useStoreEffect((store: any) => store.vault.onGetAccessKeyList);
  const accessList: any = useStoreState((state: any) => state.vault.accessKeyList);
  const form = useForm({ defaultValues: { list: accessList } });
  const {control,register} = form
  console.log(form);
  const accessType = useWatch({
    control,
    name: 'signerKey',
  });
  const [key, setKey]: any = useState('');
  const handleChange = (event: any) => {
    setKey(event.target.value as string);
  };
  const openModal = () => {
    onGetAccessKeyList(accountId);
    setOpen(true);
  };
  const closeModal = () => {
    setKey('');
    setOpen(false);
  };

  return (
    <>
      <button className={cn.buttonImport} onClick={openModal}>
        Import key
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <form>
          <div className={cn.container}>
            <button onClick={closeModal}>Close</button>
            <h2>Which Access Key do you want to import?</h2>
            <FormControl fullWidth>
              <InputLabel id="SelectKey">Select key</InputLabel>
              <Select
                size="small"
                labelId="SelectKey"
                id="SelectKeyList"
                value={key}
                label="Select key"
                onChange={handleChange}
              >
                {accessList.map((key: any) => (
                  <MenuItem key={key.public_key} value={key.public_key}>
                    {key.public_key}
                  </MenuItem>
                ))}
              </Select>
              <button type="submit">next step</button>
            </FormControl>
          </div>
        </form>
      </Modal>
    </>
  );
};

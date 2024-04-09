import { action } from '../../../../react-vault';

export const setOpenResult = action(({ slice, payload }: any) => {
    const { callId, isOpen, isLoading = false } = payload;
    slice.records[callId].results.isOpen = isOpen;
    slice.records[callId].results.isLoading = isLoading;
});
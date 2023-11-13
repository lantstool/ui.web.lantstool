import { useWatch } from "react-hook-form";

export const CreateAccount = ({ form }: any) => {
  const accountId = useWatch({
    control: form.control,
    name: 'receiverId',
  });

  return <p>{accountId}</p>;
};

type InitialType = { text: string; error: string };

const checkValid = (
  value: InitialType,
  setValue: React.Dispatch<React.SetStateAction<InitialType>>,
  // validator: (val: string) => boolean
): boolean => {
  if (!value.text) {
    setValue({ ...value, error: 'This is required' });
    return false;
  }
  // if (typeof validator === "function" && !validator(value.text)) {
  //   setValue({ ...value, error: "This is invalid" });
  //   return false;
  // }
  return true;
};

export default checkValid;

export const getRemainingRoles = (data: string[]): string[] => {
  console.log(data, 'from get remains');
  const ceoAvailable = data.includes('Ceo');
  const recruitmentAvailable = data.includes('Recruitment');
  if (ceoAvailable && recruitmentAvailable) {
    // Both "Ceo" and "Recruitment" are present in the data array
    return [];
  } else {
    // Only include roles that are still available

    return data;
  }
};

export const isRegistrationAvailable = (data: string[]): boolean => {
  const remainingRoles = getRemainingRoles(data);
  return remainingRoles.length > 0;
};

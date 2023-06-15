import toastr from 'toastr';

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toastr.success('Text copied to clipboard');
};

export const isEmpty = (data: any) => {
  switch (data?.constructor) {
    case Array:
    case String:
      return data.length === 0;
    case Object:
      return Object.keys(data).length === 0;
    case Number:
      return data === 0;
    default:
      return !data;
  }
};

export const optional = (
  value: any,
  transforms: ((...arguments_: any[]) => any)[] = [],
  replacement = 'N/A',
) => {
  if (!value) return replacement;
  let currentValue = value;
  transforms.forEach((fun) => (currentValue = fun(currentValue)));
  return currentValue;
};

import { ComponentProps, FC, memo } from 'react';

type TextInputProps = Omit<ComponentProps<'input'>, 'type'>;

export const TextInput: FC<TextInputProps> = memo(({ ...props }) => {
  return <input type="text" className="border-2 border-black rounded-full w-[400px] h-12 pl-4" {...props} />;
});

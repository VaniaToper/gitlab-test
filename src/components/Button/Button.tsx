import { ComponentProps, FC, memo, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'>;

export const Button: FC<ButtonProps> = memo(({ children, ...props }) => {
  return (
    <button
      className="bg-cyan-700 text-white px-6 py-2 rounded-full hover:bg-cyan-800 transition active:bg-cyan-900 flex gap-2 items-center"
      {...props}
    >
      {children}
    </button>
  );
});

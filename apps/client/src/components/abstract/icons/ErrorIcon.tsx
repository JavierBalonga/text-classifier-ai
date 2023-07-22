import { SVGAttributes } from 'react';

// TODO Remove
const ErrorIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      fill="currentColor"
      fillRule="evenodd"
      {...props}
    >
      <path d="M256 42.667c117.803 0 213.333 95.53 213.333 213.333S373.803 469.333 256 469.333 42.667 373.803 42.667 256 138.197 42.667 256 42.667Zm0 42.666C161.899 85.333 85.333 161.9 85.333 256S161.9 426.667 256 426.667 426.667 350.1 426.667 256 350.1 85.333 256 85.333Zm48.917 91.584 30.166 30.166L286.165 256l48.918 48.917-30.166 30.166L256 286.165l-48.917 48.918-30.166-30.166L225.835 256l-48.918-48.917 30.166-30.166L256 225.835l48.917-48.918Z" />
    </svg>
  );
};

export default ErrorIcon;

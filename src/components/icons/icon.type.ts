import { SVGProps } from "react";

type IconProps = {
  className?: string;
  fill?: string;
  width?: string;
  height?: string;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "color">;

export type { IconProps };

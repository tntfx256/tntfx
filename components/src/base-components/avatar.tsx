/* eslint-disable @next/next/no-img-element */

import { classNames } from "@tntfx/theme";
import { Text } from "./text";

export interface AvatarProps {
  src: string;
  size?: number;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function Avatar(props: AvatarProps) {
  const { src, alt, onClick, size = 64, children, className } = props;

  return (
    <figure className={classNames("avatar", className)} style={{ height: size, width: size }} onClick={onClick}>
      {src && <img alt={alt || "Avatar"} src={src} />}
      {alt && <Text className="avatar-abbr">{getAbbr(alt)}</Text>}
      <div className="avatar-image" style={{ backgroundImage: `url(${src})` }} />
      {children}
    </figure>
  );
}

function getAbbr(text: string) {
  return text
    .split(/\s+/)
    .map((s) => s[0])
    .join("");
}

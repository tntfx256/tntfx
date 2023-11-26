/* eslint-disable @next/next/no-img-element */
import type { PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Text } from "./typography/text";
import "./avatar.scss";

export interface AvatarProps extends PropsAndChildren {
  src: string;
  size?: number;
  alt?: string;
  onClick?: () => void;
}

export function Avatar(props: AvatarProps) {
  const { src, alt, onClick, size = 64, children, className } = props;

  return (
    <figure
      className={classNames("avatar", className, { clickable: onClick })}
      style={{ height: size, width: size }}
      onClick={onClick}
    >
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

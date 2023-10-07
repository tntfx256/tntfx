import { applications } from "../registry";
import type { AppEntity, Nullable } from "../types";

type ParsedDeepLink = { appEntity: AppEntity; path: string };

export function createInternalLink(app: string, section?: string) {
  return [app, section].filter(Boolean).join("/");
}

export function createDeepLink(app: string, link: string): string {
  return `${app}://${link}`;
}

export function translateDeepLink(link: string): Nullable<ParsedDeepLink> {
  const result = link.match(/^(\w+):\/\/(.+)$/);
  if (result) {
    const [, appName, deepLink] = result;
    const entity = applications.getByName(appName);
    if (entity) {
      return { appEntity: entity, path: deepLink };
    }
  }
  return null;
}

export function createWebViewLink(domain: string, link: string, showProtocol = true) {
  const parts = [domain.replace(/\/$/, ""), link.replace(/^\//, "")];

  return showProtocol ? `sparrow://${parts.join("/")}` : parts.join("://");
}

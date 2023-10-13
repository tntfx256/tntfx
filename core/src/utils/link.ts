export function createInternalLink(app: string, section?: string) {
  return [app, section].filter(Boolean).join("/");
}

export function createDeepLink(app: string, link: string): string {
  return `${app}://${link}`;
}

export function createWebViewLink(domain: string, link: string, showProtocol = true) {
  const parts = [domain.replace(/\/$/, ""), link.replace(/^\//, "")];

  return showProtocol ? `sparrow://${parts.join("/")}` : parts.join("://");
}

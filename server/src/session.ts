import { cookies } from "next/headers";
import type { Any, Nullable } from "@tntfx/core";
import type { SessionOptions } from "iron-session";
import { sealData, unsealData } from "iron-session";

export interface SessionType {
  user?: Record<string, unknown>;
  [key: string]: Any;
}

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "sparrow",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function assertUser() {}

export class Session<T extends SessionType = SessionType> {
  private static instance: Session<Any>;

  public static getInstance<T extends SessionType = SessionType>() {
    if (!Session.instance) {
      Session.instance = new Session<T>();
    }
    return Session.instance as Session<T>;
  }

  private constructor() {}

  public async getSessionData(): Promise<Nullable<T>> {
    const cookieStore = cookies();
    const encryptedSession = cookieStore.get(sessionOptions.cookieName)?.value;
    if (encryptedSession) {
      return unsealData(encryptedSession, sessionOptions);
    }
    return null;
  }

  public async saveSession(data: T) {
    const currentData = await this.getSessionData();
    const cookieStore = cookies();
    const encryptedSession = await sealData(JSON.stringify({ ...currentData, ...data }), sessionOptions);
    cookieStore.set({
      name: sessionOptions.cookieName,
      value: encryptedSession,
      secure: !!sessionOptions.cookieOptions?.secure,
    });
  }

  public destroy() {
    const cookieStore = cookies();
    cookieStore.delete(sessionOptions.cookieName);
  }
}

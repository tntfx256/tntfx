import { NextResponse } from "next/server";
import type { MaybePromise } from "@tntfx/core";
import { Err, finalizeError } from "@tntfx/core";
import { RESPONSE_OK, RESPONSE_SENT } from "./response";
import type { SessionType } from "./session";
import { Session } from "./session";

interface HandlerConfig {
  needAuth?: boolean;
}

export type RequestHandler = <T extends SessionType = SessionType>(
  req: Request,
  session: Session<T>
) => MaybePromise<unknown>;

async function checkAccess(config: HandlerConfig = {}) {
  const session = Session.getInstance();
  const data = await session.getSessionData();

  // check auth and admin
  if (config.needAuth && !data?.user) {
    throw Err(Err.Name.ACCESS, Err.Message.ACCESS_DENIED);
  }
}

export function getServerStatusCode(error: Error) {
  if (error.message == Err.Message.NOT_FOUND) return 404;
  if (error.name === Err.Name.VALIDATION) return 400;
  if (error.message == Err.Message.NOT_ACCEPTABLE) return 406;
  if (error.name === Err.Name.ACCESS || error.message === Err.Message.ACCESS_DENIED) return 403;

  return 500;
}

export function wrapRequest<T extends SessionType = SessionType>(handler: RequestHandler, config?: HandlerConfig) {
  return async function handleRequest(req: Request) {
    const session = Session.getInstance<T>();

    try {
      await checkAccess(config);
      const result = await handler(req, session);
      if (result === RESPONSE_SENT) {
        return NextResponse;
      }

      if (result === RESPONSE_OK) {
        return NextResponse.json(null, { status: 201 });
      }

      if (typeof result === "undefined") {
        return NextResponse.json(null, { status: 406 });
      }

      if (typeof result === "object") {
        // return sendResponse(res, result);
        return NextResponse.json(result);
      }
      return NextResponse.json({ result });
    } catch (err) {
      const error = finalizeError(err);
      NextResponse.json(error, { status: getServerStatusCode(error) });
    }
  };
}

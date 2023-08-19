import {JwtPayload} from "jsonwebtoken";

export type Context = {
    auth: JwtPayload;
    env: NodeJS.ProcessEnv;
};

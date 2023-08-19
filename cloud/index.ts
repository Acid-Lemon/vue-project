import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";

import {PrismaClient} from "@prisma/client";
import {VercelRequest, VercelResponse} from "@vercel/node";
import {JwtPayload} from "jsonwebtoken";

const env: NodeJS.ProcessEnv = process.env;

let files: string[] = fs.readdirSync(__dirname + "/services");
let functions: Map<string, Function> = new Map();
files.map(async (filename: string) => {
    console.log(filename);
    let name: string = filename.replace(".js", "");
    let {default: module} = await import("./services/" + filename);
    functions.set(name, module);
});

exports.default = async (req: VercelRequest, res: VercelResponse) => {
    try {
        if (req.method?.toLowerCase() !== "post") {
            throw new Error("method not supported. please use the post method.");
        }

        if (typeof(req.body) === "string") {
            req.body = JSON.parse(req.body);
        }

        let {
            api,
            args,
            token
        } = req.body ? req.body : req;

        let func: Function = <Function>functions.get(api);
        if (typeof func !== "function") {
            throw new Error("no api");
        }

        let auth: JwtPayload = {};
        if (!token && !api.startsWith("login")) {
            throw new Error("please login first.")
        } else if (token) {
            auth = <JwtPayload>jwt.verify(token.replace("Bearer ", ""), <string>env["ADMIN_SECRET"])
        }

        let prisma: PrismaClient = new PrismaClient();
        let data: Object = await func(args, prisma, auth["id"], {
            auth,
            env
        });

        console.log("result: ", data);
        res.status(StatusCodes.OK).json({
            success: true,
            data
        })
    } catch (err: any) {
        console.error("error: ", err);
        res.status(StatusCodes.OK).json({
            success: false,
            error_message: err.message
        });
    }
}

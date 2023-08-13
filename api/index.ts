import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";

import {PrismaClient} from "@prisma/client";
import {VercelRequest, VercelResponse} from "@vercel/node";
import {JwtPayload} from "jsonwebtoken";

const env: NodeJS.ProcessEnv = process.env;

let files: string[] = fs.readdirSync(__dirname + "/services");
let functions: object = {};
files.map(async (filename: string) => {
    let name: string = filename.replace(".ts", "");
    let {default: module} = await import("./services/" + filename)
    Object.defineProperty(functions, name, {
        value: module
    });
});

exports.default = async (req: VercelRequest, res: VercelResponse) => {
    try {
        if (req.method.toLowerCase() !== "post") {
            throw new Error("method not supported. please use post method.");
        }

        if (typeof(req.body) === "string") {
            req.body = JSON.parse(req.body);
        }

        let {
            api,
            args,
            token
        } = req.body ? req.body : req;

        console.log(typeof functions[api], functions[api])
        if (typeof functions[api] !== "function") {
            throw new Error("no api");
        }

        let auth: JwtPayload = {};
        if (!token && !api.startsWith("login")) {
            throw new Error("please login first.")
        } else if (token) {
            auth = <JwtPayload>jwt.verify(token.replace("Bearer ", ""), env["ADMIN_SECRET"])
        }

        let prisma: PrismaClient = new PrismaClient();
        let data: Object = await functions[api](args, prisma, auth["id"], {
            auth,
            env
        });

        console.log("result: ", data);
        res.status(StatusCodes.OK).json({
            success: true,
            data
        })
    } catch (err) {
        console.error("error: ", err);
        res.status(StatusCodes.OK).json({
            success: false,
            error_message: err.message
        });
    }
}

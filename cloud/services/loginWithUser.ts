import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {PrismaClient} from "@prisma/client";

import {User} from "@prisma/client";
import {Context} from "../types";

type LoginArgs = {
    username: string;
    password: string;
    type: string;
}

module.exports = async (args: LoginArgs, prisma: PrismaClient, uid: number, ctx: Context) => {
    let {
        username,
        password,
        type
    } = args;
    username.trim();
    password.trim();
    check_info(username, password);
    if (type === "login") {
        let user: User = await prisma.user.findUniqueOrThrow({
            where: {
                name: username
            }
        });

        let match: boolean = await bcrypt.compare(password, user.hash);
        if (!match) {
            throw new Error("Invalid password");
        }

        let token: string = "Bearer " + jwt.sign({user_id: uid}, <string>ctx.env["ADMIN_SECRET"]);
        return {
            user,
            token
        };
    } else if (type === "register") {
        let create_res: User = await prisma.$transaction(async (tx) => {
            let user: User|null = await tx.user.findUnique({
                where: {
                    name: username
                }
            });

            if (user) {
                throw new Error("user exists");
            }

            let hash: string = await bcrypt.hash(password, 10);

            return tx.user.create({
                data: {
                    name: username,
                    hash
                }
            });
        });

        return {
            user: create_res,
            token: "Bearer " + jwt.sign({user_id: create_res.id}, <string>ctx.env["ADMIN_SECRET"])
        }
    } else {
        throw new Error("invalid type");
    }
}

function check_info(username: string, password: string) {
    if (username.length < 1 || username.length > 15) {
        throw Error("invalid username");
    }

    if (password.length < 5 || password.length > 25) {
        throw Error("invalid password");
    }
}

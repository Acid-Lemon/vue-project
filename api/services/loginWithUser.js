"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
module.exports = async (args, prisma, uid, ctx) => {
    let { username, password, type } = args;
    username.trim();
    password.trim();
    check_info(username, password);
    if (type === "login") {
        let user = await prisma.user.findUniqueOrThrow({
            where: {
                name: username
            }
        });
        let match = await bcrypt.compare(password, user.hash);
        if (!match) {
            throw new Error("Invalid password");
        }
        let token = "Bearer " + jwt.sign({ user_id: uid }, ctx.env["ADMIN_SECRET"]);
        return {
            user,
            token
        };
    }
    else if (type === "register") {
        let create_res = await prisma.$transaction(async (tx) => {
            let user = await tx.user.findUnique({
                where: {
                    name: username
                }
            });
            if (user) {
                throw new Error("user exists");
            }
            let hash = await bcrypt.hash(password, 10);
            return tx.user.create({
                data: {
                    name: username,
                    hash
                }
            });
        });
        return {
            user: create_res,
            token: "Bearer " + jwt.sign({ user_id: create_res.id }, ctx.env["ADMIN_SECRET"])
        };
    }
    else {
        throw new Error("invalid type");
    }
};
function check_info(username, password) {
    if (username.length < 1 || username.length > 15) {
        throw Error("invalid username");
    }
    if (password.length < 5 || password.length > 25) {
        throw Error("invalid password");
    }
}

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
const fs = __importStar(require("fs"));
const jwt = __importStar(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const env = process.env;
let files = fs.readdirSync(__dirname + "/services");
let functions = new Map();
files.map(async (filename) => {
    console.log(filename);
    let name = filename.replace(/.js/, "");
    let { default: module } = await Promise.resolve(`${"./services/" + filename}`).then(s => __importStar(require(s)));
    functions.set(name, module);
});
exports.default = async (req, res) => {
    try {
        if (req.method?.toLowerCase() !== "post") {
            throw new Error("method not supported. please use the post method.");
        }
        if (typeof (req.body) === "string") {
            req.body = JSON.parse(req.body);
        }
        let { api, args, token } = req.body ? req.body : req;
        let func = functions.get(api);
        if (typeof func !== "function") {
            throw new Error("no api");
        }
        let auth = {};
        if (!token && !api.startsWith("login")) {
            throw new Error("please login first.");
        }
        else if (token) {
            auth = jwt.verify(token.replace("Bearer ", ""), env["ADMIN_SECRET"]);
        }
        let prisma = new client_1.PrismaClient();
        let data = await func(args, prisma, auth["id"], {
            auth,
            env
        });
        console.log("result: ", data);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data
        });
    }
    catch (err) {
        console.error("error: ", err);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: false,
            error_message: err.message
        });
    }
};

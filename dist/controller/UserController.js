"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirmPass } = req.body;
            const input = {
                name,
                email,
                password,
                confirmPass
            };
            try {
                const token = yield this.userBusiness.signup(input);
                res.status(201).send(token);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const input = { email, password };
            try {
                const token = yield this.userBusiness.login(input);
                res.status(200).send(token);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userBusiness.findById(req);
                res.status(200).send(user);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
    }
}
exports.default = UserController;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InsertUser_1 = __importDefault(require("../model/InsertUser"));
const AuthToken_1 = __importDefault(require("../services/AuthToken"));
class UserBusiness {
    constructor(userData, services) {
        this.userData = userData;
        this.services = services;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirmPass } = input;
            if (!name || !email || !password || !confirmPass) {
                throw {
                    statusCode: 401,
                    error: new Error('Preencha os campos')
                };
            }
            if (password.length < 6) {
                throw {
                    statusCode: 403,
                    error: new Error('A senha deve ter o mínimo de 6 caracteres')
                };
            }
            if (password !== confirmPass) {
                throw {
                    statusCode: 403,
                    error: new Error('As senhas não correspondem')
                };
            }
            const registeredUser = yield this.userData.findByEmail(email);
            if (registeredUser) {
                throw {
                    statusCode: 403,
                    error: new Error('Usuário já cadastrado')
                };
            }
            const id = this.services.idGenerator();
            const hash = this.services.hash(password);
            const token = this.services.token(id);
            const user = new InsertUser_1.default(id, name, email, hash);
            yield this.userData.create(user);
            return token;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (!email || !password) {
                throw {
                    statusCode: 401,
                    error: new Error('Preencha os campos')
                };
            }
            const registeredUser = yield this.userData.findByEmail(email);
            if (!registeredUser) {
                throw {
                    statusCode: 404,
                    error: new Error('Usuário não encontrado')
                };
            }
            const compare = this.services.compare(password, registeredUser.password);
            if (!compare) {
                throw {
                    statusCode: 404,
                    error: new Error('Usuaŕio não encontrado')
                };
            }
            const token = this.services.token(registeredUser.id);
            return token;
        });
        this.findById = (req) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, AuthToken_1.default)(req);
            return user;
        });
    }
}
exports.default = UserBusiness;

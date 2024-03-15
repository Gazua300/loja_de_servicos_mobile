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
const ConnectDatabase_1 = __importDefault(require("./ConnectDatabase"));
class UserData extends ConnectDatabase_1.default {
    constructor() {
        super(...arguments);
        this.USER_TABLE = 'labeninja_users';
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [user] = yield ConnectDatabase_1.default.con(this.USER_TABLE).where({
                    email
                });
                return user;
            }
            catch (e) {
                throw new Error('Erro ao buscar usuário');
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [user] = yield ConnectDatabase_1.default.con(this.USER_TABLE).where({ id });
                return user;
            }
            catch (e) {
                throw new Error(`Erro ao buscar usuário: ${e}`);
            }
        });
        this.create = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield user.save();
            }
            catch (e) {
                throw new Error(`Erro ao criar usuário ${e}`);
            }
        });
    }
}
exports.default = UserData;

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
class JobData extends ConnectDatabase_1.default {
    constructor() {
        super(...arguments);
        this.JOB_TABLE = 'labeninja_pub';
        this.findByProvider = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield ConnectDatabase_1.default.con(this.JOB_TABLE).where({
                    provider: id
                });
                return job;
            }
            catch (e) {
                throw new Error(`Errro ao buscar serviços: ${e}`);
            }
        });
        this.findById = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [job] = yield ConnectDatabase_1.default.con(this.JOB_TABLE).where({
                    id: req.params.id
                });
                return job;
            }
            catch (e) {
                throw new Error(`Erro ao buscar serviço: ${e}`);
            }
        });
        this.create = (job) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield ConnectDatabase_1.default.con(this.JOB_TABLE).insert(job);
            }
            catch (e) {
                throw new Error(`Error ao criar serviço: ${e}`);
            }
        });
        this.getAllJobs = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield ConnectDatabase_1.default.con(this.JOB_TABLE);
                return jobs;
            }
            catch (e) {
                throw new Error(`Erro ao buscar serviços: ${e}`);
            }
        });
        this.delJob = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield ConnectDatabase_1.default.con(this.JOB_TABLE).del().where({
                    id: req.params.id
                });
            }
            catch (e) {
                throw new Error(`Falho ao deletar serviço: ${e}`);
            }
        });
    }
}
exports.default = JobData;

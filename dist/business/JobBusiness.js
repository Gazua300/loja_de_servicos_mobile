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
const AuthToken_1 = __importDefault(require("../services/AuthToken"));
class JobBusiness {
    constructor(jobData, services) {
        this.jobData = jobData;
        this.services = services;
        this.create = (input, req) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, AuthToken_1.default)(req);
            const { title, description, phone, period } = input;
            if (!title || !description || !phone || !period) {
                throw {
                    statusCode: 401,
                    error: new Error('Preencha os campos')
                };
            }
            const convert = String(phone).split('');
            if (convert.length !== 11 || isNaN(phone)) {
                throw {
                    statusCode: 403,
                    error: new Error('Telefone inválido')
                };
            }
            const jobs = yield this.jobData.findByProvider(user.id);
            if (jobs.length > 0) {
                jobs.map(job => {
                    if (title === job.title &&
                        description === job.description &&
                        phone === job.phone &&
                        period === job.period) {
                        throw {
                            statusCode: 403,
                            error: new Error('Você está tentando cadastrar o mesmo serviço novamente!')
                        };
                    }
                });
            }
            const id = this.services.idGenerator();
            const provider = user.id;
            const job = {
                id,
                title,
                description,
                phone,
                period,
                provider
            };
            yield this.jobData.create(job);
        });
        this.getAllJobs = () => __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.jobData.getAllJobs();
            if (jobs.length === 0) {
                throw {
                    statusCode: 404,
                    error: new Error('Ainda não foi cadastrado nenhum serviço')
                };
            }
            return jobs;
        });
        this.jobsByProvider = (req) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, AuthToken_1.default)(req);
            const jobs = yield this.jobData.findByProvider(user.id);
            return jobs;
        });
        this.findById = (req) => __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobData.findById(req);
            if (!job) {
                throw {
                    statusCode: 404,
                    error: new Error('Serivço não encontrado')
                };
            }
            return job;
        });
        this.delJob = (req) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, AuthToken_1.default)(req);
            const job = yield this.jobData.findById(req);
            if (!job) {
                throw {
                    statusCode: 404,
                    error: new Error('Serivço não encontrado')
                };
            }
            if (job.provider !== user.id) {
                throw {
                    statusCode: 404,
                    error: new Error('Vocẽ não tem autorização para realizar esta operação')
                };
            }
            yield this.jobData.delJob(req);
            return job;
        });
    }
}
exports.default = JobBusiness;

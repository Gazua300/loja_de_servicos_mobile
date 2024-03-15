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
class JobController {
    constructor(jobBusiness) {
        this.jobBusiness = jobBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, phone, period } = req.body;
            const input = {
                title,
                description,
                phone,
                period
            };
            try {
                yield this.jobBusiness.create(input, req);
                res.status(201).send(`Serviços ${title} criado com sucesso`);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
        this.getAllJobs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield this.jobBusiness.getAllJobs();
                res.status(200).send(jobs);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
        this.jobsByProvider = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield this.jobBusiness.jobsByProvider(req);
                res.status(200).send(jobs);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield this.jobBusiness.findById(req);
                res.status(200).send(job);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
        this.delJob = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield this.jobBusiness.delJob(req);
                res.status(200).send(`${job.title} removido`);
            }
            catch (e) {
                let statusCode = e.statusCode || 400;
                let message = e.error === undefined ? e.message : e.error.message;
                res.status(statusCode).send(message || e.sqlMessage);
            }
        });
    }
}
exports.default = JobController;

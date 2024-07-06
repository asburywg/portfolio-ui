import api from './axiosConfig';




const serveFileSummary = () => {
    return Promise.resolve(api.get("/reports/files"));
}

export const ReportService = {
    serveFileSummary,
}
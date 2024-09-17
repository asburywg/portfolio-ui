import api from './axiosConfig';


const getAccounts = () => {
    return Promise.resolve(api.get("/accounts"));
}

const serveFileSummary = () => {
    return Promise.resolve(api.get("/reports/files"));
}

const linkDirectory = (directory_id, account_type, institution) => {
    return Promise.resolve(api.put(`/directory/link/${directory_id}`, {"account_type": account_type, "institution": institution}));
};

const getDirectories = () => {
    return Promise.resolve(api.get("/directory"));
}

const getLinkOptions = () => {
    return Promise.resolve(api.get("/directory/link"));
}

export const APIService = {
    serveFileSummary,
    getAccounts,
    linkDirectory,
    getDirectories,
    getLinkOptions
}
import api from './axiosConfig';

class TransactionService {

  async getTransactions(page = 1, perPage = 10) {
    try {
      const response = await api.get('/transactions', {
        params: {
          page: page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions', error);
      throw error;
    }
  }

}

export default new TransactionService();
import api from './axiosConfig';

class TransactionService {

  async getTransactions(page = 1, perPage = 100) {
    try {
      const response = await api.get('/transactions/', {
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

  async getTags() {
    try {
      const response = await api.get('/tags/');
      return response.data;
    } catch (error) {
      console.error('Error fetching tags', error);
      throw error;
    }
  }

  async createTag(tag) {
    try {
      const response = await api.post('/tags/', {"tag": tag});
      return response.data;
    } catch (error) {
      console.error('Error creating tags', error);
      throw error;
    }
  }

  async updateTag(tag, name) {
    try {
      const response = await api.put(`/tags/${tag}`, {"name": name});
      return response.data;
    } catch (error) {
      console.error('Error updating tag', error);
      throw error;
    }
  }

  async deleteTag(tag) {
    try {
      const response = await api.delete(`/tags/${tag}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tag', error);
      throw error;
    }
  }

  async updateMetadata(transaction) {
    try {
      const response = await api.put(`/transactions/${transaction['id']}`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error updating transaction', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await api.get('/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories', error);
      throw error;
    }
  }

  async updateCategory(id, category) {
    try {
      const response = await api.put(`/transactions/${id}`, {"category": category});
      return response.data;
    } catch (error) {
      console.error('Error updating transaction category', error);
      throw error;
    }
  }

  async getCashFlowSummary() {
    try {
      const response = await api.get('/reports/v2/cashflow');
      return response.data;
    } catch (error) {
      console.error('Error fetching cash flow summary', error);
      throw error;
    }
  }

}

const transactionServiceInstance = new TransactionService();
export default transactionServiceInstance;
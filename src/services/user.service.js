import createApiClient from './api.service.js';

class UserService {
  constructor(baseUrl = '/api/users') {
    this.api = createApiClient(baseUrl);
  }

  async createUser(data) {
    return await this.api.post('/register', data);
  }
  async getAllUsers() {
    return (await this.api.get('/login')).data.data.users;
  }
}

export default new UserService();

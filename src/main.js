import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from './services/store';
import router from './router';

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');

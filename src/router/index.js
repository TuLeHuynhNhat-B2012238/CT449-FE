import { createRouter, createWebHistory } from 'vue-router';
import ContactBook from '@/views/ContactBook.vue';

const routes = [
  {
    path: '/',
    name: 'contactbook',
    component: ContactBook,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/contacts/:id',
    name: 'contact.edit',
    component: () => import('@/views/ContactEdit.vue'),
    props: true,
  },
  {
    path: '/contacts/add',
    name: 'contact.add',
    component: () => import('@/views/ContactAdd.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/UserLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/UserRegister.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

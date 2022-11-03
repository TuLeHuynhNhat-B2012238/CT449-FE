<template>
  <div class="page">
    <h4>Đăng nhập</h4>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
      <div class="form-group">
        <Field
          name="name"
          type="text"
          class="form-control"
          placeholder="Tên đăng nhập"
          v-model="user.name"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field
          name="password"
          type="password"
          class="form-control"
          placeholder="Mật khẩu"
          v-model="user.password"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-100">Đăng nhập</button>
      </div>
    </Form>
    <p v-if="message">{{ message }} Trở về <router-link to="/">Trang chủ</router-link></p>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import UserService from '@/services/user.service';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .required('Tên đăng nhập phải có giá trị.')
        .min(2, 'Tên đăng nhập phải ít nhất 2 ký tự.')
        .max(50, 'Tên đăng nhập có nhiều nhất 50 ký tự.'),
      password: yup
        .string()
        .required('Mật khẩu phải có giá trị.')
        .min(2, 'Mật khẩu phải ít nhất 2 ký tự.')
        .max(50, 'Mật khẩu có nhiều nhất 50 ký tự.'),
    });
    return {
      userFormSchema,
      message: '',
      user: {},
      userExist: false,
      passwordMatched: false,
    };
  },
  methods: {
    showMessage(description) {
      this.message = description;
    },
    changePage() {
      this.$store.commit('updateStatus');
      this.$router.push('/');
    },

    async checkExistUser() {
      const users = await UserService.getAllUsers();
      const userSelected = users.find((el) => el.name === this.user.name);
      this.userExist = userSelected && true;
      if (this.userExist) {
        this.passwordMatched = userSelected.password === this.user.password;
        if (this.passwordMatched) {
          this.changePage();
        } else this.showMessage('Mật khẩu không chính xác. ');
      } else {
        this.showMessage('Tên đăng nhập không tồn tại hoặc chưa đăng ký. ');
      }
    },
    submitUser() {
      this.checkExistUser();
    },
  },
};
</script>

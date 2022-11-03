<template>
  <div class="page">
    <h4>Đăng ký</h4>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
      <div class="form-group">
        <label for="name">Tên đăng nhập</label>
        <Field
          name="name"
          id="name"
          type="text"
          class="form-control"
          placeholder="Nhập vào đây..."
          v-model="user.name"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <Field
          name="password"
          id="password"
          type="password"
          class="form-control"
          placeholder="Nhập vào đây..."
          v-model="user.password"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="passwordConfirm">Xác nhận mật khẩu</label>
        <Field
          name="passwordConfirm"
          id="passwordConfirm"
          type="password"
          class="form-control"
          placeholder="Nhập vào đây..."
          v-model="passwordConfirm"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-100">Đăng ký</button>
      </div>
    </Form>
    <p v-if="message && userExist">
      {{ message }} Trở về <router-link to="/">Trang chủ</router-link>
    </p>
    <p v-else-if="message && passwordConfirm !== user.password">
      {{ message }}
    </p>
    <p v-else-if="message && passwordConfirm === user.password">
      {{ message }} Click vào để <router-link to="/login">Đăng nhập</router-link>
    </p>
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
        .max(50, 'Tên đăng nhập có nhiều nhất 50 ký tự.')
        .trim(),
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
      passwordConfirm: '',
    };
  },
  methods: {
    async registerUser() {
      await UserService.createUser(this.user);
    },
    async checkExistUser() {
      const users = await UserService.getAllUsers();
      this.userExist = users.find((el) => el.name === this.user.name) && true;
      if (this.userExist) {
        this.message = 'Người dùng đã tồn tại! Vui lòng sử dụng tên đăng nhập khác.';
      } else if (this.passwordConfirm !== this.user.password) {
        this.message = 'Xác nhận mật khẩu không hợp lệ.';
        setTimeout(() => {
          this.message = '';
        }, 1000);
      } else {
        this.registerUser();
        this.message = 'Đăng ký thành công!';
      }
    },
    submitUser() {
      this.checkExistUser();
    },
  },
};
</script>

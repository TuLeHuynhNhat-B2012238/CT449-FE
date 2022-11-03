<template>
  <div class="page">
    <h4>Thêm liên hệ</h4>
    <ContactForm @submit:contact="addContact" :contact="contact" />
    <p v-if="message">{{ message }} Trở về <router-link to="/">Trang chủ</router-link></p>
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue';
import ContactService from '@/services/contact.service';

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: {},
      message: '',
    };
  },
  methods: {
    async addContact() {
      try {
        await ContactService.create(this.contact);
        this.message = 'Liên hệ đã được tạo!';
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

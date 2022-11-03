<template>
  <div class="page row">
    <div class="col-md-10">
      <input-search v-model="searchText"></input-search>
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <contact-list
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      ></contact-list>
      <p v-else>Không có liên hệ nào</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i>
          Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i>
          Thêm mới
        </button>
        <button lass="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i>
          Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          <contact-card :contact="activeContact"></contact-card>
          <router-link
            @click="showMessage('hiệu chỉnh liên hệ')"
            :to="{ name: 'contact.edit', params: { id: activeContact._id } }"
          >
            <span class="mt-2 badge badge-warning"> <i class="fas fa-edit"></i>Hiệu chỉnh </span>
          </router-link>
        </h4>
      </div>
    </div>
    <p v-if="!logged" class="mt-3 col-md-6">{{ message }}</p>
  </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue';
import ContactList from '@/components/ContactList.vue';
import ContactCard from '@/components/ContactCard.vue';
import ContactService from '@/services/contact.service.js';

export default {
  components: {
    InputSearch,
    ContactList,
    ContactCard,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: '',
      message: '',
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    logged() {
      return this.$store.state.logged;
    },
    contactString() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join('');
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactString[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex == -2) this.showMessage('xem chi tiết');
      else if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      if (!this.filteredContacts) return null;
      return this.filteredContacts.length;
    },
  },
  methods: {
    showMessage(detail) {
      if (!this.logged) {
        this.message = `Đăng nhập để ${detail}`;
      }
    },
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
        this.contacts = JSON.parse(JSON.stringify(this.contacts));
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
      this.message = '';
    },
    async removeAllContacts() {
      if (this.logged) {
        if (confirm('Bạn muốn xóa tất cả liên hệ?')) {
          try {
            await ContactService.deleteAll();
            this.refreshList();
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        this.showMessage('xóa tất cả liên hệ');
      }
    },
    goToAddContact() {
      if (this.logged) {
        this.$router.push({ name: 'contact.add' });
      } else {
        this.showMessage('thêm liên hệ mới');
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>

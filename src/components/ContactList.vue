<script>
export default {
  props: {
    contacts: {
      type: Array,
      default: () => null,
    },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ['update:activeIndex'],
  computed: {
    logged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    updateActiveIndex(index) {
      if (this.logged) {
        this.$emit('update:activeIndex', index);
      } else {
        this.$emit('update:activeIndex', -2);
      }
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

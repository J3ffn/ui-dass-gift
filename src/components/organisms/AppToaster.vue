<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ToastItem from "../molecules/ToastItem.vue";

const store = useStore();
const notifications = computed(() => store.state.notification.items);

const close = (id) => store.dispatch("notification/dismiss", id);
</script>

<template>
  <div class="toaster">
    <TransitionGroup name="toast">
      <ToastItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @close="close"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toaster {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  z-index: 200;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

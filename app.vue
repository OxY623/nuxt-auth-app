<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useRouter().beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.initAuth();
  next();
});
</script>
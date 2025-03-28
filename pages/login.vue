<template>
  <div class="w-full h-screen flex items-center justify-center bg-fuchsia-300">
    <UCard variant="subtle" class="w-full max-w-md mx-auto p-8 rounded-xl">
      <template #header>
        <h1 class="text-gray-700 font-extrabold text-3xl mb-4 text-center">Login</h1>
      </template>

      <form @submit.prevent="handleLogin" class="flex flex-col justify-center gap-4">
        <UFormGroup label="Username">
          <UInput
            class="w-full p-3   focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            v-model="username"
            placeholder="Enter username"
            :error="error"
          />
        </UFormGroup>

        <UFormGroup label="Password">
          <UInput
            class="w-full p-3   focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            v-model="password"
            type="password"
            placeholder="Enter password"
            :error="error"
          />
        </UFormGroup>

        <p v-if="error" class="text-red-500 text-center">{{
          error
        }}</p>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
          class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-md border-2 border-green-600 text-lg transition-colors"
        >
          Login
        </UButton>
      </form>
    </UCard>
  </div>
</template>
  
  <script setup lang="ts">
  const authStore = useAuthStore();
  const router = useRouter();
  
  const username = ref('');
  const password = ref('');
  const error = ref('');
  const loading = ref(false);
  
  async function handleLogin() {
    loading.value = true;
    error.value = '';
  
    try {
      const success = await authStore.login(username.value, password.value);
      if (success) {
        router.push('/account');
      } else {
        error.value = 'Incorrect registration data entered. Please re-enter.';
      }
    } catch (e) {
      error.value = 'An error occurred. Please try again.';
    } finally {
      loading.value = false;
    }
  }
  </script>
  

<template>
  <div class="w-full h-screen flex items-center justify-center bg-fuchsia-300">
    <UCard variant="subtle" class="w-full max-w-md mx-auto p-8 rounded-xl">
      <template #header>
        <h1 class="text-gray-700 font-extrabold text-3xl mb-4 text-center">Login</h1>
      </template>

      <form @submit.prevent="handleLogin" class="flex flex-col justify-center gap-4">
        <UFormGroup label="Username">
          <!-- Заменили на стандартный input -->
          <input
            class="w-full p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            v-model="username"
            placeholder="Enter email"
            :class="{'border-red-500': usernameError}"
            type="email"
          />
          <!-- Отображение ошибки для поля username -->
          <p v-if="usernameError" class="text-red-500 text-sm">{{ usernameError }}</p>
        </UFormGroup>

        <UFormGroup label="Password">
          <!-- Заменили на стандартный input -->
          <input
            class="w-full p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            v-model="password"
            type="password"
            placeholder="Enter password"
            :class="{'border-red-500': passwordError}"
          />
          <!-- Отображение ошибки для поля password -->
          <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
        </UFormGroup>

        <!-- Отображение общей ошибки -->
        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>

        <!-- Кнопка для отправки формы -->
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

const usernameError = ref('');
const passwordError = ref('');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

watch(username, (newValue) => {
  if (!emailRegex.test(newValue)) {
    usernameError.value = 'Please enter a valid email address';
  } else {
    usernameError.value = '';
  }
});

async function handleLogin() {
  loading.value = true;
  error.value = '';
  usernameError.value = '';
  passwordError.value = '';

  // Простая проверка на пустое поле пароля
  if (!password.value) {
    passwordError.value = 'Password is required';
    loading.value = false;
    return;
  }

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

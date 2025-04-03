<template>
  <div class="w-full h-screen flex items-center justify-center bg-fuchsia-300">
    <UCard variant="subtle" class="w-full max-w-md mx-auto p-8 rounded-xl">
      <MyHeader>Login</MyHeader>
      <form @submit.prevent="handleLogin" class="flex flex-col justify-center gap-4" >
        <div title="Username">
          <MyInput :errorMessage="usernameError" v-model="username" placeholder="Enter email" type="email" />
        </div>
         
        <div title="Password">
          <MyInput :errorMessage="passwordError" v-model="password" placeholder="Enter password" type="password" />
        </div>

        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
        <MyButton type="submit" block :loading="loading">Login</MyButton>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {MyButton, MyHeader, MyInput} from '../components/UI';






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
  console.log(password.value)
  console.log(username.value)
  

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

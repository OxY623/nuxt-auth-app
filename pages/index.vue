<template>
    <div class="w-screen h-screen flex flex-col justify-center items-center bg-fuchsia-300 gap-4">
      <h1 class="text-gray-700 font-extrabold text-4xl">Starting Page</h1>
      <p class="text-gray-500 font-light text-xl">Welcome to the Starting Page!</p>
      <NuxtLink
        to="/login"
        class="inline-block w-[150px] text-center bg-yellow-300 border-2 border-fuchsia-500 text-fuchsia-500 text-2xl font-semibold py-2 px-6 rounded-2xl hover:bg-fuchsia-900 hover:text-amber-50 transition-colors duration-300"
      >
        Come in
      </NuxtLink>
    </div>
  </template>
  
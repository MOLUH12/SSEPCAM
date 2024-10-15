<template>
    <div class="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transition-transform duration-500 transform hover:translate-x-0">
      <div class="h-16 bg-green-500 flex items-center justify-center">
        <h3 class="text-2xl font-bold">SSEPCAM</h3>
      </div>
      <nav class="mt-10">
        <router-link :to="{ name: 'home' }" class="block py-2.5 px-4 rounded hover:bg-green-500 transition-colors duration-300">
          Dashboard
        </router-link>
        <router-link :to="{ name: 'home' }" class="block py-2.5 px-4 rounded hover:bg-green-500 transition-colors duration-300">
          Cases
        </router-link>
        <router-link :to="{ name: 'home' }" class="block py-2.5 px-4 rounded hover:bg-green-500 transition-colors duration-300">
          Statistics
        </router-link>
        <router-link :to="{ name: 'home' }" class="block py-2.5 px-4 rounded hover:bg-green-500 transition-colors duration-300">
          Settings
        </router-link>
      </nav>
    </div>
  </template>
  
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-8 min-h-screen bg-gray-100">
    <div class="main-left flex items-center justify-center p-8">
      <div class="p-12 bg-white border border-gray-200 shadow-lg rounded-lg">
        <h1 class="mb-6 text-4xl font-semibold text-purple-700">Welcome Back!</h1>

        <p class="mb-6 text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <p class="font-semibold text-gray-600">
          Don't have an account? 
          <RouterLink :to="{'name': 'signup'}" class="underline text-purple-600">Click here</RouterLink> to create one!
        </p>
      </div>
    </div>

    <div class="main-right flex items-center justify-center">
      <div class="p-12 bg-white border border-gray-200 shadow-lg rounded-lg w-full max-w-md">
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div>
            <label class="text-gray-700 font-medium">E-mail</label><br>
            <input type="email" v-model="form.email" placeholder="Your e-mail address" class="w-full mt-2 py-4 px-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition">
          </div>

          <div>
            <label class="text-gray-700 font-medium">Password</label><br>
            <input type="password" v-model="form.password" placeholder="Your password" class="w-full mt-2 py-4 px-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition" autocomplete="new-password">
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-100 text-red-600 rounded-lg p-4">
              <p v-for="error in errors" v-bind:key="error" class="mb-1">- {{ error }}</p>
            </div>
          </template>

          <div>
            <button class="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out">Log in</button>
          </div>
        </form>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: []
    }
  },
  
  methods: {
    async submitForm() {
      this.errors = []

      // Vérification des champs
      if (this.form.email === '') {
        this.errors.push('Your e-mail is missing')
      }

      if (this.form.password === '') {
        this.errors.push('Your password is missing')
      }

      // Si pas d'erreurs, tenter la connexion
      if (this.errors.length === 0) {
        try {
          // Envoyer les informations de connexion
          const loginResponse = await axios.post('/api/login/', this.form)

          // Stocker le token JWT dans le localStorage
          localStorage.setItem('jwt_token', loginResponse.data.token);
          console.log(localStorage.getItem('jwt_token'));


          // Stocker le token d'accès
          this.userStore.setToken(loginResponse.data)
          axios.defaults.headers.common["Authorization"] = "Bearer " + loginResponse.data.access;

          // Récupérer les informations de l'utilisateur
          const userInfoResponse = await axios.get('/api/me/')
          this.userStore.setUserInfo(userInfoResponse.data)

          // Redirection basée sur le rôle de l'utilisateur
          const userRole = userInfoResponse.data.role
          
          if (userRole === 'Super Administrateur') {
            this.$router.push('/dashboard')
          } else if (userRole === 'Administrateur') {
            this.$router.push('/dashboard')
          } else if (userRole === 'Formation Sanitaire') {
            this.$router.push('/dashboard')
          } else {
            this.$router.push('/dashboard')
          }
        } catch (error) {
          console.log('error', error)
          this.errors.push('The email or password is incorrect! Or the user is not activated!')
        }
      }
    }
  }
}
</script>

<style>
html, body {
  font-family: 'Poppins', sans-serif;
}
</style>

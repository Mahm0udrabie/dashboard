<template>
<header class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <NuxtLink to="/" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">Tailblocks</span>
    </NuxtLink>
    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      
      <div v-if="!$auth.loggedIn">
        <a to="/register" class="mr-5 hover:text-white">Register</a>
          <NuxtLink to="/login"  class="mr-5 hover:text-white">Login</NuxtLink>
      </div>
    </nav>
    <div v-if="$auth.loggedIn">
        <a class="mr-5 hover:text-white"><fa icon="user"/> {{ $store.$storage.getUniversal('auth.user').name}}</a>
      </div>
    <button 
      v-if="$auth.loggedIn" 
      class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
          @click.prevent="logout"
          title="logout"
      >
      
     <fa icon="sign-out-alt"  />
    </button>
  </div>
</header>
</template>
<script>

export default {
  name: 'Navbar',
  middleware: 'authentication',
  methods: {
    logout() {
       this.$axios.post('/logout').then((response) => {
        this.$auth.strategy.token.set(null)
          this.$auth.$storage.setUniversal('user', null, false)
         this.$auth.setUser(null)
        this.$router.push('/login')
      });
    },
  },
}
</script>
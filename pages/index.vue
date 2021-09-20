<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
      <button v-if="role" class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create</button>
        <h2
          class="
            text-xs text-indigo-500
            tracking-widest
            font-medium
            title-font
            mb-1
          "
        >
          ROOF PARTY POLAROID
        </h2>
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Master Cleanse Reliac Heirloom
        </h1>
      </div>
      <div class="flex flex-wrap -m-4">
        <div v-for="(index, x) in competitions" :key="x" class="p-4 md:w-1/3">
          <div  class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
            <div class="flex items-center mb-3">
              <div
                class="
                  w-8
                  h-8
                  mr-3
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-500
                  text-white
                  flex-shrink-0
                "
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 class="text-gray-900 text-lg title-font font-medium">
                {{index.name}}
                
              </h2>
            </div>
            <div class="flex-grow">
              <p class="leading-relaxed text-base">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine.
              </p>
              <a class="mt-3 text-indigo-500 inline-flex items-center"
                >Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'List',
  middleware: 'authentication',
  data: () => ({
    competitions: [],
    role: false
  }),
  created() {
    this.competition();
    this.logged();
         console.log(this.$store.$storage.getUniversal('role'));
  },
  methods: {
    logged() {
      this.res = this.$axios.get('/user').then((response) => {
        this.user = response.data.data;
        if(this.user.role_name === 'superadministrator') {
          this.role = true
        }
      });
    },
    competition() {
      this.res = this.$axios.get('http://127.0.0.1:8000/api/competitions').then((response) => {
        this.competitions = response.data.data;
      });
    },
  },
}
</script>

<style lang="scss" scoped>
</style>

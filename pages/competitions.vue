<template>
  <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1
            class="
              sm:text-3xl
              text-2xl
              font-medium
              title-font
              mb-4
              text-gray-900
            "
          >
            Add New Competition
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep.
          </p>
        </div>
        <div
          v-if="is_error"
          class="
            bg-red-100
            border border-red-400
            text-red-700
            px-4
            py-3
            rounded
            relative
          "
          role="alert"
        >
          <strong class="font-bold">Opps! </strong>
          <span class="block sm:inline">{{ error }}</span>
        </div>
        <div
          class="
            flex
            lg:w-2/3
            w-full
            sm:flex-row
            flex-col
            mx-auto
            px-8
            sm:space-x-4 sm:space-y-0
            space-y-4
            sm:px-0
            items-end
          "
        >
          <div class="relative flex-grow w-full">
            <label for="name" class="leading-7 text-sm text-gray-600"
              >Name</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              class="
                w-full
                bg-gray-100 bg-opacity-50
                rounded
                border border-gray-300
                focus:border-indigo-500
                focus:bg-transparent
                focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-700
                py-1
                px-3
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
          </div>
          <div class="relative flex-grow w-full">
            <label for="status" class="leading-7 text-sm text-gray-600"
              >Status</label
            >
            <!-- <input type="status" id="status" name="status" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"> -->
            <select
              v-model="status"
              name="status"
              class="
                w-full
                rounded
                border
                appearance-none
                border-gray-300
                py-2
                focus:outline-none
                focus:ring-2 focus:ring-indigo-200
                focus:border-indigo-500
                text-base
                pl-3
                pr-10
              "
            >
              <option value="1">Active</option>
              <option value="0">Draft</option>
            </select>
          </div>
          <button
            class="
              text-white
              bg-indigo-500
              border-0
              py-2
              px-8
              focus:outline-none
              hover:bg-indigo-600
              rounded
              text-lg
            "
            @click.prevent="addCompeition"
          >
            Create
          </button>
        </div>
      </div>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div v-for="(index, x) in competitions" :key="x" class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
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
                <h2 class="text-gray-900 title-font font-medium">
<!--                 
                   :to="{ name: 'competition?id', params: { id: index.id }}"      
                class="mr-5 hover:text-gray">{{ index.name  }} -->
                {{ index.name}}
                </h2>
                <div 
              class="ml-40 flex p-3"
                
                >
                  <NuxtLink 
              
                          :to="{
                  path: 'competition',
                  query: {
                    id:index.id ,
                  },
                }">
                edit 
                
                </NuxtLink>
                <NuxtLink 
                class="ml-1"
                :to="{
                  path: 'competition',
                  query: {
                    id:index.id ,
                  },
                }">
                delete
                </NuxtLink>

                </div>
              
              </div>
              <!-- <div class="flex-grow">
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
            </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Compeition',
  middleware: ['authentication', 'admin'],
  data: () => ({
    competitions: [],
    name: null,
    status: 1,
    is_error: false,
    error: '',
  }),
  created() {
    this.competition();
  },
  methods: {
    async addCompeition() {
          this.is_error = false
      try {
        await this.$axios
          .post('/competitions', {
            name: this.name,
            status: this.status,
          }).then((response) => {
            this.competitions.unshift(response.data.data);
          })
          .catch((err) => {
            this.is_error = true
            this.error = err.response.data.errors.name[0]
          })
            
      } catch (err) {
        console.log(err)
      }
    },
    competition() {
      this.res = this.$axios
        .get('http://127.0.0.1:8000/api/competitions')
        .then((response) => {
          this.competitions = response.data.data
        })
    },
  },
}
</script>

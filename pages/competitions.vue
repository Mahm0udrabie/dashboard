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
            <label for="start" class="leading-7 text-sm text-gray-600"
              >Start</label
            >
            <input
              v-model="start"
              id="start"
              type="date"
              name="start"
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
            <label for="end" class="leading-7 text-sm text-gray-600">End</label>
            <input
              v-model="end"
              id="end"
              type="date"
              name="end"
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
                  {{ index.name }}
                </h2>
                <div class="flex p-3">
                  <NuxtLink
                    :to="{
                      path: 'competition',
                      query: {
                        id: index.id,
                      },
                    }"
                  >
                    <fa icon="edit" class="text-blue-300" />
                  </NuxtLink>
                  <button class="ml-1" @click.prevent="removeCompeition(index)">
                    <fa icon="trash" class="text-red-500" />
                  </button>
                </div>
              </div>
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
    start: '',
    end: '',
  }),
  created() {
    this.competition()
  },
  methods: {
    async addCompeition() {
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      today = mm + '-' + dd + '-' + yyyy
      today = yyyy + '-' + mm + '-' + dd

      try {
        await this.$axios
          .post('/competitions', {
            name: this.name,
            start: this.start,
            end: this.end,
            status: this.status,
          })
          .then((response) => {
            if (
              response.data.data.start <= today &&
              response.data.data.end >= today
            )
              this.competitions.unshift(response.data.data)
            this.toaster('success', response.data.status)
          })
          .catch((err) => {
            this.toaster('error', err.response.data.message)
          })
      } catch (err) {
        console.log(err)
      }
    },
    competition() {
      this.res = this.$axios.get('/competitions').then((response) => {
        this.competitions = response.data.data
      })
    },
    removeCompeition(index) {
      this.res = this.$axios
        .delete('/competitions/' + index.id + '/delete')
        .then((response) => {
          for (let i = 0; i < this.competitions.length; i++) {
            if (this.competitions[i] === index) {
              this.competitions.splice(i, 1)
            }
          }
          this.toaster('success', response.data.status)
        })
    },
  },
}
</script>

<template>
  <div>
    <section class="text-gray-600 body-font">
      <div
        class="
          container
          mx-auto
          flex flex-col
          px-5
          py-24
          justify-center
          items-center
        "
      >
        <img
          class="
            lg:w-2/6
            md:w-3/6
            w-5/6
            mb-10
            object-cover object-center
            rounded
          "
          alt="hero"
          src="https://dummyimage.com/720x600"
        />
        <div
          class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center"
        >
        <!-- eslint-disable-next-line vue/valid-v-model -->
          <p
            class="
              title-font
              sm:text-4xl
              text-3xl
              mb-4
              font-medium
              text-gray-900
            "
          v-text="name"

          >
          </p>

          <div class=" flex flex-col text-center w-full">
              <!-- flex flex-col  w-full mb-12 -->
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
            @click.prevent="update"
          >
            Update
          </button>
        </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['authentication', 'admin'],
  data: () => ({
    competitionId: '',
    name: null,
    status: 1,
  }),
  mounted() {
      this.competitionId = this.$route.query.id
      this.show();
  },
 
  methods: {
      show() {
      try {
          console.log('/competitions/'+this.competitionId);
          this.$axios.get('/competitions/'+this.competitionId).then((response) => {
              this.name = response.data.data.name;
          }).catch((err) => {
            this.$router.push('/login',err)
          })
          } catch (err) {
            this.$router.push('/login')
      }
          
      },
    update() {
          this.$axios.post('/competitions/'+this.competitionId+'/update', {
            name: this.name,
            status: this.status,
          }).then((response)=> {
            this.toaster('success', response.data.status)
          })
          .catch((err) => {
          this.toaster('error', err.response.data.message)
          })
    }
  }
}
</script>
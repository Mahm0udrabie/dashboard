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
          v-text="competition"
            class="
              title-font
              sm:text-4xl
              text-3xl
              mb-4
              font-medium
              text-gray-900
            "
          >
          </p>

          <div class=" flex flex-col text-center w-full">
              <!-- flex flex-col  w-full mb-12 -->
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
    competition: '',
    name: null,
    status: 1,
    is_error: false,
    error: '',
  }),
  mounted() {
      this.competitionId = this.$route.query.id
      this.show();
  },
 
  methods: {
      show() {
          console.log('/competitions/'+this.competitionId);
          this.$axios.get('/competitions/'+this.competitionId).then((response) => {
              this.competition = response.data.data.name;
          });
          
      },
    update() {
          console.log('/competitions/'+this.competitionId);
          this.$axios.post('/competitions/'+this.competitionId+'/update', {
            name: this.name,
            status: this.status,
          })
          .catch((err) => {
            this.is_error = true
            this.error = err.response.data.errors.name[0]
          })
        //   redirect('/competitions')
    }
  }
}
</script>
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
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Members</h1>
      <div class="-wfull mx-auto leading-relaxed text-base">
    <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
      <div class="relative flex-grow w-full">
        <label for="full-name" class="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      </div>
      <div class="relative flex-grow w-full">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      </div>
      <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
    </div>
      </div>
    </div>
    <div class="lg:w-2/3 w-full mx-auto overflow-auto">
      <table class="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Plan</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Speed</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Storage</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
            <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-3">Start</td>
            <td class="px-4 py-3">5 Mb/s</td>
            <td class="px-4 py-3">15 GB</td>
            <td class="px-4 py-3 text-lg text-gray-900">Free</td>
            <td class="w-10 text-center">
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</section>
  </div>
</template>

<script>
export default {
    name: "EditTeam",
  middleware: ['authentication', 'admin'],
  data: () => ({
    members: [],
    teamdId: '',
    username: '',
    useremail: '',
    name: null,
    is_error: false,
    error: '',
    usererror: '',
    is_usererror:false
  }),
  mounted() {
      this.teamId = this.$route.query.id
      this.show();
  },
 
  methods: {
      show() {
      try {
          console.log('/clubs/'+this.teamId);
          this.$axios.get('/clubs/'+this.teamId).then((response) => {
              this.name = response.data.data.name;
          }).catch((err) => {
            this.$router.push('/login',err)
            console.log(err);
          })
          } catch (err) {
            this.$router.push('/login')
      }
          
      },
    update() {
        try {
          this.$axios.post('/clubs/'+this.teamId+'/update', {
            name: this.name,
            status: this.status,
          })
          .catch((err) => {
            this.is_usererror = true
            this.usererror = err.response.data.message
        }) } catch (err) {
            this.$router.push('/login')
      }
        
    },
    addMember() {
        try {
          this.$axios.post('/clubs/members', {
            name: this.username,
            email: this.useremail,
            club_id: this.teamdId
          })
          .catch((err) => {
            this.is_error = true
            this.error = err.response.data.message
        }) } catch (err) {
            this.$router.push('/login')
      }
    }
  }
}
</script>
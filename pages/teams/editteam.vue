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
        <div
          class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center"
        >
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
          ></p>

          <div class="flex flex-col text-center w-full">
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
        <h1
          class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900"
        >
          Members
        </h1>
        <div class="-wfull mx-auto leading-relaxed text-base">
          <div
            class="
              flex
              
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
              <label for="full-name" class="leading-7 text-sm text-gray-600"
                >Name</label
              >
              <input
              v-model="username"
                type="text"
                id="name"
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
              <label for="email" class="leading-7 text-sm text-gray-600"
                >Email</label
              >
              <input
              v-model="useremail"
                type="email"
                id="email"
                name="email"
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
              w-full
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
              @click.prevent="addMember"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
        <div class=" flex flex-wrap m-4">
        <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="text-2xl font-medium title-font mb-4 text-blue-600 tracking-widest">All Team Members <fa icon="users" /></h1>
    </div>
    <div v-for="(user, index) in members" :key="index" class="flex flex-wrap -m-4">
      <div  class="p-4 md:w-1/3lg:w-1/2">
        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://dummyimage.com/200x200">
          <div class="flex-grow sm:pl-8">
            <h2 class="title-font font-medium text-lg text-gray-900">

                  <NuxtLink 
              
                :to="{
                  path: 'user',
                  query: {
                    id:user.id ,
                  },
                }">
               {{ user.name }}              
                </NuxtLink>

            </h2>
            <h3 class="text-gray-500 mb-3">{{user.club}}</h3>
            <p class="mb-4">{{user.role_name}}.</p>
            <p class="mb-4">{{user.email}}</p>
            <span class="inline-flex">
              <a class="text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span>
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
  name: 'EditTeam',
  middleware: ['authentication', 'admin'],
  data: () => ({
    members: [],
    teamdId: '',
    username: '',
    useremail: '',
    name: null, 
  }),
  created() {
this.teamId = this.$route.query.id
    this.getAllTeamMembers()
  },
  mounted() {
    this.teamId = this.$route.query.id
    this.getAllTeamMembers()
    this.show()
  },

  methods: {
    show() {
      try {
        console.log('/clubs/' + this.teamId)
        this.$axios
          .get('/clubs/' + this.teamId)
          .then((response) => {
            this.name = response.data.data.name
          })
          .catch((err) => {
            this.$router.push('/login', err)
            console.log(err)
          })
      } catch (err) {
        this.$router.push('/login')

      }
    },
    update() {
      try {
        this.$axios
          .post('/clubs/' + this.teamId + '/update', {
            name: this.name,
            status: this.status,
          }).then((response) => {
            this.toaster('success', response.data.status)
          })
          .catch((err) => {
              
            this.toaster('error', err.response.data.message)
          })
      } catch (err) {
        this.$router.push('/login')
      }
    },
    addMember() {
      try {          
        this.$axios
          .post('/clubs/members', {
            name: this.username,
            email: this.useremail,
            club_id: this.teamId,
          })
          .then((response) => {
            this.members.unshift(response.data.data)
            this.toaster('success', response.data.status)
          })
          .catch((err) => {
        this.toaster('error', err.response.data.message)
          })
      } catch (err) {
        this.$router.push('/login')
      }
    },
    getAllTeamMembers() {
      try {
        this.$axios
          .get('/clubs/users/'+this.teamId)
          .then((response) => {
              console.log(response.data.data);
            this.members = response.data.data
            console.log(this.members)
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
<template>
  <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full">
          <h1
            class="
              sm:text-3xl
              text-2xl
              font-medium
              title-font
              text-gray-900
            "
          >
            {{ team.name }}
             <fa v-if="team.status == 1" icon='signal' class="text-green-600" />
           <fa v-if="team.status == 0" icon='power-off' class="text-red-600" />
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            {{ team.competition }}
          </p>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
           

          </p>
        </div>
        <div v-if="$store.$storage.getUniversal('auth.user').role_name === 'superadministrator' || $store.$storage.getUniversal('auth.user').name === team.username"
          class="w-full  flex flex-col mb-16 items-center text-center"
        >

<div class="flex flex-col text-center w-full">
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
        <div class="container px-5 py-24 mx-auto flex flex-col text-center items-center">
            <div class=" md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0">
            <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
                <input  
                v-model="username"
                type="text"
                id="name"
                name="name"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                <input 
                v-model="useremail"
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" @click.prevent="addMember">Add Member</button>
            </div>
        </div>
          
        </div>
        <div class="flex flex-col text-center w-full mb-20 items-center">
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
            Members
             <fa icon='users' class="text-blue-600" />
          </h1>
         
    </div>

        <div
          v-for="(member, x) in members"
          :key="x"
          class="flex flex-col w-full"
        >
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div
              class="
                h-full
                flex
                items-center
                border-gray-200 border
                p-4
                rounded-lg
              "
            >
              <img
                alt="team"
                class="
                  w-16
                  h-16
                  bg-gray-100
                  object-cover object-center
                  flex-shrink-0
                  rounded-full
                  mr-4
                "
                src="https://dummyimage.com/80x80"
              />
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">
                  {{ member.name }}
                </h2>
                <p class="text-gray-500">{{ member.role_name }}</p>
                <p class="text-gray-500">{{ member.email }}</p>
                <button
                class="
                  text-red-500
                  bg-white-500
                  border-0
                  py-2
                  px-8
                  rounded
                  text-lg
                "
                 @click.prevent="deleteMember(member)">
                 delete
                <fa icon='trash' class="text-red-500"/>
                 
                 </button>
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
  name: 'Team',
  middleware: 'authentication',
  data: () => ({
    team: [],
    members: [],
    name: '',
    status:0,
    username: '',
    useremail: '',
  }),
  mounted() {
    this.teamId = this.$route.query.id;
    this.show()
    this.getAllTeamMembers()
  },
  methods: {
    show() {
      try {
        console.log('/clubs/' + this.teamId)
        this.$axios
          .get('/clubs/' + this.teamId)
          .then((response) => {
            this.team = response.data.data
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
        .post('/clubs/'+this.teamId +'/update',
        { 
        status: this.status,
        name: this.name
        }
        ).then((response) => {
        this.team.status = this.status;
        this.team.name = this.name;
        this.toaster('success', response.data.status)
        })
        .catch((err) => {
        this.toaster('error', err.response.data.message)
        })
    } catch (err) {
    console.log(err)
    }
},
    getAllTeamMembers() {
      try {
        this.$axios
          .get('/clubs/users/' + this.teamId)
          .then((response) => {
            console.log(response.data.data)
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
    deleteMember(member) {
        this.$axios.delete(member.id+'/user/delete').then((response) => {
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i] === member) {
              this.members.splice(i, 1)
            }
          }
          this.toaster('success', response.data.status)
        })
    }
  },
}
</script>
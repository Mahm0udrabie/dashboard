<template>
  <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div 
        v-if="$store.$storage.getUniversal('auth.user').role_name ==='superadministrator' || $store.$storage.getUniversal('auth.user').role_name ==='administrator'"
        class="container px-5 py-24 mx-auto">
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
              Add New Team 
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
              @click.prevent="addTeam"
            >
              Create
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
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
              Teams
            </h1>
          </div>
          <div
            v-for="(team, index) in teams"
            :key="index"
            class="xl:w-1/3 md:w-1/2 p-4"
          >
            <div class="border border-gray-200 p-6 rounded-lg">
              <div class="flex">
                <div
                  class="
                    w-10
                    h-10
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-100
                    text-indigo-500
                    mb-4
                  "
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2
                  class="text-lg text-gray-900 font-medium title-font mb-2 ml-5"
                >
                  <NuxtLink
                :to="{
                  path: 'teams/team',
                  query: {
                    id: team.id,
                  },
                }"
              >
              {{ team.name }}
              </NuxtLink>
                </h2>
              </div>
            </div>
            <div 
               v-if="$store.$storage.getUniversal('auth.user').role_name ==='superadministrator' "
            class="flex p-3">
              <NuxtLink
                :to="{
                  path: 'teams/editteam',
                  query: {
                    id: team.id,
                  },
                }"
              >
                <fa icon="edit" class="text-blue-300" />
              </NuxtLink>
              <button class="ml-1" @click.prevent="removeTeam(team)">
                <fa icon="trash" class="text-red-500" />
              </button>
            </div>
            <div 
               v-if="$store.$storage.getUniversal('auth.user').role_name ==='administrator' && team.user_id === $store.$storage.getUniversal('auth.user').id"
            class="flex p-3">
              <NuxtLink
                :to="{
                  path: 'teams/editteam',
                  query: {
                    id: team.id,
                  },
                }"
              >
                <fa icon="edit" class="text-blue-300" />
              </NuxtLink>
              <button class="ml-1" @click.prevent="removeTeam(team)">
                <fa icon="trash" class="text-red-500" />
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
  name: 'Teams',
  middleware: 'authentication',
  data: () => ({
    teams: [],
    competitionId: '',
    name: null,
  }),
  mounted() {
    this.competitionId = this.$route.query.id
    this.clubs()
  },
  methods: {
    clubs() {
      try {
        this.$axios.get('/clubs/competitions/'+ this.competitionId).then((response) => {
          this.teams = response.data.data
        })
      } catch (err) {

      }
    },
    addTeam() {
      try {
        this.$axios
          .post('/clubs', {
            name: this.name,
            competition_id: this.competitionId,
          })
          .then((response) => {
            if(response.data.data.status === 1)
              {
                this.teams.unshift(response.data.data)
                this.toaster('success', response.data.status)
              } else {
                this.toaster('info', 'Admin will review your team soon')
              }
          })
          .catch((err) => {
            this.toaster('error', err.response.data.message)
            console.log(err)
          })
      } catch (err) {}
    },
    removeTeam(team) {
    this.res = this.$axios
      .delete('/clubs/' + team.id + '/delete')
      .then((response) => {
        for (let i = 0; i < this.teams.length; i++) {
          if (this.teams[i] === team) {
            this.teams.splice(i, 1)
          }
        }
      })
    },
  },
}
</script>
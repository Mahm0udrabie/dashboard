<template>
<div>
    <section class="text-gray-600 body-font">
    
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-indigo-500 mb-5">Configurations <fa icon="cogs" /></h1>
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
            <label for="start" class="leading-7 text-sm text-gray-600"
              >Register date <fa icon="table"/></label
            >
            <input
              v-model="register_date"
              id="register_date"
              type="date"
              name="register_date"
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
            <label for="is_able_to_register" class="leading-7 text-sm text-gray-600"
              >Able to Register  <fa icon="check"/></label
            >
            <!-- <input type="status" id="status" name="status" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"> -->
            <select
              v-model="is_able_to_register"
              name="is_able_to_register"
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
              <option value="1">On</option>
              <option value="0">Off</option>
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
            @click.prevent="setConfigurations"
          >
            Create
          </button>
        </div>
            </div>
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-indigo-500 mb-5">Control Teams  <fa icon="users-cog" /></h1>
            <div v-for="(team, x) in teams" :key="x" class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    </div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">{{team.name}}</h2>
                </div>
                
                <div class="flex-grow">
                    <p class="leading-relaxed text-base">{{ team.competition}}</p>
                    <button v-if="team.status === 0"  class="mt-3 mr-2 text-green-500 inline-flex items-center"
                    @click.prevent="updateStatus(team, 1)"
                    >
                          Active
                    </button>    
                    <button v-if="team.status === 1"  class="mt-3 text-red-500 inline-flex items-center"
                    @click.prevent="updateStatus(team, 0)"
                    >
                         Draft
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
    name: 'Configurations',
    middleware: ['authentication' , 'admin'],
    data: () => ({
    teams: [],
    is_able_to_register: 0,
    register_date: '',
    configurations: []
  }),
  mounted() {
    this.getTeams();
},
methods: {
getTeams() {
    try {
    this.$axios
        .get('/clubs').then((response) => {
           this.teams = response.data.data;
        })
        .catch((err) => {
        console.log(err)
        })
    } catch (err) {
    console.log(err)
    }
},
updateStatus(team, x) {
        try {
    this.$axios
        .post('/clubs/'+team.id+'/update',{ 
        status: x,
        name: team.name}
        ).then((response) => {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i] === team) {
              this.teams[i].status = x;
            }
          }
        this.toaster('success', response.data.status)
        })
        .catch((err) => {
        console.log(err)
        })
    } catch (err) {
    console.log(err)
    }
},
setConfigurations() {
     try {
    this.$axios
        .post('/set-configurations',{ 
        is_able_to_register: this.is_able_to_register,
        register_date: this.register_date,
        }
        ).then((response) => {
            this.configurations = response.data.date;
        this.toaster('success', response.data.status);
        })
        .catch((err) => {
        this.toaster('error', err.response.data.message);
        console.log(err)
        })
    } catch (err) {
    console.log(err)
    }
}
}
}
</script>
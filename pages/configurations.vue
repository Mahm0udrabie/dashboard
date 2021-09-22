<template>
<div>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Teams</h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">Control your teams</h1>
            </div>
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
                        <fa icon="check" class="mr-3" />  Active
                    </button>    
                    <button v-if="team.status === 1"  class="mt-3 text-red-500 inline-flex items-center"
                    @click.prevent="updateStatus(team, 0)"
                    >
                        <fa  icon="power-off" class="mr-3" />  Draft
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
}
}
}
</script>
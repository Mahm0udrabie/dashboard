<template>
    <div>
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ team.name }}</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{team.competition}}</p>
                </div>
                <div  v-for="(member, x) in members" :key="x" class="flex flex-wrap -m-2">
                    <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80">
                            <div class="flex-grow">
                                <h2 class="text-gray-900 title-font font-medium">{{member.name}}</h2>
                                <p class="text-gray-500">{{member.role_name}}</p>
                                <p class="text-gray-500">{{member.email}}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- <div class="h-full flex items-center bg-gray-200 border-gray-400 border p-4 rounded-lg" v-else>No Members yet</div> -->
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
  }),
  mounted() {
    this.teamId = this.$route.query.id;
    this.show();
    this.getAllTeamMembers();
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
}
}
</script>
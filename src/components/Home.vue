<template>
  <v-container>
    <v-layout row wrap class="mb-4">
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large router to="/meetups/new" class="primary">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="loadMeetup(meetup.id)"
            style="cursor: pointer;"
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        {
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/4/40/11600_Ge%C3%A7itli-S%C3%B6%C4%9F%C3%BCt-Bilecik%2C_Turkey_-_panoramio_%2815%29.jpg",
          id: "qwe11231",
          title: "Bilecik Buluşması"
        },
        {
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1280px-Paris_Night.jpg",
          id: "asdh121",
          title: "Meetup in Paris"
        }
      ]
    };
  },
  methods: {
    loadMeetup(id) {
      this.$router.push("/meetup/" + id);
    }
  }
};
</script>


<style scoped>
.title {
  text-align: center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>

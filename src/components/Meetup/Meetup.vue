<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">
            {{ meetup.title }}
            <v-layout v-if="userIsCreator">
              <v-spacer></v-spacer>
              <EditMeetupDetailsDialog :meetup="meetup"></EditMeetupDetailsDialog>
            </v-layout>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="green--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>
              <EditMeetupDateDialog :meetup="meetup" v-if="userIsCreator"></EditMeetupDateDialog>
            </div>
            <div>{{meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="success ma-2">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditMeetupDetailsDialog from "./Edit/EditMeetupDetailsDialog.vue";
import EditMeetupDateDialog from "./Edit/EditMeetupDateDialog.vue";
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) return false;
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  components: {
    EditMeetupDetailsDialog,
    EditMeetupDateDialog
  }
};
</script>

<style>
</style>

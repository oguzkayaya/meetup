<template>
  <v-dialog width="75%" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit Date</v-btn>
    <v-card>
      <v-container class="text-xs-center">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex>
                <v-date-picker v-model="editableDate" actions></v-date-picker>
              </v-flex>
              <v-flex>
                <v-time-picker format="24hr" v-model="editableHour"></v-time-picker>
              </v-flex>
            </v-layout>
            <v-btn color="blue--text darken-1" flat @click.native="editDialog = false">Close</v-btn>
            <v-btn color="blue--text darken-1" flat @click.native="onSaveChanges">Save</v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableDate: null,
      editableHour: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDay = new Date(this.editableDate).getDate();
      const newMonth = new Date(this.editableDate).getMonth();
      const newYear = new Date(this.editableDate).getFullYear();
      const newHour = this.editableHour;

      const a = new Date(this.meetup.date);
      a.setFullYear(newYear);
      a.setDate(newDay);
      a.setMonth(newMonth);
      a.setHours(newHour.split(":")[0]);
      a.setMinutes(newHour.split(":")[1]);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: a
      });
    }
  },
  created() {
    const a = new Date(this.meetup.date);

    const date = new Date(this.meetup.date);
    this.editableDate = date.toISOString().substr(0, 10);

    this.editableHour = date.getHours() + ":" + date.getMinutes();
  }
};
</script>

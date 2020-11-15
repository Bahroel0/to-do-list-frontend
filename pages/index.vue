<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="6">
        <v-card outlined>
          <v-card-title>
            Aplikasi ToDo
            <v-spacer />
            <v-btn class="primary text-none" @click="dialog = true">
              <v-icon left size="18">mdi-plus</v-icon>
              Buat
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list three-line>
              <template v-for="(activity, i) in activities">
                <v-list-item :key="activity._id">
                  <v-list-item-icon>
                    <v-avatar :color="getColor(activity.name)">
                      <span class="title white--text">
                        {{ activity.name.charAt(0).toUpperCase() }}
                      </span>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ activity.name }}</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon class="red" @click="remove(activity._id)">
                      <v-icon color="white"> mdi-delete </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider v-if="i < activities.length - 1" :key="i" />
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title> Buat Aktivitas </v-card-title>
        <v-card-text>
          <v-form ref="form_activity">
            <v-text-field
              v-model="form.name"
              :rules="[(v) => !!v || 'Nama harus diisi']"
              outlined
              placeholder="Nama"
            />
            <v-textarea
              v-model="form.description"
              :rules="[(v) => !!v || 'Deskripsi harus diisi']"
              rows="2"
              auto-grow
              outlined
              placeholder="Deskripsi"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text class="text-none primary" @click="save()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Color from 'color-hash'
export default {
  data() {
    return {
      dialog: false,
      form: {
        name: null,
        description: null,
      },
      activities: [],
      item: null,
    }
  },
  created() {
    this.getActivities()
  },
  mounted() {
    this.$socket.onmessage = (payload) => {
      this.getActivities()
    }
  },
  methods: {
    getActivities() {
      this.$axios.get('/activity').then((res) => {
        this.activities = res.data
      })
    },
    save() {
      if (this.$refs.form_activity.validate()) {
        this.$axios.post('/activity', this.form).then((res) => {
          if (res.data.success) {
            this.$socket.sendObj({ name: 'trigger' })
            this.reset()
          }
        })
      }
    },
    remove(id) {
      this.$axios.delete(`/activity/${id}`).then((res) => {
        if (res.data.success) {
          this.$socket.sendObj({ name: 'trigger' })
        }
      })
    },
    reset() {
      this.dialog = false
      this.$refs.form_activity.reset()
    },
    getColor(param) {
      return new Color().hex(param)
    },
  },
}
</script>

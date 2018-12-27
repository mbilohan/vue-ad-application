<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create New Ad</h1>
                <v-form ref="form" v-model="valid" lazy-validation class="mb-3">
                    <v-text-field name="title" label="Add title" type="text" v-model="title" required :rules="[v => !!v || 'Title is required']"></v-text-field>
                    <v-textarea name="description" label="Add description"
                                  type="text" v-model="description" required :rules="[v => !!v || 'Description is required']"></v-textarea>

                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn color="blue-grey" class="white--text warning mb-3">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <div>
                            <img src="" alt="" height="100">
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch label="Add promo" color="primary" v-model="promo"></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn class="success" :disabled="!valid" @click="createAd">Create Ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imgSrc: 'https://loremflickr.com/1440/500'
        }

        this.$store.dispatch('createAd', ad)
      }
    }
  }
}
</script>

<style scoped>

</style>

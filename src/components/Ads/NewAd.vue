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
                        <v-btn color="blue-grey" class="white--text warning mb-3" @click="triggerUpload">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input ref="fileInput" type="file" style="display: none;" accept="image/*" @change="onFileChange">
                        <div>
                            <img :src="imgSrc" alt="" height="100" v-if="imgSrc">
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
                        <v-btn class="success" :disabled="!valid || !img || loading" @click="createAd" :loading="loading">Create Ad</v-btn>
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
      valid: false,
      img: null,
      imgSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.img) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          img: this.img
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()

      reader.onload = e => {
        this.imgSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.img = file
    }
  }
}
</script>

<style scoped>

</style>

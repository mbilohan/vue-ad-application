import * as firebase from 'firebase'

class Ad {
  constructor (title, description, ownerId, imgSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imgSrc = imgSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => (
        a.id === id
      ))

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      const img = payload.img

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )

        const ad = await firebase.database().ref('ads').push(newAd)
        // const imgExt = img.name.slice(img.name.lastIndexOf('.'))

        const fileData = await firebase.storage().ref(`ads/${ad.key}-${img.name}`).put(img)
        // const imgSrc = fileData.metadata.downloadURLs[0]
        await fileData.ref.getDownloadURL()
          .then(url => {
            newAd.imgSrc = url
          }).catch(() => {})

        await firebase.database().ref('ads').child(ad.key).update({
          imgSrc: newAd.imgSrc
        })

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try {
        const fbValue = await firebase.database().ref('ads').once('value')
        const ads = fbValue.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(ad.title, ad.description, ad.ownerId, ad.imgSrc, ad.promo, key)
          )
        })

        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await firebase.database().ref('ads').child(id).update({
          title, description
        })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}

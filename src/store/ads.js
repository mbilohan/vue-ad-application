export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptate.',
        promo: false,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id: '101'
      },
      {
        title: 'Second ad',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptate.',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: '102'
      },
      {
        title: 'Third ad',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptate.',
        promo: false,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '103'
      },
      {
        title: 'Fourth ad',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptate.',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '104'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd ({commit}, payload) {
      payload.id = Math.random().toString()

      commit('createAd', payload)
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
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}

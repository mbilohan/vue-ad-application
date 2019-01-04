<template>
    <v-container v-if="!loading && orders.length !== 0">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Orders</h1>

                <v-list subheader two-line>
                    <v-list-tile v-for="order in orders" :key="order.id">
                        <v-list-tile-action>
                            <v-checkbox :input-value="order.done" @change="markDone(order)" color="success"></v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ order.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container v-else-if="!loading && orders.length === 0">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <p>You have no orders</p>
            </v-flex>
        </v-layout>
    </v-container>
    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-xs-center pt-5">
                    <v-progress-circular :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
      order.done = true
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

<style scoped>

</style>

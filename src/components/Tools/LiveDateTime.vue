<template>
	<div class="text-subtitle-1 ml-4">{{ date }}</div>
</template>

<script>
import moment from 'moment'

export default {

  name: 'LiveDateTime',

  data () {
    return {
    	date: ''
    }
  },
  methods: {
  	getDate() {
  		this.date = moment(new Date()).format("MMM D, H:mm:ss")
  		setTimeout(this.getDate, 1000)
  	}
  },
  mounted() {
  	this.getDate()
  }
}
</script>

<style lang="css" scoped>
</style>
<template>
	<div>
		<v-menu
	    bottom
	    left
	  >
	    <template v-slot:activator="{ on, attrs }">
	      <v-btn
	      	color="primary"
	        icon
	        v-bind="attrs"
	        v-on="on"
	      >
	        <v-icon>mdi-dots-vertical</v-icon>
	      </v-btn>
	    </template>

	    <v-list>
	      <v-list-item
	        v-for="(item, i) in items"
	        :key="i"
	        @click="handleClick(i)"
	      >
	      	<v-list-item-icon>
	            <v-icon v-text="item.icon"></v-icon>
	          </v-list-item-icon>
	        <v-list-item-title>{{ item.title }}</v-list-item-title>
	      </v-list-item>
	    </v-list>
	  </v-menu>

		<dialog-delete
	    v-if="dialogs.delete"
	    @close="dialogs.delete = false"
	    :task = "task"
	  />
	</div>
</template>

<script>
export default {
  props: ['task'],
  data: () => ({
  	dialogs: {
      delete: false,
    },
  	items: [
      { 
      	icon: 'mdi-pencil',
      	title: 'Edit',
      	click() {
      		console.log('Edit')
      	}
      },
      { 
      	icon: 'mdi-calendar',
      	title: 'Due Date',
      	click() {
      		console.log('Due Date')
      	}
      },
      { 
      	icon: 'mdi-delete',
      	title: 'Delete',
      	click() {
      		this.dialogs.delete = true
      	}
      },
    ],
  }),

  methods: {
  	handleClick(index) {
  		this.items[index].click.call(this)
  	}
  },

  components: {
    'dialog-delete': require('@/components/Todo/Dialogs/Delete.vue').default,
  }
}
</script>

<style>
</style>
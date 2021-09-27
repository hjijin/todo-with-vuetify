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

		<dialog-edit
	    v-if="dialogs.edit"
	    @close="dialogs.edit = false"
	    :task = "task"
	  />

	  <dialog-due-date
	    v-if="dialogs.dueDate"
	    @close="dialogs.dueDate = false"
	    :task = "task"
	  />

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
  		dueDate: false,
  		edit: false,
      delete: false,
    },
  	items: [
      { 
      	icon: 'mdi-pencil',
      	title: 'Edit',
      	click() {
      		this.dialogs.edit = true
      	}
      },
      { 
      	icon: 'mdi-calendar',
      	title: 'Due Date',
      	click() {
      		this.dialogs.dueDate = true
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
    'dialog-edit': require('@/components/Todo/Dialogs/Edit.vue').default,
    'dialog-due-date': require('@/components/Todo/Dialogs/DueDate.vue').default,
    'dialog-delete': require('@/components/Todo/Dialogs/Delete.vue').default,
  }
}
</script>

<style>
</style>
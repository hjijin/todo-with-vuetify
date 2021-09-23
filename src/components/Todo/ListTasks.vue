<template>
	<v-list
    subheader
    two-line
    flat
  >
    <task
      v-for="task in $store.state.tasks"
      :key="task.id"
      :task="task"
    />
  </v-list>
</template>

<script>
	export default {
    components: {
      'task': require('@/components/Todo/Task').default,
    }
	}
</script>

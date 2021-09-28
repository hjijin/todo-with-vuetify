import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      {
        id: 1,
        title: 'Wake up',
        dueDate: '2021-09-25',
        done: false,
      },
      {
        id: 2,
        title: 'Get bananas',
        dueDate: '2021-09-26',
        done: false,
      },
      {
        id: 3,
        title: 'Eat bananas',
        dueDate: '2021-09-24',
        done: false,
      },
    ],
    snackbar: {
      show: false,
      text: '',
    },
    sorting: false,
  },

  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        dueDate: new Date(),
        done: false,
      }

      state.tasks.push(newTask)
    },

    doneTask(state, id) {
      let task = state.tasks.filter(t => t.id === id)[0]
      task.done = !task.done
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
    },

    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(t => t.id === payload.id)[0]
      task.title = payload.title
      task.dueDate = payload.dueDate
    },

    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(t => t.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },

    setTasks(state, tasks) {
      state.tasks = tasks
    },

    showSnackbar(state, actionText) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 200
      }

      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = actionText
      }, timeout)
    },

    hideSnackbar(state) {
      state.snackbar.show = false
    },

    toggleSorting(state) {
      state.sorting = !state.sorting
    },
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Task added!')
    },

    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', 'Task deleted!')
    },

    updateTaskTitle({ commit }, payload) {
      commit('updateTaskTitle', payload)
      commit('showSnackbar', 'Task updated!')
    }, 
    updateTaskDueDate({ commit }, payload) {
      commit('updateTaskDueDate', payload)
      commit('showSnackbar', 'Task Due Date updated!')
    }, 
  },
  getters: {
    taskfilterd(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  modules: {
  }
})

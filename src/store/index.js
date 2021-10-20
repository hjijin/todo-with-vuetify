import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
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
    addTask(state, newTask) {
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
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        dueDate: new Date(),
        done: false,
      }

      // axios.post('http://localhost:3000/api/v1/todos', newTask)
      // .then(function (response) {
      //   console.log("response:", response);
      // })
      // .catch(function (error) {
      //   console.log("error:", error);
      // });
      
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      })
    },

    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(t => t.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },

    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task deleted!')
      })
    },

    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task updated!')
      })
    }, 
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Task Due Date updated!')
      })
    }, 

    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },

    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
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

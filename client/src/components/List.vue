<template>
  <div class="helle">
      <div id="todo-list-example" class="container">
          <div class="row">
              <div class="col-md-6 mx-auto">
                  <h1 class="text-center">TODO LIST APP</h1>
                  <form v-on:submit.prevent="addNewTask">
                      <label for="tasknameinput">Task Name</label>
                      <input type="text" v-model="task_name" class="form-control" placeholder="Add new task"/>
                      <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">Submit</button>
                      <button v-else type="submit" @click="updateTask" class="btn btn-primary btn-block mt-3">Update</button>
                  </form>
                  <table class="table">
                      <tr v-for="(todo) in todos"
                      :key="todo.id"
                      :title="todo.task_name">
                        <td class="text-left">{{todo.task_name}}</td>
                        <td class="text-right">
                            <button class="btn btn-info" @click="editTask(todo.task_name, todo.id)">Edit</button>
                            <button class="btn btn-danger" @click="deleteTask(todo.id)">Delete</button>
                        </td>
                      </tr>
                  </table>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            todos: [],
            id: '',
            task_name: '',
            isEdit: false
        }
    },
    mounted() {
        this.getTasks();
    },
    methods: {
        getTasks() {
            axios.get('http://localhost:5000/api/tasks').then( result => {
                    console.log(result.data)
                    this.todos = result.data;
                },
                error => {
                    console.error(error)
                }
            )
        },
        addNewTask() {
            axios.post('http://localhost:5000/api/task',{task_name: this.task_name})
            .then((res) => {
                this.task_name = '',
                this.getTasks()
            }).catch(err => {
                console.error(err)
            })
        },
        editTask(title, id) {
            this.id = id
            this.task_name = title
            this.isEdit = true
        },
        updateTask() {
            axios.put(`http://localhost:5000/api/task/${this.id}`,
            {task_name: this.task_name})
            .then((res) => {
                this.task_name = ''
                this.isEdit = false
                this.getTasks()
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        },
         deleteTask(id) {
            axios.delete(`http://localhost:5000/api/task/${id}`)
            .then((res) => {
                this.task_name = ''
                this.editTask = false
                this.getTasks()
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

}
</script>

<style>

</style>
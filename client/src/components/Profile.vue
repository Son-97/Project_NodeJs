<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{{first_name}}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{{last_name}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from "axios"
export default {
  data () {
    const token = localStorage.token
    return {
      first_name: '',
      last_name: '',
      email: '',
      token: token
    }
  },
  methods: {
    getUser() {
      axios.get('/users/profile', {
        headers: {'Authorization': this.token}
      }).then(res => {
        this.first_name = res.data.first_name
        this.last_name = res.data.last_name
        this.email = res.data.email
      }).catch(err => {
        router.push({name: 'Login'})
      })
    }
  },
  mounted() {
    this.getUser()
  },
}
</script>
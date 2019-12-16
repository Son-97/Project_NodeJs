<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <h3>Login</h3>
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <input type="text" class="form-control" v-model="email" name="email" placeholder="Your Email *" required />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" v-model="password" name="password" placeholder="Your Password *" required/>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import EvenBus from './EventBus'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      axios.post('/users/login',
      {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.data);
        this.email = '',
        this.password = ''
        if (res) {
          this.emitMethod()
          router.push({name: 'Profile'})
        }
      }).catch(err => {
        console.log(err)
      })
      
    },
    emitMethod() {
      EvenBus.$emit('logged-in','loggedin')
    }
  },
}
</script>
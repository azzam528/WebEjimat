<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  router.push('/dashboard')
}
</script>
<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5;">
    <div class="card" style="width: 400px; text-align: center;">
      <h2>EJIMAT Core</h2>
      <p style="margin-bottom: 20px; color: #666;">Login Admin</p>
      
      <form @submit.prevent="handleLogin" style="text-align: left;">
        <div class="input-group">
          <label>Username</label>
          <input v-model="username" type="text" required />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit" class="btn" style="width: 100%;">Login</button>
      </form>
    </div>
  </div>
</template>

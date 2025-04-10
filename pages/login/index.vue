<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2 class="form-title">Login</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-footer">
          <button type="submit" class="submit-btn">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/useAuthStore"; // Pinia store
import axios from "axios";

export default {
  computed: {
    authStore() {
      return useAuthStore(); // Vytvoríme instanciu Pinia store
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post("/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        const jwt = response.data; // Predpokladáme, že API vráti token
        localStorage.setItem("jwt", jwt); // Uložíme token do localStorage
        this.authStore.loggedIn = true;
        console.log(response.data);

        // Presmerovanie po úspešnom prihlásení
        this.$router.push("/todo");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* General page styling */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 20px;
}

/* Form wrapper */
.form-wrapper {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

/* Form title */
.form-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

/* Form input fields */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #4e73df;
  outline: none;
}

/* Submit button styling */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4e73df;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2e59d9;
}
</style>

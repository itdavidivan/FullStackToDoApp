<template>
  <div class="layout-container">
    <header>
      <nav class="navbar">
        <div class="logo">MyApp</div>
        <ul class="nav-links">
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/login">Login</nuxt-link></li>
          <li><nuxt-link to="/register">Register</nuxt-link></li>
        </ul>
        <!-- Logout button, only visible if the user is logged in -->
        <button v-if="authStore.loggedIn" @click="logout" class="logout-btn">
          Logout
        </button>
      </nav>
    </header>
    <main>
      <nuxt-page></nuxt-page>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/useAuthStore"; // Pinia store

export default defineComponent({
  computed: {
    authStore() {
      return useAuthStore(); // Vytvoríme instanciu Pinia store
    },
  },
  methods: {
    logout() {
      this.authStore.logout(); // Zavoláme logout funkciu zo store
      this.authStore.loggedIn = false;

      // Po logoute presmerujeme na login stránku
      this.$router.push("/login");
    },
  },
});
</script>

<style scoped>
/* Layout container styles */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Header and navbar styles */
header {
  background-color: #333;
  padding: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; /* Dôležité pre pozicovanie Logout button */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative; /* Pre tlačidlo */
}

.navbar .logo {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.navbar .nav-links {
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin-right: 80px; /* Zabezpečí priestor pre Logout button */
}

.navbar .nav-links li {
  margin: 0;
}

.navbar .nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

.navbar .nav-links a:hover {
  color: #f39c12;
}

/* Main content styles */
main {
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  overflow-y: auto;
}

.logout-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>

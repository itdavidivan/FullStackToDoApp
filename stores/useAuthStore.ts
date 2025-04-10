import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: false, // tu môžeme uložiť používateľské údaje, ak ich máme
  }),

  actions: {
    // Funkcia na odhlásenie
    logout() {
      // Odstránime token a užívateľské dáta z localStorage
      localStorage.removeItem("jwt");
      // Odstránime ďalšie dáta (ak sú potrebné)
      this.loggedIn = false;
    },
  },
});

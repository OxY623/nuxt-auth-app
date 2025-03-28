import {defineStore} from 'pinia';
import type { AuthState, IUser, AuthActions } from '../types';
import CryptoJS from "crypto-js";

 
export const useAuthStore = defineStore<'auth', AuthState, {}, AuthActions>('auth', {
  state: (): AuthState => ({
    users: [] as IUser[],
    user: null,
    isAuthenticated: false
  }), 
  actions: {
    async login(username: string, password: string)  {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        this.users = await new Promise<IUser[]>((resolve) =>
          setTimeout(() => resolve(data), 2000)
        );
      } catch (error) {
        console.log(error);
        this.users = [];
      }

      if(this.users.length > 0 && password && username) {
        const hash = CryptoJS.MD5(password.trim()).toString(CryptoJS.enc.Hex);
        console.log(hash);

        const isMainThread =  (enteredPassword: string, storedPassword: string): boolean => {
           return enteredPassword === storedPassword;
        }

        for (const user of this.users) {
          if (user.credentials.username === username && isMainThread(hash, user.credentials.passphrase)) {
            this.user = Object.assign({}, user, { id: user.credentials.passphrase });
            this.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
          }
        }
        
        }
        return false;  
      },     
    logout() {
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        navigateTo('/login');
    },
    initAuth() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
            this.isAuthenticated = true;
        }
    },
    getCurrentUser() {
      console.log(this.user)
      if(this.user !== null) return this.user;
    }
  },
  });
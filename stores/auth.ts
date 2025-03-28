import {defineStore} from 'pinia';
import type { AuthState, User } from '../types';

const mockUser: User = {
    id: 1,
    username: "admin",
    password: '12345678'
}
  
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false
    
  }), 
  actions: {
    async login(username: string, password: string)  {
      if(username === mockUser.username && password === mockUser.password){
        this.user = mockUser;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    },
    logout(){
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        navigateTo('/login');
    },
    initAuth(){
        const user = localStorage.getItem('user');
        if(user){
            this.user = JSON.parse(user);
            this.isAuthenticated = true;
         
        }
    }

  }});
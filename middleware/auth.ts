export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
   
    authStore.initAuth();

    if(!['/', 'login'].includes(to.path)) {
      return navigateTo(authStore.isAuthenticated ? '/account' : 'login', { replace: true });
    }

    if(!authStore.isAuthenticated && to.path === '/') {
      return navigateTo('/login', { replace: true });
    }
  
    if (authStore.isAuthenticated && to.path !== '/login') {
      return navigateTo('/account', { replace: true });
    }
  
    if (authStore.isAuthenticated && to.path === '/login') {
      return navigateTo('/account', { replace: true });
    }
  });
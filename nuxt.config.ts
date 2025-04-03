// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt', ],
  components: true,
  css: ['~/assets/styles/main.scss', '~/assets/styles/tailwind.css',],
  app: {
      head: {
        title: "Nuxt Auth Demo",
        meta: [
          {charset: 'utf-8'},{name: 'viewport', content: 'width=device-width, initial=skale=1'}
        ]
      }
    }
})
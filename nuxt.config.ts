export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  devServer: {
    host: "127.0.0.1",
    port: 3000,
  },

  modules: ["@pinia/nuxt"],

  css: ["@/assets/styles/styles.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/mixins.scss" as *; 
            @use "@/assets/styles/variables.scss" as *;
          `,
        },
      },
    },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Продажа квартир – купить квартиру",
      meta: [
        {
          name: "description",
          content:
            "Продажа квартир: новые и вторичные квартиры, лучшие цены, подробные фото и планировки. Найдите идеальное жильё для себя.",
        },
        {
          name: "keywords",
          content:
            "купить квартиру, продажа квартир, квартиры, новостройки, вторичное жильё, квартиры от застройщика, квартиры без посредников",
        },

        { property: "og:type", content: "website" },
        { property: "og:url", content: "/public/img/apartments-plan.jpg" },
        {
          property: "og:title",
          content: "Продажа квартир – купить квартиру",
        },
        {
          property: "og:description",
          content:
            "Продажа квартир: новые и вторичные квартиры по лучшим ценам. Фото, планировки и контакты.",
        },
        { property: "og:image", content: "/public/img/apartments-plan.jpg" },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Продажа квартир – купить квартиру",
        },
        {
          name: "twitter:description",
          content:
            "Продажа квартир: новые и вторичные квартиры по лучшим ценам.",
        },
        {
          name: "twitter:image",
          content: "/public/img/apartments-plan.jpg",
        },
      ],
    },
  },
});

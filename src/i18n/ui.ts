export const languages = {
  en: "English",
  ru: "Русский",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "layout.switch": "Switch to 🇷🇺",
    "layout.title": "Welcome to",
    "homepage.title":
      "This is a site to prove that Astro can do everything Next.js can and can do it even",
    "homepage.better": "better",
    "homepage.status": "Status",
    "homepage.inprogress": "In progress",
    "nav.menu": "Menu",
    "modal.header": "Important",
    "modal.paragraph1":
      "This modal was opened by a click on a button inside the `.astro` component. And it can be closed by clicking on the close button inside the React component.",
    "modal.how": "How?",
    "modal.paragraph2":
      "Global framework agnostic state store made, in this case, with Effector.",
    "modal.action": "Got it!",
  },
  ru: {
    "layout.switch": "Переключить на 🇬🇧",
    "layout.title": "Добро пожаловать в",
    "homepage.title":
      "Это сайт, который доказывает, что Astro может делать все, что может Next.js, и",
    "homepage.better": "даже лучше",
    "homepage.status": "Status",
    "homepage.inprogress": "В разработке",
    "nav.menu": "Меню",
    "modal.header": "Важно",
    "modal.paragraph1":
      "Этот модал открывается по нажатию на кнопку внутри компонента `.astro`. А закрыть его можно, нажав на кнопку закрытия внутри компонента React.",
    "modal.how": "Как?",
    "modal.paragraph2":
      "Универсальный state manager, не зависящий от фреймворка, созданный, в данном случае, с помощью Effector.",
    "modal.action": "Есть!",
  },
} as const;

export const translations = {
  en: {
    auth: {
      eyebrow: 'Supabase Auth',
      signIn: 'Sign in',
      signUp: 'Sign up',
      signOut: 'Sign out',
      createAccount: 'Create account',
      resetPasswordTitle: 'Reset password',
      sendResetLink: 'Send reset link',
      saveNewPassword: 'Save new password',
      forgotPassword: 'Forgot password?',
      backToSignIn: 'Back to sign in',
      backToSignInAria: 'Back to sign in',
      signInDescription:
        'Sign in to prepare the app for future user-scoped wishlist data.',
      signUpDescription:
        'Create an account so the wishlist can later move from local storage to user data.',
      resetPasswordDescription:
        'Enter your email and we will send you a link to reset your password.',
      updatePasswordDescription:
        'Set a new password for your account after opening the recovery link.',
      loadingTitle: 'Loading session',
      loadingDescription:
        'Checking whether there is an active Supabase session.',
      envMessage:
        'Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file to enable authentication.',
      fields: {
        email: 'Email',
        password: 'Password',
      },
      placeholders: {
        email: 'you@example.com',
        password: 'Minimum 6 characters',
      },
      messages: {
        signupSuccess:
          'Check your email for the confirmation link if email confirmation is enabled.',
        resetEmailSent:
          'If this email exists, a password reset link has been sent.',
        passwordUpdated: 'Your password has been updated. You can sign in now.',
      },
      errors: {
        default: 'Something went wrong. Please try again.',
        missingConfig:
          'Supabase is not configured yet. Add the environment variables to continue.',
        emailRateLimit:
          'Too many emails were sent. Please wait a bit and try again.',
        invalidCredentials: 'Invalid email or password.',
        emailNotConfirmed: 'Please confirm your email before signing in.',
        userAlreadyExists: 'A user with this email already exists.',
        resetEmailFailed: 'Failed to send the email. Please try again later.',
        passwordUpdateFailed:
          'Failed to update the password. Please try again.',
      },
      languageSwitch: {
        ariaLabel: 'Switch interface language',
      },
    },
    hero: {
      badge: 'Personal collection tracker',
      title: 'Sims CC & Mods Wishlist',
      description:
        'Keep your favorite CC and mods in one cozy place. Mark what you want, what is already installed, and what needs checking after updates.',
      languageSwitch: {
        ariaLabel: 'Switch interface language',
      },
    },
    stats: {
      sectionLabel: 'Collection statistics',
      total: 'Total entries',
      wishlist: 'In wishlist',
      installed: 'Installed',
      broken: 'Broken',
    },
    form: {
      eyebrow: 'Collection note',
      title: 'Add entry',
      description:
        'Save favorite creators, interesting mods, and CC that you want to install later or revisit after updates.',
      submit: 'Add to list',
      fields: {
        title: 'Title',
        creator: 'Creator',
        type: 'Type',
        category: 'Category',
        status: 'Status',
        link: 'Link',
        notes: 'Notes',
      },
      placeholders: {
        title: 'Example: Cozy Autumn Hair',
        creator: 'Example: Greenllamas',
        link: 'https://...',
        notes: 'What do you want to remember about this item?',
      },
      editModal: {
        eyebrow: 'Editing entry',
        title: 'Edit entry',
        description:
          'Update the selected entry and save the changes back to your collection.',
        saveChanges: 'Save changes',
        cancel: 'Cancel',
        closeAriaLabel: 'Close edit dialog',
        fields: {},
        placeholders: {},
        categoryLabels: {},
        statusLabels: {},
      },
    },
    collection: {
      eyebrow: 'Saved finds',
      title: 'Your collection',
      description:
        'Browse saved finds, filter by status, and keep your Mods folder tidy.',
      resultsLabel: 'Found',
      emptyTitle: 'Nothing found',
      empty: 'No entries match the current search or filter yet.',
      toolbar: {
        searchLabel: 'Search',
        searchPlaceholder: 'Search by mod name or creator',
        clearSearch: 'Clear search',
        creatorLabel: 'Creator',
        allCreators: 'All creators',
        typeLabel: 'Type',
        allTypes: 'All types',
        categoryLabel: 'Category',
        allCategories: 'All categories',
        statusLabel: 'Status',
        allStatuses: 'All statuses',
        reset: 'Reset filters',
        categoryLabels: {},
        typeLabels: {},
        statusLabels: {},
      },
      card: {
        creator: 'Creator',
        type: 'Type',
        category: 'Category',
        notes: 'Notes',
        emptyNotes: 'No notes yet.',
        edit: 'Edit',
        editAriaLabel: 'Edit entry',
        deleteAriaLabel: 'Delete entry',
        changeStatus: 'Quick status change',
        remove: 'Delete',
        openLink: 'Open link',
        categoryLabels: {},
        statusLabels: {},
      },
      deleteConfirm: {
        title: 'Delete entry?',
        description: 'This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Delete',
      },
      deleteToast: {
        message: 'Entry deleted',
        undo: 'Undo',
        dismissAriaLabel: 'Dismiss notification',
      },
    },
    categoryLabels: {
      Hair: 'Hair',
      Clothes: 'Clothes',
      Makeup: 'Makeup',
      Accessories: 'Accessories',
      Furniture: 'Furniture',
      'Build/Buy': 'Build/Buy',
      Gameplay: 'Gameplay',
      Script: 'Script',
      Tuning: 'Tuning',
      UI: 'UI',
      Overrides: 'Overrides',
      Utility: 'Utility',
      'Default Replacement': 'Default Replacement',
      Presets: 'Presets',
      'Loading Screen': 'Loading Screen',
      Other: 'Other',
    },
    typeLabels: {
      CC: 'CC',
      Mod: 'Mod',
    },
    statusLabels: {
      Wishlist: 'Wishlist',
      Installed: 'Installed',
      Broken: 'Broken',
      Conflicting: 'Conflicting',
      'Update Needed': 'Update Needed',
    },
  },
  ru: {
    auth: {
      eyebrow: 'Supabase Auth',
      signIn: 'Войти',
      signUp: 'Регистрация',
      signOut: 'Выйти',
      createAccount: 'Создать аккаунт',
      resetPasswordTitle: 'Сброс пароля',
      sendResetLink: 'Отправить ссылку',
      saveNewPassword: 'Сохранить новый пароль',
      forgotPassword: 'Забыли пароль?',
      backToSignIn: 'Назад ко входу',
      backToSignInAria: 'Назад ко входу',
      signInDescription:
        'Войди, чтобы подготовить приложение к будущим пользовательским данным wishlist.',
      signUpDescription:
        'Создай аккаунт, чтобы позже перенести wishlist из localStorage в данные пользователя.',
      resetPasswordDescription:
        'Введи email, и мы отправим ссылку для сброса пароля.',
      updatePasswordDescription:
        'После перехода по ссылке из письма задай новый пароль для аккаунта.',
      loadingTitle: 'Загрузка сессии',
      loadingDescription:
        'Проверяем, есть ли активная сессия Supabase.',
      envMessage:
        'Добавь VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY в файл .env, чтобы включить аутентификацию.',
      fields: {
        email: 'Email',
        password: 'Пароль',
      },
      placeholders: {
        email: 'you@example.com',
        password: 'Минимум 6 символов',
      },
      messages: {
        signupSuccess:
          'Проверь почту для подтверждения, если подтверждение email включено.',
        resetEmailSent:
          'Если такой email существует, ссылка для сброса пароля уже отправлена.',
        passwordUpdated:
          'Пароль обновлен. Теперь можно войти с новым паролем.',
      },
      errors: {
        default: 'Что-то пошло не так. Попробуй еще раз.',
        missingConfig:
          'Supabase пока не настроен. Добавь переменные окружения, чтобы продолжить.',
        emailRateLimit:
          'Слишком много писем отправлено. Подожди немного и попробуй снова.',
        invalidCredentials: 'Неверный email или пароль.',
        emailNotConfirmed:
          'Подтверди email по ссылке из письма перед входом.',
        userAlreadyExists: 'Пользователь с таким email уже существует.',
        resetEmailFailed: 'Не удалось отправить письмо. Попробуй позже.',
        passwordUpdateFailed:
          'Не удалось обновить пароль. Попробуй ещё раз.',
      },
      languageSwitch: {
        ariaLabel: 'Переключить язык интерфейса',
      },
    },
    hero: {
      badge: 'Личный трекер коллекции',
      title: 'Sims CC & Mods Wishlist',
      description:
        'Храни любимый CC и моды в одном уютном месте. Отмечай желаемое, уже установленное и то, что нужно проверить после обновлений.',
      languageSwitch: {
        ariaLabel: 'Переключить язык интерфейса',
      },
    },
    stats: {
      sectionLabel: 'Статистика коллекции',
      total: 'Всего записей',
      wishlist: 'В вишлисте',
      installed: 'Установлено',
      broken: 'Сломано',
    },
    form: {
      eyebrow: 'Новая находка',
      title: 'Добавить запись',
      description:
        'Сохраняй любимых креаторов, интересные моды и CC, которые хочется поставить позже или обновить.',
      submit: 'Добавить в список',
      fields: {
        title: 'Название',
        creator: 'Креатор',
        type: 'Тип',
        category: 'Категория',
        status: 'Статус',
        link: 'Ссылка',
        notes: 'Заметки',
      },
      placeholders: {
        title: 'Например: Cozy Autumn Hair',
        creator: 'Например: Greenllamas',
        link: 'https://...',
        notes: 'Что важно запомнить про эту запись?',
      },
      editModal: {
        eyebrow: 'Редактирование записи',
        title: 'Редактировать запись',
        description:
          'Обнови выбранную запись и сохрани изменения в своей коллекции.',
        saveChanges: 'Сохранить изменения',
        cancel: 'Отмена',
        closeAriaLabel: 'Закрыть окно редактирования',
        fields: {},
        placeholders: {},
        categoryLabels: {},
        statusLabels: {},
      },
    },
    collection: {
      eyebrow: 'Сохранённые находки',
      title: 'Твоя коллекция',
      description:
        'Просматривай сохранённые находки, фильтруй по статусу и держи папку Mods в порядке.',
      resultsLabel: 'Найдено',
      emptyTitle: 'Ничего не найдено',
      empty: 'По текущему поиску или фильтру записи пока не найдены.',
      toolbar: {
        searchLabel: 'Поиск',
        searchPlaceholder: 'Найти по названию мода или креатору',
        clearSearch: 'Очистить поиск',
        creatorLabel: 'Креатор',
        allCreators: 'Все креаторы',
        typeLabel: 'Тип',
        allTypes: 'Все типы',
        categoryLabel: 'Категория',
        allCategories: 'Все категории',
        statusLabel: 'Статус',
        allStatuses: 'Все статусы',
        reset: 'Сбросить фильтры',
        categoryLabels: {},
        typeLabels: {},
        statusLabels: {},
      },
      card: {
        creator: 'Креатор',
        type: 'Тип',
        category: 'Категория',
        notes: 'Заметки',
        emptyNotes: 'Заметок пока нет.',
        edit: 'Редактировать',
        editAriaLabel: 'Редактировать запись',
        deleteAriaLabel: 'Удалить запись',
        changeStatus: 'Быстро сменить статус',
        remove: 'Удалить',
        openLink: 'Открыть ссылку',
        categoryLabels: {},
        statusLabels: {},
      },
      deleteConfirm: {
        title: 'Удалить запись?',
        description: 'Это действие нельзя отменить.',
        cancel: 'Отмена',
        confirm: 'Удалить',
      },
      deleteToast: {
        message: 'Запись удалена',
        undo: 'Отменить',
        dismissAriaLabel: 'Закрыть уведомление',
      },
    },
    categoryLabels: {
      Hair: 'Волосы',
      Clothes: 'Одежда',
      Makeup: 'Макияж',
      Accessories: 'Аксессуары',
      Furniture: 'Мебель',
      'Build/Buy': 'Стройка/Покупки',
      Gameplay: 'Геймплей',
      Script: 'Скрипт',
      Tuning: 'Тюнинг',
      UI: 'UI',
      Overrides: 'Оверрайды',
      Utility: 'Утилиты',
      'Default Replacement': 'Замена по умолчанию',
      Presets: 'Пресеты',
      'Loading Screen': 'Экран загрузки',
      Other: 'Другое',
    },
    typeLabels: {
      CC: 'CC',
      Mod: 'Мод',
    },
    statusLabels: {
      Wishlist: 'Вишлист',
      Installed: 'Установлено',
      Broken: 'Сломано',
      Conflicting: 'Конфликтует',
      'Update Needed': 'Нужно обновить',
    },
  },
}

translations.en.collection.toolbar.statusLabels = translations.en.statusLabels
translations.en.collection.toolbar.categoryLabels = translations.en.categoryLabels
translations.en.collection.toolbar.typeLabels = translations.en.typeLabels
translations.en.collection.card.statusLabels = translations.en.statusLabels
translations.en.collection.card.categoryLabels = translations.en.categoryLabels
translations.en.form.editModal.fields = translations.en.form.fields
translations.en.form.editModal.placeholders = translations.en.form.placeholders
translations.en.form.editModal.categoryLabels = translations.en.categoryLabels
translations.en.form.editModal.statusLabels = translations.en.statusLabels
translations.en.form.editModal.typeLabels = translations.en.typeLabels
translations.en.auth.backToLanding = 'Back to landing'
translations.en.auth.backToLandingAria = 'Back to landing'
translations.en.landing = {
  brand: 'Sims Wishlist',
  badge: 'A cozy tracker for CC lovers',
  languageSwitch: {
    ariaLabel: 'Switch interface language',
  },
  hero: {
    eyebrow: 'Keep your mods and CC easy to revisit',
    title: 'A calm home for your Sims CC & Mods wishlist',
    description:
      'Save downloads, remember creators, keep useful links nearby, and sort out what is wanted, installed, or needs attention after updates.',
    primaryCta: 'Get started',
    secondaryCta: 'Sign in',
  },
  features: {
    eyebrow: 'Why it helps',
    title: 'Everything you need to track your Sims content in one place',
    description:
      'The landing page explains the product clearly, while the dashboard stays focused on your private collection.',
    items: [
      {
        title: 'Save CC and mods together',
        description:
          'Keep hairs, clothes, furniture, script mods, and other finds in a single calm list.',
      },
      {
        title: 'Track creators and links',
        description:
          'Remember where each item came from and reopen the original page whenever you need it.',
      },
      {
        title: 'Manage update statuses',
        description:
          'Mark what is installed, broken, conflicting, or worth checking after a patch.',
      },
      {
        title: 'Search and filter quickly',
        description:
          'Find content by name, creator, category, or status without digging through folders.',
      },
      {
        title: 'Keep your Mods folder tidy',
        description:
          'Turn scattered browser tabs and notes into a clear personal collection workflow.',
      },
    ],
  },
  preview: {
    panelEyebrow: 'Product preview',
    panelTitle: 'A soft dashboard for your collection',
    sampleCategory: 'Hair',
    sampleStatus: 'Update needed',
    creatorLabel: 'Creator',
    sampleTitle: 'Velvet Night Hair',
    sampleCreator: 'Simstrouble',
    sampleNote:
      'Keep the original link close by and re-check it after the next patch.',
    stats: [
      { label: 'Wishlist', value: '12' },
      { label: 'Installed', value: '28' },
      { label: 'Broken', value: '2' },
    ],
  },
  product: {
    eyebrow: 'What it solves',
    title: 'From scattered tabs to a private, searchable wishlist',
    description:
      'The app helps Sims players stop losing downloads, creators, and update notes across bookmarks, screenshots, and browser history.',
    points: [
      {
        title: 'One place for every saved find',
        description:
          'Build a personal library of everything you want to revisit later, from CC sets to gameplay mods.',
      },
      {
        title: 'Clear creator-based organization',
        description:
          'Keep creator names normalized and easier to search, filter, and reuse over time.',
      },
      {
        title: 'Private, user-scoped dashboard',
        description:
          'Sign in to keep your own entries separate and ready for future account-based features.',
      },
    ],
  },
  cta: {
    eyebrow: 'Ready to begin?',
    title: 'Start building your cozy Sims collection tracker',
    description:
      'Create an account to keep your wishlist, creators, notes, and links together in one place.',
    primaryCta: 'Sign up',
    secondaryCta: 'I already have an account',
  },
}
translations.ru.collection.toolbar.statusLabels = translations.ru.statusLabels
translations.ru.collection.toolbar.categoryLabels = translations.ru.categoryLabels
translations.ru.collection.toolbar.typeLabels = translations.ru.typeLabels
translations.ru.collection.card.statusLabels = translations.ru.statusLabels
translations.ru.collection.card.categoryLabels = translations.ru.categoryLabels
translations.ru.form.editModal.fields = translations.ru.form.fields
translations.ru.form.editModal.placeholders = translations.ru.form.placeholders
translations.ru.form.editModal.categoryLabels = translations.ru.categoryLabels
translations.ru.form.editModal.statusLabels = translations.ru.statusLabels
translations.ru.form.editModal.typeLabels = translations.ru.typeLabels

translations.en.auth.backToLanding = 'Back to landing'
translations.en.auth.backToLandingAria = 'Back to landing'
translations.ru.auth.backToLanding = 'На главную'
translations.ru.auth.backToLandingAria = 'Вернуться на главную'

translations.en.landing = {
  brand: 'Sims Wishlist',
  languageSwitch: {
    ariaLabel: 'Switch interface language',
  },
  hero: {
    eyebrow: 'For Sims players with a growing Mods folder',
    titleLines: [
      'Keep your Sims CC & Mods Wishlist',
      'in one cozy place',
    ],
    description:
      'Once your mods and CC start piling up, everything turns into chaos fast: tabs get lost, links disappear, creators blur together. This gives you one clear place to save what you want to download, track, or revisit later.',
    primaryCta: 'Get started',
    secondaryCta: 'Sign in',
  },
  features: {
    eyebrow: 'Features',
    title: 'Built for a growing Mods folder',
    items: [
      {
        title: 'All your CC and mods together',
        text: 'Save everything you want to install later without tab chaos.',
      },
      {
        title: 'Creators and links close by',
        text: 'No more guessing where a mod came from — the link stays with it.',
      },
      {
        title: 'Statuses after patches',
        text: 'Track what is installed, broken, or still needs checking.',
      },
      {
        title: 'Fast search and filters',
        text: 'Find what you need by name, creator, category, or status.',
      },
    ],
  },
  previewCard: {
    frameLabel: 'Preview',
    frameTitle: 'Your collection at a glance',
    sampleCategory: 'Hair',
    sampleStatus: 'Update Needed',
    creatorLabel: 'Creator',
    sampleTitle: 'Velvet Night Hair',
    sampleCreator: 'Simstrouble',
    sampleNote:
      'Keep the original link close by and re-check it after the next patch.',
    stats: [
      { label: 'Wishlist', value: '12' },
      { label: 'Installed', value: '28' },
      { label: 'Broken', value: '2' },
    ],
  },
  productPreview: {
    eyebrow: 'How it works',
    title: 'Not a notes file, not a tab graveyard, not “I’ll find it later”',
    text: 'This is your personal tracker for Sims CC and mods: save discoveries, keep creators, track statuses, and stay organized even when your Mods folder has a life of its own.',
  },
  story: {
    eyebrow: 'Why it helps',
    title: 'It starts with one link. Then it becomes a whole system.',
    text: 'First one mod, then another hair set, then a gameplay tweak — and suddenly you have dozens of tabs, scattered notes, and that constant feeling of “I know I saved this somewhere.” Wishlist keeps everything in one place, so your time goes into playing, not browser archaeology.',
    cards: [
      {
        title: 'Save it right away',
        text: 'Add a mod the moment you find it, before the link disappears.',
      },
      {
        title: 'Come back without pain',
        text: 'Open the entry later and instantly see the creator, status, and notes.',
      },
      {
        title: 'Keep your collection under control',
        text: 'Less patch chaos, more clear structure.',
      },
    ],
  },
  cta: {
    eyebrow: 'Ready to start?',
    title: 'Build your cozy Sims collection tracker',
    text: 'Create an account and keep your CC, mods, creators, links, and statuses in one place.',
    primaryCta: 'Sign up',
    secondaryCta: 'I already have an account',
  },
}

translations.ru.landing = {
  brand: 'Sims Wishlist',
  languageSwitch: {
    ariaLabel: 'Переключить язык интерфейса',
  },
  hero: {
    eyebrow: 'Для игроков Sims с большой папкой Mods',
    titleLines: [
      'Собери свой Sims CC & Mods Wishlist',
      'в одном уютном месте',
    ],
    description:
      'Когда модов и CC становится слишком много, всё быстро превращается в хаос: вкладки теряются, ссылки исчезают, креаторы забываются. Здесь всё, что ты хочешь скачать, проверить или сохранить, лежит в одном понятном трекере.',
    primaryCta: 'Начать',
    secondaryCta: 'Войти',
  },
  features: {
    eyebrow: 'Возможности',
    title: 'Всё главное — сразу видно',
    items: [
      {
        title: 'CC и моды в одном месте',
        text: 'Сохраняй всё, что хочешь установить позже, без хаоса во вкладках.',
      },
      {
        title: 'Креаторы и ссылки под рукой',
        text: 'Не вспоминай, откуда был мод — нужная ссылка уже рядом.',
      },
      {
        title: 'Статусы после обновлений',
        text: 'Отмечай, что установлено, что сломано, а что нужно проверить.',
      },
      {
        title: 'Быстрый поиск и фильтры',
        text: 'Находи нужное по названию, креатору, категории или статусу.',
      },
    ],
  },
  previewCard: {
    frameLabel: 'Превью',
    frameTitle: 'Твоя коллекция под рукой',
    sampleCategory: 'Волосы',
    sampleStatus: 'Нужно обновить',
    creatorLabel: 'Креатор',
    sampleTitle: 'Velvet Night Hair',
    sampleCreator: 'Simstrouble',
    sampleNote:
      'Держи ссылку рядом и возвращайся к записи без лишнего поиска.',
    stats: [
      { label: 'Вишлист', value: '12' },
      { label: 'Установлено', value: '28' },
      { label: 'Сломано', value: '2' },
    ],
  },
  productPreview: {
    eyebrow: 'Как это работает',
    title: 'Не блокнот, не папка вкладок, не “потом найду”',
    text: 'Это личный трекер для Sims CC и модов: добавляй находки, сохраняй креаторов, отмечай статусы и держи свою коллекцию в порядке, даже когда папка Mods уже живёт своей жизнью.',
  },
  story: {
    eyebrow: 'Почему это удобно',
    title: 'Сначала это одна ссылка. Потом — целая система.',
    text: 'Один мод, ещё один набор волос, потом новый геймплейный мод — и вот у тебя уже десятки вкладок, заметки вразнобой и вечное “я точно это где-то сохраняла”. Wishlist собирает всё в одно место, чтобы ты тратила время на игру, а не на археологию по браузеру.',
    cards: [
      {
        title: 'Сохраняй сразу',
        text: 'Добавляй мод, как только нашла его, пока ссылка не потерялась.',
      },
      {
        title: 'Возвращайся без боли',
        text: 'Открывай нужную запись позже и сразу видь креатора, статус и заметки.',
      },
      {
        title: 'Держи коллекцию под контролем',
        text: 'Меньше хаоса после патчей, больше понятного порядка.',
      },
    ],
  },
  cta: {
    eyebrow: 'Готова начать?',
    title: 'Собери свой уютный трекер для Sims коллекции',
    text: 'Создай аккаунт и храни CC, моды, креаторов, ссылки и статусы в одном месте.',
    primaryCta: 'Зарегистрироваться',
    secondaryCta: 'У меня уже есть аккаунт',
  },
}
translations.ru.auth.backToLanding = 'На главную'
translations.ru.auth.backToLandingAria = 'Вернуться на главную'
translations.ru.landing = {
  brand: 'Sims Wishlist',
  badge: 'Уютный трекер для коллекции CC',
  languageSwitch: {
    ariaLabel: 'Переключить язык интерфейса',
  },
  hero: {
    eyebrow: 'Держи любимые моды и CC под рукой',
    title: 'Уютное место для твоего Sims CC & Mods Wishlist',
    description:
      'Сохраняй загрузки, помни креаторов, не теряй полезные ссылки и отмечай, что ты хочешь установить, уже используешь или хочешь проверить после обновлений.',
    primaryCta: 'Начать',
    secondaryCta: 'Войти',
  },
  features: {
    eyebrow: 'Почему это удобно',
    title: 'Всё, что нужно для аккуратного трекинга Sims-контента, в одном месте',
    description:
      'Публичная страница объясняет продукт, а приватный dashboard остаётся сосредоточен на твоей личной коллекции.',
    items: [
      {
        title: 'CC и моды в одном списке',
        description:
          'Сохраняй волосы, одежду, мебель, скриптовые моды и другие находки в одном уютном пространстве.',
      },
      {
        title: 'Креаторы и ссылки всегда рядом',
        description:
          'Помни, откуда пришла каждая находка, и быстро открывай оригинальную страницу при необходимости.',
      },
      {
        title: 'Статусы после патчей',
        description:
          'Отмечай, что уже установлено, что сломалось, конфликтует или требует дополнительной проверки.',
      },
      {
        title: 'Поиск и фильтры без хаоса',
        description:
          'Находи контент по названию, креатору, категории или статусу без бесконечного перебора папок.',
      },
      {
        title: 'Папка Mods под контролем',
        description:
          'Превращай хаотичные вкладки, заметки и закладки в понятный личный каталог.',
      },
    ],
  },
  preview: {
    panelEyebrow: 'Внутри продукта',
    panelTitle: 'Мягкий dashboard для твоей коллекции',
    sampleCategory: 'Волосы',
    sampleStatus: 'Нужно обновить',
    creatorLabel: 'Креатор',
    sampleTitle: 'Velvet Night Hair',
    sampleCreator: 'Simstrouble',
    sampleNote:
      'Держи ссылку на исходную страницу рядом и проверь набор после следующего патча.',
    stats: [
      { label: 'Вишлист', value: '12' },
      { label: 'Установлено', value: '28' },
      { label: 'Сломано', value: '2' },
    ],
  },
  product: {
    eyebrow: 'Какую проблему решает',
    title: 'От хаоса во вкладках к приватному и удобному wishlist',
    description:
      'Приложение помогает Sims-игрокам не терять загрузки, креаторов и заметки об обновлениях среди закладок, скриншотов и истории браузера.',
    points: [
      {
        title: 'Одно место для всех находок',
        description:
          'Собери личную библиотеку всего, что хочешь скачать позже: от CC-наборов до геймплейных модов.',
      },
      {
        title: 'Аккуратная работа с креаторами',
        description:
          'Имена креаторов хранятся понятнее и чище, поэтому их легче искать, фильтровать и переиспользовать.',
      },
      {
        title: 'Приватный dashboard для каждого пользователя',
        description:
          'Войди в аккаунт, чтобы хранить свои записи отдельно и быть готовой к будущим аккаунтным возможностям.',
      },
    ],
  },
  cta: {
    eyebrow: 'Готова начать?',
    title: 'Собери свой уютный трекер коллекции Sims',
    description:
      'Создай аккаунт и храни wishlist, креаторов, заметки и ссылки вместе в одном месте.',
    primaryCta: 'Зарегистрироваться',
    secondaryCta: 'У меня уже есть аккаунт',
  },
}

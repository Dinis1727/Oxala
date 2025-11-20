export const sanityLanguages = [
  {id: 'pt', title: 'Português', isDefault: true},
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'Français'},
  {id: 'es', title: 'Español'},
]

export const sanityDefaultLanguage = sanityLanguages.find((lang) => lang.isDefault)?.id || 'pt'

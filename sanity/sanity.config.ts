import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemas'
import {sanityLanguages} from './languages'

export default defineConfig({
  name: 'default',
  title: 'Oxalá CMS',
  projectId: 'h3s6x795',
  dataset: 'production',
  plugins: [
    structureTool(),
    documentInternationalization({
      supportedLanguages: sanityLanguages,
      schemaTypes: ['categoria', 'subcategoria', 'prato', 'vinho'],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})

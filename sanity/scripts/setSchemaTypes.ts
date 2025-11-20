import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'h3s6x795',
  dataset: 'production',
  apiVersion: '2024-05-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

async function run() {
  await client
    .patch('b1c3960b-11a8-4895-9693-c2a8a71050f5')
    .set({ schemaTypes: ['categoria', 'subcategoria', 'prato', 'vinho'] })
    .commit()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

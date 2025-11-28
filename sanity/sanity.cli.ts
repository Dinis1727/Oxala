import {defineCliConfig} from 'sanity/cli'

const appId = process.env.SANITY_APP_ID

export default defineCliConfig({
  api: {
    projectId: 'h3s6x795',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     *
     * When SANITY_APP_ID is not set we turn off auto-updates to avoid the
     * runtime warning about a missing appId.
     */
    autoUpdates: Boolean(appId),
    ...(appId ? {appId} : {}),
  }
})

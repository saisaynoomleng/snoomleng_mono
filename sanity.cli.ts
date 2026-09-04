/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { env } from '@/lib/env/client';
import { defineCliConfig } from 'sanity/cli';

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: './src/**/*.{js,ts,jsx,tsx}',
    schema: './src/sanity/schema.json',
    generates: './src/sanity/types.ts',
  },
  deployment: {
    appId: 'kwkpq8hohygyd09bvtzpk37h',
  },
});

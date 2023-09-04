export declare const auth = "import * as functions from 'firebase-functions/v1'\nimport { authDefaultOption } from '@/routings'\nimport skeetConfig from '../../../skeetOptions.json'\nconst region = skeetConfig.region\n\nexport const <functionName> = functions\n  .runWith(authDefaultOption)\n  .region(region)\n  .auth.user()\n  .onCreate(async (user) => {\n    try {\n      <yourScript>\n      console.log({ status: 'success', user })\n    } catch (error) {\n      console.log({ status: 'error', message: String(error) })\n    }\n  })";

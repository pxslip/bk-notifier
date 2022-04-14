import { SSM } from '@aws-sdk/client-ssm';
import importJson from './import-json.js';
const { Parameters } = await importJson('../.env.json');

const ssm = new SSM();

for (const key of Object.keys(Parameters.SSMKeys)) {
  if (Parameters[key]) {
    await ssm.putParameter({
      Name: Parameters.SSMKeys[key],
      Value: Parameters[key],
      Type: 'String',
      Overwrite: true,
    });
  }
}

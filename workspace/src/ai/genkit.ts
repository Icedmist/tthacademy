import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: "AIzaSyDAFcBVYX8KUQ4HKAGQ1eMD6p0NWE_3w_s"})],
  model: 'googleai/gemini-2.0-flash',
});

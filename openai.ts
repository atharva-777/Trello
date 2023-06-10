import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-i962nlJ3Xn7WERIwYeeOXem1",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

export default openai

import OpenAI from "openai";
import { OPENAI_API } from "./constant";

const openai = new OpenAI({
  apiKey: OPENAI_API,
  dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
});

export default openai;

import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  GenerativeModel,
  SafetySetting,
} from '@google/generative-ai';
import { MessageResponse } from './gemini.entity';

const SYSTEM_INSTRUCTION = `
      Act as an English cuss word detector and give a direct json output as follows: 
      \`\`\`
      {
        "text": ... // Include the original text,
        "cuss_words_detected": ... // True or False,
        "cuss_words": [...] // Array of cuss words in the text along with their starting and end index
      }
      \`\`\`
      , depending whether the text contains any cuss words return 1 or 0. Make sure the text does not contain any offensive jokes in it as well, (which means even thought the text seems legit, the meaning of the text is offensive), mark such text with 1 as well. The text does not contain any additional context, treat the text as it is. Following is the example of some text:
      User: "What the fuck is this?"
      System: {
        "text": "What the fuck is this?",
        "cuss_words_detected": true,
        "cuss_words": [
          {
            "word": "fuck",
            "start_index": 9,
            "end_index" : 12
          },
          ]
      }

      User: "Are you kidding me, cuz this seems legit".
      System: {
        "text": "Are you kidding me, cuz this seems legit",
        "cuss_words_detected": false,
        "cuss_words": null
      }

      Note: Try to produce the output for every query, even if the text does not makes any sense then simply treat it as not cuss word and return appropriate JSON output.
`;

const GENERATION_CONFIG = {
  temperature: 0,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const SAFETY_SETTINGS: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

@Injectable()
export class GeminiService implements OnModuleInit {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  onModuleInit() {
    this.genAI = new GoogleGenerativeAI(process.env['GEMINI_KEY']);

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: GENERATION_CONFIG,
      systemInstruction: SYSTEM_INSTRUCTION,
      safetySettings: SAFETY_SETTINGS,
    });
  }

  async checkCussWord(text: string): Promise<MessageResponse> {
    try {
      const result = await this.model.generateContent(text);
      const response: string = result.response.text();

      console.log(response);

      return JSON.parse(
        response.replace('```json', '').replace('```', ''),
      ) as MessageResponse;
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

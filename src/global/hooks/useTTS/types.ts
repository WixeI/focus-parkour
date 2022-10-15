export interface Voice {
  synth: SpeechSynthesis;
  state: 'paused' | 'running' | 'not-running';
  isCanceled: boolean;
  active: number;
  messages: SpeechSynthesisUtterance[];
}

//quando vai pro zero, reseta tudo e precisa do play
//qualquer elemento pode ir pro zero, e o último sempre vai

export type Action =
  | {
      type: 'generateMessages';
      payload: { message: string };
    }
  | {
      type: 'nextMessage';
    }
  | {
      type: 'restart';
    }
  | {
      type: 'setState';
      payload: { as: 'paused' | 'running' | 'not-running' };
    };

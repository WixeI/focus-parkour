export interface Voice {
  synth: SpeechSynthesis;
  state: 'paused' | 'running' | 'not-running';
  isCanceled: boolean;
  active: number;
  messages: SpeechSynthesisUtterance[];
}

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

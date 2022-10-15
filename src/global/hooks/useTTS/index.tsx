import { useEffect, useReducer } from 'react';
import { produce } from 'immer';
import { Action, Voice } from './types';

/*
  To-Do: create pause option that checks: if last video ended paused "this happens", then pause the next when starts
*/

const defaultState: Voice = {
  synth: window.speechSynthesis,
  details: {
    voice: null,
    speed: 1
  },
  state: 'not-running',
  isCanceled: false,
  active: 0,
  messages: []
};

function reducer(state: Voice, action: Action) {
  switch (action.type) {
    case 'generateMessages':
      return produce(state, (draft) => {
        if (draft.state !== 'not-running') draft.isCanceled = true;
        draft.synth.cancel();
        draft.synth.resume();

        const dividedMessages = action.payload.message.split(/[.]+/);
        draft.messages = dividedMessages.map((item) => {
          const voiceItem = new SpeechSynthesisUtterance(item);
          if (draft.details.voice) voiceItem.voice = draft.details.voice;
          if (draft.details.speed) voiceItem.rate = draft.details.speed;
          return voiceItem;
        });
      });
    case 'nextMessage':
      return produce(state, (draft) => {
        if (draft.isCanceled || draft.active >= draft.messages.length - 1) {
          draft.isCanceled = false;
          draft.state = 'not-running';
          draft.active = 0;
          draft.synth.cancel();
          draft.synth.resume();
        } else {
          draft.active++;
        }
      });
    case 'restart':
      return produce(state, (draft) => {
        draft.isCanceled = true;
        draft.synth.cancel();
        draft.synth.resume();
      });
    case 'setState':
      return produce(state, (draft) => {
        draft.state = action.payload.as;
      });
    case 'changeVoice':
      return produce(state, (draft) => {
        const newVoice = draft.synth
          .getVoices()
          .find((item) => item.name === action.payload.voiceName);

        if (newVoice && draft.details) draft.details.voice = newVoice;
      });
    case 'changeSpeed':
      return produce(state, (draft) => {
        draft.details.speed = action.payload.voiceSpeed;
      });
    default:
      return state;
  }
}

export function useTTS() {
  const [voice, dispatchVoice] = useReducer(reducer, defaultState);

  useEffect(() => {
    for (let i = 0; i < voice.messages.length; i++) {
      voice.messages[i].addEventListener('end', () => {
        dispatchVoice({ type: 'nextMessage' });
      });
    }
  }, [voice.messages]);

  useEffect(() => {
    console.log(voice);
  }, [voice]);

  const control = {
    start: () => {
      if (voice.messages.length > 0) {
        voice.messages.map((item) => {
          voice.synth.speak(item);
        });
        dispatchVoice({ type: 'setState', payload: { as: 'running' } });
      }
    },
    pause: () => {
      voice.synth.pause();
      dispatchVoice({ type: 'setState', payload: { as: 'paused' } });
    },
    resume: () => {
      voice.synth.resume();
      dispatchVoice({ type: 'setState', payload: { as: 'running' } });
    }
  };

  return {
    voice,
    dispatchVoice,
    control
  };
}

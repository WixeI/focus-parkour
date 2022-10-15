import { useEffect, useReducer } from 'react';
import { produce } from 'immer';
import { Action, Voice } from './types';

/*
  To-Do: create pause option that checks: if last video ended paused "this happens", then pause the next when starts
*/

const defaultState: Voice = {
  synth: window.speechSynthesis,
  state: 'not-running',
  isCanceled: false,
  active: 0,
  messages: []
};

function reducer(state: Voice, action: Action) {
  switch (action.type) {
    case 'generateMessages':
      return produce(state, (draft) => {
        draft.isCanceled = false;
        draft.state = 'not-running';
        draft.active = 0;
        draft.synth.resume();
        const dividedMessages = action.payload.message.split(/[.]+/);
        draft.messages = dividedMessages.map((item) => {
          return new SpeechSynthesisUtterance(item);
        });
      });
    case 'nextMessage':
      return produce(state, (draft) => {
        if (draft.isCanceled || draft.active >= draft.messages.length - 1) {
          draft.isCanceled = false;
          draft.state = 'not-running';
          draft.active = 0;
          draft.synth.resume();
        } else {
          draft.active++;
          draft.synth.resume();
        }
      });
    case 'restart':
      return produce(state, (draft) => {
        draft.isCanceled = true;
      });
    case 'setState':
      return produce(state, (draft) => {
        draft.state = action.payload.as;
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
    voice.isCanceled && voice.synth.cancel();
  }, [voice.isCanceled]);

  useEffect(() => {
    if (voice.active > 0) voice.synth.speak(voice.messages[voice.active]);
  }, [voice.active]);

  // useEffect(() => {
  //   console.log(voice);
  // }, [voice]);

  const control = {
    start: () => {
      if (voice.messages.length > 0) {
        voice.synth.speak(voice.messages[0]);
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

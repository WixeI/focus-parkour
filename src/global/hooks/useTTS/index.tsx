import { useState, useEffect, useReducer } from 'react';
import { produce } from 'immer';

/*
  To-Do: create pause option that checks: if last video ended paused "this happens", then pause the next when starts
*/

// interface Settings {
//   volume: number;
//   pitch: number;
//   rate: number;
//   lang: string;
//   text: {
//     raw: string;
//     divided: string[];
//   };
//   voice: SpeechSynthesisVoice[];
// }

/*
 - Gets list of voices and store in State and list of languages, to use in conjunction with "settings state"
 - Has settings state that uses reducer to change stuff
   - Has volume, pitch, rate, text, voice and lang
 - Has pause, resume, start and end (means same as restart) functions to use
 - Has subtitles in blocks. Break string by punctuation into substrings and TTS them in order.
   - When you change from one TTS to another, the visible text (subtitles) also change. Simple way to make them stay in order
   - The gap between audios is what makes punctuations last. Periods last longer than commas
   - Also consider: good word count gap. If less than that, go on up to next punctuation.
     - If next punctuation passes GWCG, goes one back. If not, stay and check the next.
     - Diferenciate between "good word count gap" and "max word count"
     - max means when, without punctuation gaps, you cross a certain quantity of characters.
       - in this case, it will cut to last word that fits into max word count and give no time gap to next queue
*/

interface Message {
  hasStarted: boolean;
  active: {
    index: number;
    text: string;
  };
  dividedText: string[];
}

type Action =
  | {
      type: 'nextActive';
    }
  | {
      type: 'startSpeech';
    }
  | {
      type: 'finishSpeech';
    }
  | {
      type: 'updateDividedText';
      payload: { textList: string[] };
    };

const defaultState: Message = {
  hasStarted: false,
  active: {
    index: 0,
    text: ''
  },
  dividedText: []
};

function reducer(state: Message, action: Action) {
  switch (action.type) {
    case 'nextActive':
      return produce(state, (draft) => {
        if (draft.active.index < draft.dividedText.length - 1) draft.active.index++;
        else draft.active.index = 0;
        draft.active.text = draft.dividedText[draft.active.index];
      });
    case 'startSpeech':
      return produce(state, (draft) => {
        draft.hasStarted = true;
      });
    case 'finishSpeech':
      return produce(state, (draft) => {
        draft.hasStarted = false;
        draft.active = {
          index: 0,
          text: draft.dividedText[0] || ''
        };
      });
    case 'updateDividedText':
      return produce(state, (draft) => {
        draft.dividedText = action.payload.textList;
        draft.active.text = draft.dividedText[0] || '';
      });
    default:
      return state;
  }
}

export function useTTS() {
  const synth = window.speechSynthesis;
  const msg = new SpeechSynthesisUtterance();
  const [message, dispatchMessage] = useReducer(reducer, defaultState);
  // const [settings, setSettings] = useReducer(); Consider if needed later

  msg.addEventListener('end', () => {
    if (message.active.index !== message.dividedText.length - 1)
      dispatchMessage({ type: 'nextActive' });
    else dispatchMessage({ type: 'finishSpeech' });
  });

  useEffect(() => {
    if (message.active.index !== 0 && message.hasStarted) {
      updateMsgText();
      synth.speak(msg);
    }
  }, [message.active.index]);

  useEffect(() => {
    console.log(message);
  }, [message]);

  function updateMsgText() {
    msg.text = message.active.text;
    return msg;
  }

  function createMessage(text: string) {
    const dividedText = text.split(/[.]+/);
    dispatchMessage({ type: 'updateDividedText', payload: { textList: dividedText } });
    msg.text = dividedText[0];
  }

  function startSpeech() {
    dispatchMessage({ type: 'startSpeech' });
    synth.speak(updateMsgText());
  }

  function cancelSpeech() {
    dispatchMessage({ type: 'finishSpeech' });
    synth.cancel();
  }

  return { synth, msg, message, dispatchMessage, createMessage, startSpeech, cancelSpeech };
}

/*
activeSubstring é um objeto com o index atual e o texto atual

msg.onEnd executa função que: atualiza activeSubstring, se activesubstring for a última, volta pra Zero
useEffect: quando activeSubstring muda, se não for pra zero, ela dá synth.play(msg)
função de play dá synth.speak(msg), que dá início ao ciclo, e hasStarted vira true
  se hasStarted é true, play não faz nada

pause e resume são só synth.pause e synth.resume
função de cancel dá synth.cancel, muda activeSubstring pra 0 e põe hasStarted como false

subtitles são só uma span/p tag com conteúdo sendo {activeSubstring.text}
subtitles só aparecem sob o condicional hasStarted

*/

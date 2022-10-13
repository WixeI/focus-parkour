import { useState } from 'react';

interface UseStepperProps {
  genericProp: number;
}

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

export function useStepper({ genericProp }: UseStepperProps) {
  const [state, setState] = useState(genericProp);

  function stateIncrementer() {
    setState((prev) => prev + 1);
  }

  return { state, setState, stateIncrementer };
}

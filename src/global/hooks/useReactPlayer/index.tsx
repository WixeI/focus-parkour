import { useReducer } from 'react';
import { produce } from 'immer';
import { Action, Settings } from './types';

//Reference: https://www.npmjs.com/package/react-player#config-prop
//Reference: https://developers.google.com/youtube/player_parameters?playerVersion=HTML5

//Utility Information
const defaultState: Settings = {
  playing: false,
  loop: false,
  light: false,
  volume: 0.5,
  muted: false,
  playbackRate: 1,
  pip: false,
  config: {
    youtube: {
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        showinfo: 0
      }
    }
  }
};

/*
      type: 'changePlaying';
      type: 'changeLoop';
      type: 'changeLight';
      type: 'changeVolume';
      type: 'changeMuted';
      type: 'changePlaybackRate';
      type: 'changePip';
      type: 'changeAutoplay';
      type: 'changeControls';
      type: 'changeDisablekb';
      type: 'changeFs';
      type: 'changeIv_load_policy';
      type: 'changeShowinfo';
*/
function reducer(state: Settings, action: Action) {
  switch (action.type) {
    case 'changePlaying':
      return produce(state, (draft) => {
        draft.playing = action.payload.value;
      });
    case 'changeLoop':
      return produce(state, (draft) => {
        draft.loop = action.payload.value;
      });
    case 'changeLight':
      return produce(state, (draft) => {
        draft.light = action.payload.value;
      });
    case 'changeVolume':
      return produce(state, (draft) => {
        draft.volume = action.payload.value;
      });
    case 'changeMuted':
      return produce(state, (draft) => {
        draft.muted = action.payload.value;
      });
    case 'changePlaybackRate':
      return produce(state, (draft) => {
        draft.playbackRate = action.payload.value;
      });
    case 'changePip':
      return produce(state, (draft) => {
        draft.pip = action.payload.value;
      });
    case 'changeAutoplay':
      return produce(state, (draft) => {
        draft.config.youtube.playerVars.autoplay = action.payload.value;
      });
    case 'changeControls':
      return produce(state, (draft) => {
        draft.config.youtube.playerVars.controls = action.payload.value;
      });
    case 'changeDisablekb':
      return produce(state, (draft) => {
        draft.config.youtube.playerVars.disablekb = action.payload.value;
      });
    case 'changeFs':
      return produce(state, (draft) => {
        draft.config.youtube.playerVars.fs = action.payload.value;
      });
    case 'changeIv_load_policy':
      return produce(state, (draft) => {
        draft.config.youtube.playerVars.iv_load_policy = action.payload.value;
      });
    case 'changeShowinfo':
      return produce(state, (draft) => {
        draft.config.youtube.playerVars.showinfo = action.payload.value;
      });
    default:
      return state;
  }
}

//Reducer Information
export function useReactPlayer() {
  const [settings, dispatchSettings] = useReducer(reducer, defaultState);

  return { settings, dispatchSettings };
}

export interface useReactPlayerProps {
  initialSettings: Settings;
}

export interface Settings {
  playing: boolean;
  loop: boolean;
  light: boolean;
  volume: number;
  muted: boolean;
  playbackRate: number;
  pip: boolean;
  config: {
    youtube: {
      playerVars: {
        autoplay: 0 | 1;
        controls: 0 | 1 | 2;
        disablekb: 0 | 1;
        fs: 0 | 1;
        iv_load_policy: 1 | 2 | 3;
        showinfo: 0 | 1;
      };
    };
  };
}

export type Action =
  | {
      type: 'changePlaying';
      payload: { value: boolean };
    }
  | {
      type: 'changeLoop';
      payload: { value: boolean };
    }
  | {
      type: 'changeLight';
      payload: { value: boolean };
    }
  | {
      type: 'changeVolume';
      payload: { value: number };
    }
  | {
      type: 'changeMuted';
      payload: { value: boolean };
    }
  | {
      type: 'changePlaybackRate';
      payload: { value: number };
    }
  | {
      type: 'changePip';
      payload: { value: boolean };
    }
  | {
      type: 'changeAutoplay';
      payload: { value: 0 | 1 };
    }
  | {
      type: 'changeControls';
      payload: { value: 0 | 1 | 2 };
    }
  | {
      type: 'changeDisablekb';
      payload: { value: 0 | 1 };
    }
  | {
      type: 'changeFs';
      payload: { value: 0 | 1 };
    }
  | {
      type: 'changeIv_load_policy';
      payload: { value: 1 | 2 | 3 };
    }
  | {
      type: 'changeShowinfo';
      payload: { value: 0 | 1 };
    };

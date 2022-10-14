import ReactPlayer from 'react-player';
import {
  MdPlayArrow,
  MdRestartAlt,
  MdOutlineVolumeUp,
  MdPause,
  MdVolumeMute
} from 'react-icons/md';
import { useReactPlayer } from '../../global/hooks/useReactPlayer';
import SideBar from './components/SideBar';
import { useEffect, useState, useRef } from 'react';
import { changeFocusTo } from '../../global/utilities/changeFocusTo';
import { useTTS } from '../../global/hooks/useTTS';

// Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang
// Reference: https://www.npmjs.com/package/react-player

//Voice Management
// const synth = window.speechSynthesis;
// const msg = new SpeechSynthesisUtterance();
// msg.text = 'rihanna escreve Deus com d minúsculo e vira papagaio no interior de minas gerais';

const Home = () => {
  //Video Management
  const { settings, dispatchSettings } = useReactPlayer();

  //Voice Management
  const { createMessage, startSpeech, synth, cancelSpeech, message } = useTTS();

  //Control Management
  const [isOpen, setIsOpen] = useState(false);
  const [refreshVideo, setRefreshVideo] = useState(0);

  //Focus Management
  const refMuteButton = useRef<HTMLButtonElement>(null);
  const refSideBar = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-screen w-screen overflow-clip bg-slate-700">
      {/* Controls */}
      <button
        onClick={() => {
          startSpeech();
        }}>
        Começa
      </button>
      <button
        className=" bg-orange-300"
        onClick={() => {
          synth.paused ? synth.resume() : synth.pause();
          console.log('Pause PLay');
        }}>
        Pausa/Continua
      </button>
      <button
        onClick={() => {
          cancelSpeech();
        }}>
        Reseta
      </button>
      <main className=" relative flex h-full w-full items-end justify-center gap-2 overflow-hidden p-12">
        {/* Restart */}
        <button
          onClick={() => setRefreshVideo((prev) => prev + 1)}
          className=" z-10 flex h-12 w-12 translate-y-6 items-center justify-center rounded-full  border-2 border-slate-50 border-opacity-50 bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100">
          <MdRestartAlt size="1.5rem" />
        </button>
        {/* Play */}
        <button
          onClick={() =>
            dispatchSettings({ type: 'changePlaying', payload: { value: !settings.playing } })
          }
          className=" z-10 flex h-16 w-16 items-center justify-center rounded-full  border-2 border-slate-50 border-opacity-50 bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100">
          {settings.playing ? <MdPause size="2rem" /> : <MdPlayArrow size="2rem" />}
        </button>
        {/* Volume */}
        <button
          ref={refMuteButton}
          onClick={() =>
            dispatchSettings({ type: 'changeMuted', payload: { value: !settings.muted } })
          }
          onKeyDown={(e) => changeFocusTo(e, refSideBar)}
          className=" z-10 flex h-12 w-12 translate-y-6 items-center justify-center rounded-full  border-2 border-slate-50 border-opacity-50 bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100">
          {settings.muted ? <MdVolumeMute size="1.5rem" /> : <MdOutlineVolumeUp size="1.5rem" />}
        </button>
        {message.hasStarted && (
          <h1 className=" absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-roboto text-5xl font-bold text-slate-50 [-webkit-text-stroke-color:black] [-webkit-text-stroke-width:1px]">
            {message.active.text}
          </h1>
        )}
        {/* Remove YT Branding: https://codepen.io/Terrafire123/pen/yLayQvM with Tweaks in width and height */}
        <ReactPlayer
          className="[& *]:-z-10 pointer-events-none absolute top-2/4 left-0 -translate-y-2/4 "
          width="100%"
          height="100vw"
          key={refreshVideo}
          {...settings}
          url="https://youtu.be/ps20zN1ZqUo"
        />
      </main>
      <SideBar
        voiceData={{ createMessage: createMessage, startSpeech: startSpeech }}
        onKeyDown={(e) => changeFocusTo(e, refMuteButton, true)}
        ref={refSideBar}
        isOpen={isOpen}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />
    </div>
  );
};

export default Home;

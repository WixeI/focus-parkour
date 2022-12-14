import ReactPlayer from 'react-player';
import {
  MdPlayArrow,
  MdRestartAlt,
  MdOutlineVolumeUp,
  MdPause,
  MdVolumeMute
} from 'react-icons/md';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useReactPlayer } from '../../global/hooks/useReactPlayer';
import SideBar from './components/SideBar';
import { useState, useRef, useEffect } from 'react';
import { changeFocusTo } from '../../global/utilities/changeFocusTo';
import { useTTS } from '../../global/hooks/useTTS';
import { motion } from 'framer-motion';
import logo from '../../global/resources/logo.png';
import lowPolyGridHorizontal from '../../global/resources/low-poly-grid-horizontal.svg';

// Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang
// Reference: https://www.npmjs.com/package/react-player

const Home = () => {
  //Control Management
  const [isOpen, setIsOpen] = useState(true);
  const [refreshVideo, setRefreshVideo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasBuffered, setHasBuffered] = useState(false);

  //Video Management
  const { settings, dispatchSettings } = useReactPlayer();
  const [url, setUrl] = useState({ link: 'https://youtu.be/n_Dv4JMiwK8', time: 60 });

  function changeTime() {
    //random number between 60 and 1560
    const time = Math.floor(Math.random() * 1500) + 60;
    setUrl({ ...url, time: time });
  }

  //Voice Management
  const { voice, dispatchVoice, control } = useTTS();

  //Mixed Management
  function startContent() {
    if (hasBuffered === false) {
      changeTime();
      dispatchSettings({ type: 'changePlaying', payload: { value: true } });
    } else {
      //Voice Management
      if (voice.state === 'not-running') control.start();
      else if (voice.state === 'running') control.pause();
      else control.resume();
    }
  }

  useEffect(() => {
    hasBuffered && startContent();
  }, [hasBuffered]);

  useEffect(() => {
    //Makes Video controlled by TTS
    if (voice.state === 'running')
      dispatchSettings({ type: 'changePlaying', payload: { value: true } });
    else dispatchSettings({ type: 'changePlaying', payload: { value: false } });
  }, [voice.state]);

  //Focus Management
  const refMuteButton = useRef<HTMLButtonElement>(null);
  const refSideBar = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-screen w-screen overflow-clip bg-slate-700">
      {/* Controls */}
      <main className="relative flex h-full w-full items-end justify-center gap-2 overflow-hidden p-12">
        {/* Restart */}
        <button
          disabled={voice.messages.length === 0}
          onClick={() => {
            setRefreshVideo((prev) => prev + 1);
            dispatchVoice({ type: 'restart' });
          }}
          className=" z-30 flex h-12 w-12 translate-y-6 items-center justify-center rounded-full border-2 border-slate-50  border-opacity-50 bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 disabled:opacity-90 disabled:hover:border-opacity-50">
          <MdRestartAlt size="1.5rem" />
        </button>
        {/* Play */}
        <button
          disabled={voice.messages.length === 0}
          onClick={startContent}
          className=" z-30 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-50 border-opacity-50  bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 disabled:opacity-90 disabled:hover:border-opacity-50">
          {settings.playing ? <MdPause size="2rem" /> : <MdPlayArrow size="2rem" />}
        </button>
        {/* Volume */}
        <button
          disabled={voice.messages.length === 0}
          ref={refMuteButton}
          onClick={() => {
            dispatchSettings({ type: 'changeMuted', payload: { value: !settings.muted } });
          }}
          onKeyDown={(e) => changeFocusTo(e, refSideBar)}
          className=" z-30 flex h-12 w-12 translate-y-6 items-center justify-center rounded-full border-2 border-slate-50 border-opacity-50  bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 disabled:opacity-90 disabled:hover:border-opacity-50">
          {settings.muted ? <MdVolumeMute size="1.5rem" /> : <MdOutlineVolumeUp size="1.5rem" />}
        </button>
        {/* Subtitles */}
        {(isLoading || !hasBuffered || voice.state === 'not-running') && (
          <motion.div
            initial={{ y: '30px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ bounceStiffness: 80 }}
            className="absolute top-0 left-0 z-20 h-full w-full bg-slate-600">
            {isLoading ? (
              <motion.div
                initial={{ rotate: 0, x: '-50%' }}
                animate={{ rotate: 360, x: '-50%' }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 h-min w-min">
                <CgSpinnerTwoAlt size="4rem" className=" text-slate-50" />
              </motion.div>
            ) : (
              <>
                <motion.img
                  initial={{ y: '-35%', x: '-50%' }}
                  animate={{ y: '-50%', x: '-50%' }}
                  transition={{ repeat: Infinity, duration: 3, repeatType: 'reverse' }}
                  src={logo}
                  className=" absolute top-[35%] left-1/2 w-1/3 min-w-[350px] drop-shadow-lg"
                />
              </>
            )}
            {/* Background */}
            <img
              src={lowPolyGridHorizontal}
              className="absolute top-0 left-0 -z-10 min-h-full min-w-full max-w-none opacity-90"
            />
          </motion.div>
        )}
        {voice.messages[voice.active] && (
          <h1
            style={{ textShadow: '0px 0px 8px black' }}
            className=" absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-roboto text-5xl font-bold text-slate-50 [-webkit-text-stroke-color:black] [-webkit-text-stroke-width:1px]">
            {voice.messages[voice.active].text}
          </h1>
        )}
        {/* Player - No YT Brand: https://codepen.io/Terrafire123/pen/yLayQvM w/ Tweaked width & height */}
        <ReactPlayer
          className="[& *]:-z-10 pointer-events-none absolute top-2/4 left-0 -translate-y-2/4 "
          width="100%"
          height="100vw"
          key={refreshVideo}
          {...settings}
          onBuffer={() => setIsLoading(true)}
          onBufferEnd={() => {
            setIsLoading(false);
            setHasBuffered(true);
          }}
          url={url.link + '?t=' + url.time}
        />
      </main>
      <SideBar
        voice={voice}
        dispatchVoice={dispatchVoice}
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

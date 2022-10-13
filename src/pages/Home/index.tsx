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

// Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang
// Reference: https://www.npmjs.com/package/react-player

const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
msg.text = 'rihanna escreve Deus com d minúsculo e vira papagaio no interior de minas gerais';

const Home = () => {
  const { settings, dispatchSettings } = useReactPlayer();

  const [isOpen, setIsOpen] = useState(false);
  const [refreshVideo, setRefreshVideo] = useState(0);

  const voices = synth.getVoices();

  const refMuteButton = useRef<HTMLButtonElement>(null);
  const refSideBar = useRef<HTMLButtonElement>(null);

  //Used to skip embedded tabeable elements. Mute goes to Sidebar and vice/versa
  useEffect(() => {
    refMuteButton.current?.focus();
  }, [isOpen]);

  msg.lang = 'en-GB';
  msg.voice = voices[0];

  return (
    <div className="flex h-screen w-screen overflow-clip bg-slate-700">
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
          onKeyDown={(e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
              e.preventDefault();
              refSideBar.current?.focus();
            }
          }}
          className=" z-10 flex h-12 w-12 translate-y-6 items-center justify-center rounded-full  border-2 border-slate-50 border-opacity-50 bg-slate-900 bg-opacity-95 text-slate-50 shadow-md shadow-slate-900 hover:border-opacity-100">
          {settings.muted ? <MdVolumeMute size="1.5rem" /> : <MdOutlineVolumeUp size="1.5rem" />}
        </button>
        {/* Remove YT Branding: https://codepen.io/Terrafire123/pen/yLayQvM with Tweaks in width and height */}
        <ReactPlayer
          className="[& *]:-z-10 pointer-events-none absolute top-2/4 left-0 -translate-y-2/4 "
          width="100%"
          height="100vw"
          key={refreshVideo}
          {...settings}
          url="https://www.youtube.com/watch?v=y8qhSduN6sk&t=13s"
        />
      </main>
      <SideBar
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
            refMuteButton.current?.focus();
          }
        }}
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

/*
    <S.DivWrapper css={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <S.MainContent as="main" css={{ width: '100%', position: 'relative' }}>
        <S.Button onClick={() => window.speechSynthesis.speak(msg)}>SPEAK</S.Button>
        <S.Button onClick={() => setIsPlaying((prev) => !prev)}>play/pause</S.Button>
        <S.StyleReactPlayer>
          <ReactPlayer
            width="100vw"
            height="100%"
            playing={isPlaying}
            url="https://www.youtube.com/watch?v=GTaXbH6iSFA&t=374s"
          />
        </S.StyleReactPlayer>
      </S.MainContent>

      <S.AsideMenu>
        <S.DivTitle>
          <MdChevronRight size="2.5rem" />
          <S.HeadingTitle>Options</S.HeadingTitle>
        </S.DivTitle>

        <S.Form>
          <S.SectionForm>
            <S.Label>Your Text</S.Label>
            <S.Textarea />
          </S.SectionForm>

          <S.SectionForm>
            <S.Label>Voice Type</S.Label>
            <S.Select />
          </S.SectionForm>

          <S.SectionForm>
            <S.Label>Music Type</S.Label>
            <S.Select />
          </S.SectionForm>

          <S.Button>Generate</S.Button>
        </S.Form>
      </S.AsideMenu>
    </S.DivWrapper>
*/

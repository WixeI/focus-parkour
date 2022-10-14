import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { forwardRef, useRef, useEffect } from 'react';

//Reference: https://stackoverflow.com/questions/67506992/how-can-i-switch-between-react-components-using-framer-motion
//Reference: https://codesandbox.io/s/framer-motion-carousel-animation-wetrf?file=/src/App.tsx:1098-1106

interface SideBarProps extends HTMLMotionProps<'aside'> {
  isOpen: boolean;
}

const SideBar = forwardRef<HTMLButtonElement, SideBarProps>(({ isOpen, onClick, ...rest }, ref) => {
  //Focus Management
  const R = {
    MdChevronLeft: useRef<HTMLButtonElement>(null),
    MdChevronRight: useRef<HTMLButtonElement>(null)
  };

  useEffect(() => {
    if (isOpen) R.MdChevronRight.current?.focus();
    else R.MdChevronLeft.current?.focus();
  }, [isOpen]);

  //Conditional Management
  const conditional = {
    props: {
      aside: new Map([
        [true, {}],
        [false, { onClick: onClick }]
      ])
    },
    content: new Map([
      [
        true,
        <div className=" z-10 flex h-full w-full flex-col gap-2 overflow-clip">
          {/* Title */}
          <button
            key="MdChevronRight"
            ref={R.MdChevronRight}
            className="flex items-center hover:cursor-pointer"
            onClick={onClick}>
            <motion.div exit={{ rotate: '180deg' }}>
              <MdChevronRight size="2.5rem" />
            </motion.div>
            <h2 className="text-3xl">Options</h2>
          </button>
          {/* Form Content */}
          <motion.form
            initial={{ y: '50px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0, transition: { duration: 0.1 } }}
            transition={{ ease: 'easeInOut' }}
            className="flex h-full w-full flex-col gap-2 px-4 ">
            <section className=" flex flex-col gap-2">
              <label>Your text</label>
              <textarea className=" resize-none" />
            </section>

            <section className=" flex flex-col gap-2">
              <label>Voice Option</label>
              <select />
            </section>

            <section className=" flex flex-col gap-2">
              <label>Music Style</label>
              <select />
            </section>

            <button className=" mt-4 border-none bg-slate-600 py-2 text-slate-50 shadow-md shadow-slate-800 transition-all duration-300 hover:bg-slate-500">
              Generate
            </button>
          </motion.form>
        </div>
      ],
      [
        false,
        <motion.button
          key="MdChevronLeft"
          ref={R.MdChevronLeft}
          exit={{ rotate: '180deg', transition: { duration: 0.3 } }}
          className="w-min">
          <MdChevronLeft className=" fill-slate-50" size="2.5rem" />
        </motion.button>
      ]
    ]),
    style: {
      aside: new Map([
        [true, 'w-[25rem]'],
        [false, 'w-9 hover:cursor-pointer']
      ])
    }
  };

  return (
    <motion.aside
      {...rest}
      ref={ref}
      tabIndex={0}
      initial={{ x: '2.5rem', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-2.5rem', opacity: 0 }}
      {...conditional.props.aside.get(isOpen)}
      className={` ${conditional.style.aside.get(isOpen)} 
        relative flex flex-col gap-2 overflow-clip bg-slate-900 bg-opacity-80 text-slate-50 shadow-2xl shadow-slate-900 transition-all `}>
      <AnimatePresence mode="wait">
        {isOpen === true && conditional.content.get(true)}
        {isOpen === false && conditional.content.get(false)}
      </AnimatePresence>
    </motion.aside>
  );
});
SideBar.displayName = 'SideBar';

export default SideBar;

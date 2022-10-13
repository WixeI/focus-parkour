import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';

interface SideBarProps extends HTMLMotionProps<'aside'> {
  isOpen: boolean;
}

const SideBar = ({ isOpen, onClick, ...rest }: SideBarProps) => {
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
          <div className="flex items-center hover:cursor-pointer" onClick={onClick}>
            <MdChevronRight size="2.5rem" />
            <h2 className="text-3xl">Options</h2>
          </div>
          {/* Form Content */}
          <form className="flex h-full w-full flex-col gap-2 px-4 ">
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
          </form>
        </div>
      ],
      [false, <MdChevronLeft className=" fill-slate-50" size="2.5rem" />]
    ]),
    style: {
      aside: new Map([
        [true, 'w-[25rem]'],
        [false, 'w-9 hover:cursor-pointer']
      ])
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        {...rest}
        {...conditional.props.aside.get(isOpen)}
        className={` ${conditional.style.aside.get(isOpen)} 
          relative flex flex-col gap-2 overflow-clip bg-slate-900 bg-opacity-80 text-slate-50 shadow-2xl shadow-slate-900 hover:cursor-pointer`}>
        {conditional.content.get(isOpen)}
      </motion.aside>
    </AnimatePresence>
  );
};

export default SideBar;

/*
  <AnimatePresence>
    <motion.aside
      initial={{ x: '2.5rem', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'just', duration: 0.2 }}
      exit={{ x: '-2.5rem', opacity: 0 }}
      onClick={onClick}
      {...rest}
      className=" flex w-9 flex-col gap-2 overflow-clip bg-slate-900 bg-opacity-80 text-slate-50 shadow-2xl shadow-slate-900 hover:cursor-pointer">
      <MdChevronLeft size="2.5rem" />
    </motion.aside>
  </AnimatePresence>
*/

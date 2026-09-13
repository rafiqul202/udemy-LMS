import React, { useEffect, useState } from "react";
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress";
// import {motion} from "framer-motion"
const MediaProgressBar = ({ isMediaUploading, progress }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isMediaUploading) {
      setShowProgress(true);
      setAnimatedProgress(progress);
    } else {
      const timer = setTimeout(() => {
        setShowProgress(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMediaUploading, progress]);
  if (!progress) return null;
  return (
    //     <div className='w-[50%] bg-gray-300 rounded-full h-2.5 mb-4 relative overflow-hidden'>
    //       <motion.div className='bg-gray-700 h-2.5 rounded-full' initial={{width:0}} animate={{width:`${animatedProgress}%`,transition:{duration:0.5,ease:"easeInOut"}}}>
    //         {
    //           progress >= 100 && isMediaUploading && (<motion.div className='absolute top-0 left-0 right-0 bottom-0 bg-yellow-600 opacity-50' animate={{x:["0%","100%","0%"]}} transition={{duration:2,repeat:Infinity,ease:"linear"}} />)
    // }
    //       </motion.div>
    //     </div>
    <Progress value={animatedProgress} className="w-[50%] p-1.5 text-green-800">
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
};

export default MediaProgressBar;

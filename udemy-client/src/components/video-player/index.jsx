import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  PlayCircle,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
const VideoPlayer = ({ width = "100%", height = "100%", url }) => {
  const [playing, setPlaying] = useState(false);
  const [durationTime, setDurationTime] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  function handleProgress(state) {
    console.log("progress state data", state);
    if (!seeking) {
      setPlayed(state.played);
    }
  }

  const handlePlayAndPause = () => {
    setPlaying(!playing);
  };

  const handleRewind = () => {
    playerRef.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
  };
  const handleForward = () => {
    playerRef.current?.seekTo(playerRef?.current?.getCurrentTime() + 5);
  };
  const handleToggleMute = () => {
    setMuted(!muted);
  };
  const handleSeekChange = (newValue) => {
    setPlayed(newValue[0]);
    setSeeking(true);
  };
  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current?.seekTo(played);
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue[0]);
  };

  const formateTime = (ms) => {
    let milliseconds = Math.floor((ms / 1000) % 1000);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    setDurationTime(`${hours} hh ${minutes} sec ${seconds} mill`);
    return `${hours} hh ${minutes} sec ${seconds} mill`;
  };
  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef?.current?.requestFullscreen) {
        playerContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    const handelFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handelFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handelFullScreenChange);
  }, []);
  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-600 rounded-lg overflow-hidden shadow-2xl  transition-all duration-300 ease-in-out ${
        isFullScreen ? "w-screen h-screen" : ""
      }`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        src={url}
        className="rounded-md absolute top-0 left-0"
        width={"100%"}
        height={"100%"}
        ref={playerRef}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDurationChange={(duration) => formateTime(duration?.timeStamp)}
        style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
      />
      {showControls && (
        <div
          className={`absolute bottom-0 right-0 left-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider
            defaultValue={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAndPause}
                className="text-white hover:text-primary hover:bg-gray-300"
              >
                {playing ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <PlayCircle className="w-6 h-6" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRewind}
                className="text-white hover:text-primary hover: bg-gray-700"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleForward}
                className="text-white hover:text-primary hover: bg-gray-700"
              >
                <RotateCw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleMute}
                className="text-gray-50 bg-gray-600"
              >
                {muted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </Button>
              <Slider
                defaultValue={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => handleVolumeChange([value[0]] / 100)}
                className="w-28 h-2.5"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white pr-4">{durationTime}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullScreen}
                className="text-gray-50 bg-gray-600 mr-3"
              >
                {isFullScreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

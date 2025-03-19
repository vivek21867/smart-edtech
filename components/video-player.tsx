"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, HelpCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface VideoPlayerProps {
  videoId: string
  startTime?: number
  onProgressChange?: (progress: number) => void
  onVideoEnd?: () => void
}

export default function VideoPlayer({ videoId, startTime = 0, onProgressChange, onVideoEnd }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      if (playerRef.current && window.YT) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            start: startTime,
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target)
              setDuration(event.target.getDuration())
            },
            onStateChange: (event: any) => {
              const isNowPlaying = event.data === window.YT.PlayerState.PLAYING
              setIsPlaying(isNowPlaying)

              // Track progress when playing
              if (isNowPlaying) {
                if (progressInterval.current) {
                  clearInterval(progressInterval.current)
                }

                progressInterval.current = setInterval(() => {
                  const currentTime = event.target.getCurrentTime()
                  const duration = event.target.getDuration()
                  setCurrentTime(currentTime)

                  // Calculate and report progress percentage
                  if (duration > 0 && onProgressChange) {
                    const progressPercent = Math.min(Math.round((currentTime / duration) * 100), 100)
                    onProgressChange(progressPercent)
                  }

                  // Check for quiz trigger
                  if (currentTime > 15 && currentTime < 16 && !showQuiz) {
                    event.target.pauseVideo()
                    setShowQuiz(true)
                  }
                }, 1000)
              } else if (progressInterval.current) {
                clearInterval(progressInterval.current)
              }

              // Handle video end
              if (event.data === window.YT.PlayerState.ENDED && onVideoEnd) {
                onVideoEnd()
              }
            },
          },
        })
      }
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
      if (player) {
        player.destroy()
      }
    }
  }, [videoId, startTime, onProgressChange, onVideoEnd])

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
    }
  }

  const handleTimeChange = (value: number[]) => {
    if (player) {
      player.seekTo(value[0])
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (player) {
      const newVolume = value[0]
      player.setVolume(newVolume * 100)
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute()
        player.setVolume(volume * 100)
        setIsMuted(false)
      } else {
        player.mute()
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    const videoElement = playerRef.current?.parentElement
    if (!videoElement) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoElement.requestFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const dismissQuiz = () => {
    setShowQuiz(false)
    if (player) {
      player.playVideo()
    }
  }

  const handleAskDoubt = () => {
    // Pause the video
    if (player) {
      player.pauseVideo()
    }

    // Find the doubt tab and activate it
    const doubtTab = document.querySelector('[value="doubt"]') as HTMLElement
    if (doubtTab) {
      doubtTab.click()
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      {showQuiz && (
        <div className="absolute inset-0 z-10 bg-black/80 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 m-4">
            <h3 className="text-lg font-bold mb-4">Quick Check!</h3>
            <p className="mb-4">Which of the following is NOT a type of machine learning?</p>
            <div className="space-y-2 mb-4">
              <Button variant="outline" className="w-full justify-start text-left">
                Supervised Learning
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                Unsupervised Learning
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-green-50 border-green-500 dark:bg-green-900/20"
              >
                Prescriptive Learning
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                Reinforcement Learning
              </Button>
            </div>
            <div className="flex justify-end">
              <Button onClick={dismissQuiz} className="bg-green-500 hover:bg-green-600">
                Continue Learning
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 border-none text-white"
        onClick={handleAskDoubt}
      >
        <HelpCircle className="h-5 w-5 mr-1" />
        Ask Doubt
      </Button>

      <div className="relative w-full aspect-video">
        <div ref={playerRef} className="absolute top-0 left-0 w-full h-full" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-2 mb-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            <span className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={toggleFullscreen}
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


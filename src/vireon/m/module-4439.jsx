// @ts-nocheck
/* eslint-disable */
import { W7 } from "./module-2523.jsx";
import { trackVideoMetric } from "../../lib/vireon-browser-tracker";

import * as r from "react";
import { Button } from "@/components/ui/button";

export function c({ variant, onTimeUpdate, onPlaybackError }) {
    const { src, poster } = W7[variant];
    const videoRef = r.useRef(null);
    const [silent, setSilent] = r.useState(true);
    const [playbackFailed, setPlaybackFailed] = r.useState(false);

    r.useEffect(() => {
        trackVideoMetric(variant, "view");
    }, [variant]);

    const reportFailure = () => {
        setPlaybackFailed(true);
        trackVideoMetric(variant, "error");
        onPlaybackError?.();
    };

    const tryPlay = (video) => {
        if (!video) return;
        try {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === "function") {
                attempt.catch(reportFailure);
            }
        } catch {
            reportFailure();
        }
    };

    const enableSound = () => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.muted = false;
        setSilent(false);
        tryPlay(video);
    };

    const retryVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        setPlaybackFailed(false);
        video.load();
        tryPlay(video);
    };

    return <div className="w-full">
        <div className="vireon-local-player">
            <video ref={videoRef} src={src} poster={poster} autoPlay muted={silent} playsInline
                preload="metadata" aria-label={variant === "quiz" ? "Vireon introduction" : "Vireon protocol"}
                onTimeUpdate={(event) => onTimeUpdate?.(event.currentTarget.currentTime)}
                onPlaying={() => setPlaybackFailed(false)}
                onError={reportFailure}
                onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;
                    if (silent) enableSound();
                    else if (video.paused) tryPlay(video);
                    else video.pause();
                }} />
            {silent && <Button variant="ghost" className="vireon-video-sound"
                aria-label="Ativar som do vídeo" onClick={enableSound}>
                <img src="/v2/media/video-sound.png" alt="" />
            </Button>}
        </div>
        {playbackFailed && <div role="alert"
            className="mt-3 rounded-xl border border-[#dce0e5] bg-[#f8fbf9] px-4 py-3 text-center">
            <p className="text-[13px] font-semibold text-[#1f252e]">Having trouble playing the video?</p>
            <p className="mt-1 text-[12px] text-[#64748b]">
                {variant === "quiz"
                    ? "You can continue without the video."
                    : "You can still explore your personalized Vireon Protocol below."}
            </p>
            <button type="button" onClick={retryVideo}
                className="mt-2 min-h-10 rounded-lg border border-[#2a9d6f] px-4 py-2 text-[13px] font-semibold text-[#1f252e]">
                Retry video
            </button>
        </div>}
    </div>;
}

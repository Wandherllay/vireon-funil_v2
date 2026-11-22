// @ts-nocheck
/* eslint-disable */
import { W7 } from "./module-2523.jsx";

import * as r from "react";
import { Button } from "@/components/ui/button";
export function c({ variant, onTimeUpdate }) {
    const { src, poster } = W7[variant];
    const videoRef = r.useRef(null);
    const [silent, setSilent] = r.useState(true);
    const enableSound = () => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.muted = false;
        setSilent(false);
        video.play().catch(() => {});
    };
    return <div className="w-full"><div className="vireon-local-player">
        <video ref={videoRef} src={src} poster={poster} autoPlay muted={silent} playsInline
            preload="metadata" aria-label={variant === "quiz" ? "Vireon introduction" : "Vireon protocol"}
            onTimeUpdate={(event) => onTimeUpdate?.(event.currentTarget.currentTime)}
            onClick={() => {
                const video = videoRef.current;
                if (!video) return;
                if (silent) enableSound();
                else if (video.paused) video.play().catch(() => {});
                else video.pause();
            }} />
        {silent && <Button variant="ghost" className="vireon-video-sound" aria-label="Ativar som do vídeo" onClick={enableSound}>
            <img src="/v2/media/video-sound.png" alt="" />
        </Button>}
    </div></div>;
}

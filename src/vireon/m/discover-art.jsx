// @ts-nocheck
/* eslint-disable */
// Dedicated illustration per Discover item (exercises, sleep, stress).
let icons = {
    "brisk-walk": ["M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z", "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z", "M16 17h4", "M4 13h4"],
    "walk-intervals": ["M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "M12 9v4l2 2", "M10 2h4", "M19 5l1.5-1.5"],
    "sit-to-stand": ["M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3", "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z", "M5 18v2", "M19 18v2"],
    "wall-push-up": ["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z", "M3 9h18", "M3 15h18", "M9 3v6", "M15 9v6", "M9 15v6"],
    "hip-flexor-stretch": ["M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", "M12 6v6", "M12 12l-5 4v5", "M12 12l5 2 2 7", "M8 9h8"],
    "chest-opener": ["M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", "M12 6v8", "M3 8l9 2 9-2", "M12 14l-3 7", "M12 14l3 7"],
    "pelvic-floor-awareness": ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
    "diaphragmatic-breathing": ["M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2", "M9.6 4.6A2 2 0 1 1 11 8H2", "M12.6 19.4A2 2 0 1 0 14 16H2"],
    "even-count-breathing": ["M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0", "M2 18h20", "M6 18v-2", "M12 18v-2", "M18 18v-2"],
    "sleep-fundamentals": ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
    "nighttime-routines": ["M12 7v14", "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"],
    "sleep-environment": ["M2 4v16", "M2 8h18a2 2 0 0 1 2 2v10", "M2 17h20", "M6 8v9"],
    "recovery-habits": ["M4 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z", "M22 11v2", "M11 9l-2 3h3l-2 3"],
    "consistent-schedules": ["M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "M12 9v4l2 2", "M5 3 2 6", "m22 6-3-3"],
    "stress-management": ["M12 3v18", "M5 7h14", "M5 7l-3 6a3 3 0 0 0 6 0z", "M19 7l-3 6a3 3 0 0 0 6 0z", "M8 21h8"],
    "relaxation-techniques": ["M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z", "M2 21c0-3 1.85-5.36 5.08-6c1.1-.22 2.15-.53 2.92-1"],
    "breathing-exercises": ["M12 4v8", "M12 12c-2 0-6 2-6 6a2 2 0 0 0 2 2c2 0 4-2 4-4", "M12 12c2 0 6 2 6 6a2 2 0 0 1-2 2c-2 0-4-2-4-4"],
    "anxiety-education": ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z", "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"],
    "general-wellbeing": ["M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M12 2v2", "M12 20v2", "m4.93 4.93 1.41 1.41", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.34 17.66-1.41 1.41", "m19.07 4.93-1.41 1.41"]
};
let backgrounds = {
    exercises: "bg-[radial-gradient(circle_at_25%_20%,rgba(54,211,153,0.35),transparent_45%),linear-gradient(160deg,#0f3b34,#07101f)]",
    sleep: "bg-[radial-gradient(circle_at_70%_20%,rgba(140,120,255,0.38),transparent_45%),linear-gradient(160deg,#1b1a4a,#07101f)]",
    stress: "bg-[radial-gradient(circle_at_30%_25%,rgba(73,210,255,0.35),transparent_45%),linear-gradient(160deg,#12305f,#07101f)]"
};
let colors = {
    exercises: "text-[#36d399]",
    sleep: "text-[#b9a8ff]",
    stress: "text-cyan"
};
export function hasDiscoverArt(category, slug) {
    return Boolean(backgrounds[category] && icons[slug]);
}
export function DiscoverArt({ category, slug, label, className = "h-36" }) {
    let paths = icons[slug];
    if (!paths || !backgrounds[category]) {
        return null;
    }
    return <div role="img" aria-label={label} className={`grid w-full place-items-center ${backgrounds[category]} ${className}`}><svg viewBox="0 0 24 24" className={`h-16 w-16 ${colors[category]}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths.map((d)=><path key={d} d={d}/>)}</svg></div>;
}

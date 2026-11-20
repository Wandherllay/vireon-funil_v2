// @ts-nocheck
/* eslint-disable */

import * as n from "../shim/image.jsx";
import O from "../shim/link.jsx";
export function Z({ href = "/", markOnly = false }) {
    if (markOnly) {
        return <span className="inline-flex items-center gap-2.5"><n.default src="/v2/media/mark.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" priority/></span>;
    }
    return <O href={href} className="inline-flex items-center gap-2.5"><n.default src="/v2/media/mark.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" priority/><span className="font-display text-[15px] font-semibold tracking-[0.16em] text-white">VIREON <span className="text-cyan">MAX</span></span></O>;
}

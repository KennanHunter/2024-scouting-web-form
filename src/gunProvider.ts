import Gun from "gun/gun";
import SEA from "gun/sea.js";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/webrtc";
import "gun/nts";

export const gunClient = Gun({
  peers: [import.meta.env.VITE_GUN_URL],
  localStorage: false,
});

// Just make sure that SEA doesn't get tree shaken,
// i don't really know if this is important but better safe than sorry
export const sea = SEA;

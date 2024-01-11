export function validateSdpOffer(sdpOffer) {
    // Check for essential components
    if (!sdpOffer.includes("m=audio") || !sdpOffer.includes("m=video")) {
        return false;
    }

    // Check for ICE information
    if (!sdpOffer.includes("a=ice-ufrag") || !sdpOffer.includes("a=ice-pwd")) {
        return false;
    }

    // Additional checks for RTP header extensions, SSRC, codec details, etc.

    // Validation passed
    return true;
}
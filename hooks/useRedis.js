import { useState, useEffect } from "react";
import { redisHelpingFetcher } from "../utils/generalUtils";

const useRedis = (arrayObjectInput, original, second, booleanForHelper) => {

    const [redisState, setRedisState] = useState(null);

    useEffect(() => {
        if (original) {
            let copyOriginal, copySecond;
            if (original.constructor === Array) {
                copyOriginal = original;
                copySecond = second;
            } else {
                copyOriginal = Object.keys(original);
                copySecond = Object.keys(second);
            }
            if (copyOriginal.length > 0 && copySecond.length > 0) {
                if (JSON.stringify(original) !== JSON.stringify(second)) {
                    console.log("Updating caching...");
                    redisHelpingFetcher(arrayObjectInput, setRedisState, booleanForHelper);
                } else {
                    console.log("No change needed!");
                }
            }
        }
    }, [second]);

    return [ redisState ];
}

export default useRedis;
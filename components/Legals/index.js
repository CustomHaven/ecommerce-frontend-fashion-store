import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLegalThunk, selectLegal } from "../../feature/legalSlice/legalSlice";
import styles from "../../styles/Legals.module.css";

const Legals = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const fetchedLegal = useSelector(selectLegal);


    const [legalfetching, setLegalFetching] = useState(false);

    const arrayObj = { keyStr: props.pageType, usingKey: props.legal };

    const refreshLegals = async () => {
        const legalFetch = await fetch("/api/rediscach", {
            method: "POST",
            body: JSON.stringify(arrayObj)
        });

        if (legalFetch.ok) {
            const legalVal = await legalFetch.json();

            props.setLegal(Object.values(legalVal)[0]);
        } else {
            setLegalFetching(true);
        }

    }


    // if navigate between pages and legals does not change we force it to change with these useEffects
    useEffect(() => {
        refreshLegals();
    }, [router.query]);

    useEffect(() => {
        if (legalfetching) {
            dispatch(fetchLegalThunk({}));
        }
    }, [legalfetching]);

    useEffect(() => {
        if (legalfetching && fetchedLegal.hasOwnProperty("id")) {
            props.setLegal(fetchedLegal);
            setLegalFetching(false);
        }
    }, [fetchedLegal, legalfetching]);


    // if legal is empty from server we fetch from db and place the original one into the Frontend with no redis
    useEffect(() => {
        if (!props.legal) {
            dispatch(fetchLegalThunk({}));
        }
    }, []);

    useEffect(() => {
        if (fetchedLegal.hasOwnProperty("id") && !props.legal) {
            props.setLegal(fetchedLegal);
        }
    }, [fetchedLegal])


    return (
        <section data-white className={styles.legal_section}>
            <div>
                <h1>{props.pageType.replace(/_/g, " ").replace(/\b[a-z]/g, a => a.charAt(0).toUpperCase() + a.slice(1)).replace(/And?/, "&")}</h1>
                {
                    props.legal && <p>{props.legal[props.pageType]}</p>
                }
            </div>
        </section>
    )
}

export default Legals;
import { useState, useEffect } from "react"

function useFetching(url, config = {}) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    // handle error as well ;)

    useEffect(() => {
        if(!config.manual) {
            doFetch()
        }
    }, [])

    function doFetch() {
        setLoading(true);
        fetch(url, config)
            .then(res => res.json())
            .then(res => {
            setData(res)
            setLoading(false)
            })
    }

    function execute() {
        doFetch();
    }

    return {
        data,
        loading,
        execute
    }
} 

export default useFetching;

/*
// manually called
const { execute } = useFetch("your-url", { manual: true })

// automatically called
useFetch("your-url")
*/
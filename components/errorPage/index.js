import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowGoBackLine } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";
import useGameAnimation from '../../hooks/useGameAnimation';
import styles from "../../styles/Error.module.css";
import { selectGameActive, selectModal, playGame, modalOptions, hitpoints, restartGame } from '../../feature/errorSlice/errorSlice';


const ErrorPage = ({status, resetValues}) => {
    const router = useRouter();
    const canvasRef = useRef(null);
    const gameActive = useSelector(selectGameActive);
    const modal = useSelector(selectModal);
    const dispatch = useDispatch();
    const [requestRef, resetAnimation, setResetAnimation] = useGameAnimation(canvasRef, status, resetValues);

    const handleHome = () => {
        console.log(router);
        router.push("/");
    }

    const handleRestart = () => {
        dispatch(modalOptions(false));
        dispatch(hitpoints(3));
        dispatch(playGame(true));
        // dispatch(restartGame(true));
        setResetAnimation(requestRef.current + 1);
        requestRef.current = resetAnimation;
    }


    return (
        <>
            <section data-white>
                {
                    !gameActive &&
                    <div className={styles.errorModal}>
                        <div>
                            <button onClick={handleHome}>Home <RiArrowGoBackLine /></button>
                            <button onClick={handleRestart}>Restart <VscDebugRestart /></button>
                        </div>
                    </div>
                }
                <canvas ref={canvasRef} className={styles.canvaError} />
            </section>
        </>
    )
}

export default ErrorPage;
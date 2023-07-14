import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storePageListingArray,
    controlPageListing,
    selectPageListedArrayStorage, 
    selectPageListingController, 
    controlPageIndex, 
    selectPageIndex, 
    selectAdminOptionMenu, 
    controlOptionMenu,
    controlSlidePagesIndex,
    selectFirstList,
    selectLastList } from "../../../feature/generalComponents/generalComponentSlice";
import { BiSearchAlt } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TfiLayoutGrid2 } from "react-icons/tfi"
import styles from "../../../styles/Administrator/AdminSubHeaderNav.module.css";


// RETURN TO THIS PAGE WHEN THE OTHER BIT IS DONE
// AND DO THE LISTING CONTROLLING THE BIT ON FAR RIGHT BE CHOSEN BY USER THE LIST OF SPAN WE USE AND ARRAY FOR THAT

const SubHeaderNav = (props) => {
    const [value, setValue] = useState(4);
    const showMenu = useSelector(selectAdminOptionMenu);

    const indexing = useSelector(selectPageIndex);

    const pageListingArray = useSelector(selectPageListedArrayStorage);

    const firstList = useSelector(selectFirstList);
    const lastList = useSelector(selectLastList);

    // const copySlidesReversed = pageListingArray.reverse();

    console.log({pageListingArray});
    console.log({indexing})

    const handlePageList = (pageList, indexed, array) => {
        setValue(pageList);
        dispatch(controlPageListing(pageList));
        dispatch(controlPageIndex(indexed));
        dispatch(controlOptionMenu(false));

        const copyArray = [].concat(array);
        const copyArrayReversed = copyArray.reverse();

        const reverseIndexVal = copyArrayReversed[indexed-1];

        console.log({reverseIndexVal});

        const indexArrayVal = array.indexOf(reverseIndexVal);

        console.log({indexArrayVal});

        dispatch(controlSlidePagesIndex(indexArrayVal+1))
    }

    const dispatch = useDispatch();
    const handleArrowClick = () => {
        dispatch(controlOptionMenu(!showMenu));
    }
    return (
        <nav className={styles.admin_sub_header_nav}>
            <div className={styles.admin_sub_header_first_part}>
                <div><FiMenu /></div>
                <div><BsListTask /></div>
                <div><TfiLayoutGrid2 /></div>
                <div className={styles.admin_sub_header_search}>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <div>
                        <BiSearchAlt />
                    </div>
                </div>
            </div>

            {/* Will make the menu item list be based on user-preference the list of 0-4 of 20 will be user-preference as well */}
            <div className={styles.admin_sub_header_second_part}>
                <div>
                    <span>{firstList} of {lastList === 0 ? value : lastList}</span>
                    <span>{value}<IoIosArrowDown onClick={handleArrowClick} className={styles.admin_sub_header_arrow_cursor} />
                        {
                            showMenu &&
                            <div className={styles.menu_items}>
                                {
                                    pageListingArray.map((page, i, array) => 
                                            <span 
                                                key={"Page List" + page + "."}
                                                onClick={() => handlePageList(page, i+1, array)}>
                                                    {page}
                                            </span>
                                    )
                                }
                            </div>
                        }
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default SubHeaderNav;
import { useSelector } from "react-redux";
import Home from "../../Components/Home/Home";
import { selectUserInfo } from "../../Store/slices/userSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SYSTEM_ROLE } from "../../shared/constants/systemType";
import { ROUTES } from "../../shared/constants/navigation";

const HomePage = () => {
    const userInfo = useSelector(selectUserInfo);
    const history = useHistory();


    useEffect(() => {
        if (userInfo?.role === SYSTEM_ROLE.STAFF) {
            history.push(ROUTES.SEMINAR_LIST);
        }

        if (userInfo?.role === SYSTEM_ROLE.ADMIN) {
            history.push(ROUTES.ADMIN_BOOKING_LIST)
        }
    }, [userInfo])

    return <Home />
}

export default HomePage;
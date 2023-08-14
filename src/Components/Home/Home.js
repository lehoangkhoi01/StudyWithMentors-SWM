import { Typography } from "@mui/material";
import style from "./Home.module.scss"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTES } from "../../shared/constants/navigation";

const Home = () => {
    const history = useHistory();

    return <div className={`${style.home__container}`}>
        <div className={`${style.home__intro}`} >
            <img src={require("../../assets/home-img/Intro_Background.png")} />
        </div>

        <div className={`${style.home__target}`}>
            <div className={`${style.home__title}`}>
                <img src={require("../../assets/home-img/star.png")} />
                <Typography
                    fontWeight={700}
                    variant="h4"
                    color="#3948AB"
                    textAlign="center"
                    marginBottom={2}>
                    Mục tiêu phát triển</Typography>
                <img src={require("../../assets/home-img/star.png")} />
            </div>

            <div className={`${style.home__target_itemList}`}>
                <div className={`${style.home__target_item}`}>
                    <img src={require("../../assets/home-img/target_icon_1.png")} />
                    <p>Cùng phát triển</p>
                    <span>Nullam senectus porttitor in eget. Eget rutrum leo interdum.</span>
                </div>
                <div className={`${style.home__target_item}`}>
                    <img src={require("../../assets/home-img/target_icon_1.png")} />
                    <p>Hỗ trợ nhanh nhất</p>
                    <span>Nullam senectus porttitor in eget. Eget rutrum leo interdum.</span>
                </div>
                <div className={`${style.home__target_item}`}>
                    <img src={require("../../assets/home-img/target_icon_3.png")} />
                    <p>Tối ưu nhất</p>
                    <span>Nullam senectus porttitor in eget. Eget rutrum leo interdum.</span>
                </div>
            </div>
        </div>

        <div className={`${style.home__imageSection}`}>
            <img src={require("../../assets/home-img/Mentors_Info.png")} />
        </div>
        <div className={`${style.home__imageSection}`}>
            <img src={require("../../assets/home-img/Mentors_Major.png")} />
        </div>
        <div className={style.home__booking}>
            <Typography
                fontWeight={700}
                variant="h4"
                color="#fff"
                marginBottom={2}>
                Đặt lịch mentor ngay để được hỗ trợ hết mình!</Typography>

            <button onClick={() => {
                history.push(ROUTES.MENTOR_LIST)
            }}>Tìm hiểu ngay</button>
        </div>

        <div className={style.home__seminar}>
            <div className={`${style.home__title}`}>
                <Typography
                    fontWeight={700}
                    variant="h4"
                    color="#1A237E"
                    textAlign="center"
                    marginBottom={2}>
                    GrowthMe đồng hành cùng các hội thảo</Typography>
            </div>
            <img src={require("../../assets/home-img/Seminars.png")} />
        </div>

    </div>
}

export default Home;
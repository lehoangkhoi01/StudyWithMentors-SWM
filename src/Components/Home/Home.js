import { Typography } from "@mui/material";
import style from "./Home.module.scss"

const Home = () => {
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

            <div className={`${style.home__target_item}`}>
                <div>
                    
                </div>
            </div>
        </div>


    </div>
}

export default Home;
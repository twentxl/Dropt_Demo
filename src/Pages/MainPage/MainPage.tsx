import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './MainPage.module.css';
import Header from '../../components/Header/Header';
import main_image from "../../img/main_image.png";
import cursor from "../../../public/cursor.svg";
import Button from '../../components/ui/Button/Button';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <Header />
        <main>
            <section className={style.section}>
                <div className='container'>
                    <div className={style.mainSection_content}>
                        <div className={`${style.mainSection_text} ${style.sectionBlock}`}>
                            <h1 style={{ marginBottom: "50px" }}>
                                <span>
                                    Comfortable accessible graphics editor "Dropt"
                                    <img src={cursor} alt="cursor" className={style.mainSection_cursor} />
                                </span>
                            </h1>
                            <p>
                                Dropt is like a whiteboard, markers and imagination, but digital. Create floor plans, diagrams, training materials, presentations - easily and intuitively, using drag & drop.
                                <br/>
                                <br/>
                                Suitable for:
                                <ul style={{ marginLeft: "15px" }}>
                                    <li>Designers</li>
                                    <li>Teachers and students</li>
                                    <li>Engineers and architects</li>
                                    <li>Anyone who thinks in images</li>
                                </ul>
                                <br/>
                                <Button type="warning" text="Try Dropt" onClick={() => navigate("workspace")} />
                            </p>
                        </div>
                        <div className={`${style.mainSection_image} ${style.sectionBlock}`}>
                            <img src={main_image} alt="main_image" />
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.section}>
                <div className='container'>
                    <div className={style.whatcanSection_content}>
                        <h2>What can Dropt do?</h2>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
};

export default MainPage;
import React from 'react';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import style from './MainPage.module.css';
import logo from '../../../public/logo_black.svg'
import WhiteCursor from "../../img/white_cursor.svg?react";
import Button from '../../components/ui/Button/Button';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className={style.page}>
            <div className={style.main}>
                <div className="container">
                    <div className={style.content}>
                        <div className={style.logo}>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className={style.description}>
                            simple graphic editor with many elements
                        </div>
                        <div className={style.tryButton}>
                            <Button text="Go to dropt" type='warning' icon={WhiteCursor} onClick={() => navigate("workspace")} />
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </div>
        </>
    )
};

export default MainPage;
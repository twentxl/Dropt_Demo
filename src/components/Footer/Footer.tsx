import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.footerContainer}>
                <ul className={style.footerList}>
                    <li>
                        <a href='#'>About us</a>
                    </li>
                    <li>
                        <a href='#'>Documentation</a>
                    </li>
                    <li>
                        <a href='#'>Support</a>
                    </li>
                    <li>
                        <a href="https://github.com/twentxl/Dropt_Demo" target="_blank">GitHub</a>
                    </li>
                    <li>
                        <span style={{ color: '#8e8e8e' }}>&copy; 2025 TwentX</span>
                    </li>
                </ul>
            </div>
        </footer>
    )
};

export default Footer;
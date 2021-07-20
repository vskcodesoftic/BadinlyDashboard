import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const Footer = () => {
    let {d, n} = '';
    const {t} = useTranslation();
    const SysDate = () => {
        d = new Date();
        n = d.getFullYear();
        return n;
    };
    useEffect(() => {
        SysDate();
    }, []);

    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>{t('footer.version')}</b>
                <b> </b>
                <span>
                    <i
                        className="nav-icon  fas fa-heart"
                        style={{color: 'red'}}
                    />
                    Kuwait
                </span>
            </div>
            <strong>
                <span>
                    Copyright © 2020-
                    {SysDate()}
                </span>
                <a
                    href="http://adminlte.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {process.env.PROJECT_TITLE}
                </a>
                <span>.</span>
            </strong>
            <span> </span>
            <span>{t('footer.copyright')}</span>
        </footer>
    );
};

export default Footer;

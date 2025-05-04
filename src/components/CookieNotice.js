import React from "react";
import { useLocation } from "@reach/router" // this helps tracking the location
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import { useState } from "react";
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import SimpleModal from "./SimpleModal";
import { Link } from "gatsby";

const CookieNotice = () => {

    const cookieCategories = [
        {
            title: "Necessary",
            cookies: [],
            description: "Necessary cookies ensure basic functionality of the website, such as navigation and secure areas. Without these cookies, the website cannot function properly and cannot be disabled."
        },
        {
            title: "Statistics",
            cookies: ['gatsby-gdpr-google-analytics', 'gatsby-gdpr-google-tagmanager', 'gatsby-gdpr-facebook-pixel','gatsby-gdpr-tiktok-pixel'],
            description: "Statistic cookies help us understand how visitors interact with the website. They collect and report data anonymously."
        },
        {
            title: "Marketing",
            cookies: [],
            description: "Marketing cookies are used to track visitors across websites. The goal is to show relevant advertisements based on user interests, which is also beneficial for third-party advertisers."
        }
    ];

    const allCookies = cookieCategories.map(category => category.cookies).flat();

    const [checkedState, setCheckedState] = useState(
        new Array(cookieCategories.length).fill(false)
    );
    const updatedCheckedState = checkedState.map((item) => item);
    const handleOnChange = (position) => {
        updatedCheckedState[position] = !updatedCheckedState[position];
        setCheckedState([...updatedCheckedState]);
    }

    // Set cookies for all selected optional categories
    const initializeCookies = () => {
        cookieCategories.forEach((item, index) =>
            item.cookies.map(cookie => Cookies.set(cookie, updatedCheckedState[index]))
        );
        initializeAndTrack(location);
        setShow(false);
        setBannerVisible("hidden");
    }

    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(true);
    };

    const [bannerVisible, setBannerVisible] = useState("byCookieValue");

    // Disable cookie banner on /landing/* routes
    if (location.pathname.startsWith("/landing/")) {
        return null;
    }

    return (
        <div>

            {/* Optional cookies modal */}
            <SimpleModal show={show} setShow={setShow}>
                <div className="columns" style={{ height: "100%", borderRadius: "40px" }}>
                    <div className="column has-background-info is-10 is-offset-1 p-6 has-text-white ">
                        {cookieCategories.map((category, index) =>
                            <div className="mb-4" key={index}>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        id={`category-${index}`}
                                        name={category.title}
                                        value={category.title}
                                        checked={index === 0 ? true : checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <span className="switch" />
                                    <p className="is-family-secondary is-size-5 has-text-weight-bold pl-6">{category.title}</p>
                                </label>
                                <p className="is-size-6 pl-6">{category.description}</p>
                            </div>
                        )}

                        <div className="columns has-text-centered mt-3">
                            <div className="column">
                                <button
                                    className="button is-warning is-medium mt-3 is-family-secondary has-text-weight-bold"
                                    onClick={() => initializeCookies()}
                                >
                                    Save preferences
                                </button>
                            </div>
                            <div className="column">
                                <button
                                    className="button is-link is-medium mt-3 is-family-secondary has-text-weight-bold"
                                    onClick={() => {
                                        allCookies.map(cookie => Cookies.set(cookie, true));
                                        initializeAndTrack(location);
                                        setShow(false);
                                        setBannerVisible("hidden");
                                    }}
                                >
                                    Accept all
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </SimpleModal>

            {/* Cookie Consent Banner */}
            <CookieConsent
                disableStyles={true}
                visible={bannerVisible}
                location="bottom"
                buttonText="Give me cookies"
                cookieName="gatsby-gdpr-google-analytics"
                expires={150}
                onAccept={() => {
                    allCookies.map(cookie => Cookies.set(cookie, true));
                    initializeAndTrack(location);
                    setBannerVisible("hidden");
                }}
                containerClasses="cookie-container"
                buttonClasses="button is-success is-large mt-3"
                buttonWrapperClasses="cookie-button-wrapper"
                contentClasses="cookie-content"
            >
                <p className="is-family-secondary has-text-weight-bold mb-4">We use <Link className="has-text-success" style={{textDecoration:'underline'}} to="/policy">cookies</Link> to improve your experience</p>
                <button className="cookie-customize is-size-6" onClick={() => handleClick()}>Customize cookies</button>
            </CookieConsent>
        </div>
    )
}

export default CookieNotice;

import React, { useState } from 'react';
import './help.css';  
import LandingLayoutPage from '../../Components/LandingPageLayout';
 
const helpVideosData = [ 
    {"id":1, "thumbnailUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/photos/part-2-thumbnail.jpeg", "videoUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/videos/Employability_Advantage_Part_2_Connecting_Tech_and_Smart_Skills.mp4", "title":"Employability Advantage Part 2 Connecting Tech and Smart Skills", "description":"In this video we look at how you can bridge your skill gaps by connecting Tech and Smart Skills to LinkedIn Learning.", "priority":2},
    {"id":2, "thumbnailUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/photos/part-3A-thumbnail.jpeg", "videoUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/videos/Employability_Advantage_Part_3A_AI_Resume_Tool.mp4", "title":"Employability Advantage Part 3A AI Resume Tool", "description":"In this Video we look at the amazing AI Features of the resume tool. Learn how to get started with building your resume using a number of AI features.", "priority":3},
    {"id":7, "thumbnailUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/photos/part-3B-thumbnail.jpeg", "videoUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/videos/Employability_Advantage_Part_3B_AI_Resume_Tool.mp4", "title":"Employability Advantage Part 3B AI Resume Tool", "description":"In this video, a follow on from Part 3A, we explore how to use the Artificial Intelligence targeting feature. It is always best to prepare your resume for the job you're after. Using the awesome AI driven resume features, see how you can target your resume plus build AI driven cover letters and more.", "priority":4},
    {"id":3, "thumbnailUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/photos/part-4-thumbnail.jpeg", "videoUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/videos/Employability_Advantage_Part_4_Interview_Simulation.mp4", "title":"Employability Advantage Part 4 Interview Simulation", "description":"In this video explore Interview Simulation across over 120 Job roles. Practice makes perfect, so use this amazing Interview Simulator to polish how you sell yourself", "priority":5},
    {"id":4, "thumbnailUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/photos/part-1-thumbnail.jpeg", "videoUrl":"https://uploadmlj.pieinfosystems.com/upload/eca/videos/How_to_Get_Started_with_Employability_Advantage-Part_1.mp4", "title":"How to Get Started with Employability Advantage - Part 1", "description":"Learn how to Get Started with Employability Advantage and how to complete a Diagnostic Assessment for your career choice.", "priority":1},
];

const VIDEOS_TO_SHOW_INITIALLY = 4;

const HelpVideos = () => {
    // State Hooks
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [videosToShow, setVideosToShow] = useState(VIDEOS_TO_SHOW_INITIALLY);

    // Set initial video details on mount
    const activeVideo = helpVideosData[activeVideoIndex];

    // Handlers
    const handleVideoClick = (index) => {
        setActiveVideoIndex(index);
        setShowDescription(false); // Reset description view
        window.scrollTo(0, 0); // Scroll to top on video change
    };

    const handleShowMore = () => {
        setVideosToShow(helpVideosData.length);
    };

    const handleShowLess = () => {
        setVideosToShow(VIDEOS_TO_SHOW_INITIALLY);
        window.scrollTo(0, 0); // Scroll to top on show less
    };

    // Component for the Video Sidebar List
    const VideoSidebar = ({ video, index }) => (
        <div 
            className={`video-sidebar-item ${index === activeVideoIndex ? 'active' : ''}`}
            onClick={() => handleVideoClick(index)}
        >
            <div className="video-thumb">
                <img src={video.thumbnailUrl} alt="Thumbnail" />
            </div>
            <div className="video-info">
                <div className="video-title-text">{video.title}</div>
                <div className="video-desc-text">{video.description}</div>
            </div>
        </div>
    );

    // Component for the Mobile Menu
    const MobileMenu = () => (
        <div className={`mobile-menu ${showMenu ? 'open' : ''}`}>
            <div className="menu-header">
                <i className="fas fa-times" onClick={() => setShowMenu(false)}></i>
            </div>
            <ul className="menu-list">
                <li onClick={() => window.location.href='/home'}>Home</li>
                <li onClick={() => console.log('Open Profile Modal')}>Profile</li>
                <li onClick={() => window.location.href='/help'}>Help</li>
                <li onClick={() => window.location.href='/logout'}>Logout</li>
            </ul>
        </div>
    );

    return (
        <LandingLayoutPage> 
        <div className="help-videos-page">
            <MobileMenu />


            <main className="content-container">
            <section className="main-video-section">
                <header className="page-header">
                    {/* <img className='logo-image' src='/ECAIcon.png' width={"25px"} height={"25px"} /> */}
                    <div className="logo-text">Employability Advantage</div> 
                </header>
                <div className="video-player-container">
                    <video 
                        id="actualVideo" 
                        controls 
                        key={activeVideo.videoUrl} // Key forces video reload
                        poster={activeVideo.thumbnailUrl}
                    >
                        <source src={activeVideo.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="video-description-area">
                    <h1 className="main-video-title">{activeVideo.title}</h1>
                    <div className="description-toggle" onClick={() => setShowDescription(!showDescription)}>
                        <span>
                            {showDescription ? 'Show less' : 'Read description'}  
                        </span>
                    </div>
                    {showDescription && (
                        <p className="full-description">
                            {activeVideo.description}
                            <br/><br/>  
                            <div className="report-issue-btn">
                                Report an Issue
                            </div>
                        </p>
                    )}
                </div>
                </section>

                <aside className="other-videos-sidebar">
                    <div className="sidebar-heading">Videos</div>
                    <div className="videos-list">
                        {helpVideosData.slice(0, videosToShow).map((video, index) => (
                            <VideoSidebar key={video.id} video={video} index={index} />
                        ))}
                    </div>

                    {/* Show More/Less Logic */}
                    {helpVideosData.length > VIDEOS_TO_SHOW_INITIALLY && (
                        <div className="show-more-less-container">
                            {videosToShow < helpVideosData.length ? (
                                <div className="show-more" onClick={handleShowMore}>
                                    Show More 
                                </div>
                            ) : (
                                <div className="show-less" onClick={handleShowLess}>
                                    Show Less  
                                </div>
                            )}
                        </div>
                    )}
                </aside>
            </main>
        </div>
        </LandingLayoutPage>
    );
};

export default HelpVideos;
import React, { useState } from 'react';
 
const ProfilePage = () => {
  const profile = {
    name: "Priya Sharma",
    title: "Mathematics Professor",
    bio: "Experienced educator with over 10 years of teaching advanced math. Dedicated to inspiring students through interactive learning and analytical thinking.",
    imageUrl: "https://i.pravatar.cc/150?img=20",
    stats: [
      { count: "24", label: "Courses" },
      { count: "300+", label: "Students" },
      { count: "10", label: "Years Exp." },
    ]
  };

  const [message, setMessage] = useState('');

  const handleButtonClick = (action) => {
    setMessage(`Action taken: ${action}`);
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <>
      <style>
        {` 
          .app-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center; 
            color: #fff;
            padding: 16px;
            font-family: 'Inter', sans-serif;
            position: relative;
            overflow: scroll;
          }
 
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
 
          .profile-card {
            position: relative;
            width: 100%;
            max-width: 360px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            z-index: 1;
            animation: float 6s ease-in-out infinite;
          }
 
          .profile-banner {
            height: 100px;
            background: #ff9800; 
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
 
          .profile-img {
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            border: 5px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
          }

          .profile-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
 
          .profile-content {
            padding: 80px 20px 30px;
            text-align: center;
            color: #fff;
          }

          .name {
            font-size: 1.6rem;
            font-weight: 600;
          }

          .title {
            font-size: 1rem;
            color: #D1C4FF;
            margin-top: 4px;
            margin-bottom: 12px;
          }

          .bio {
            font-size: 0.9rem;
            color: #EDEAFF;
            line-height: 1.5;
            margin-bottom: 25px;
          }
 
          .stats {
            display: flex;
            justify-content: space-around;
            text-align: center;
            margin-bottom: 25px;
          }

          .stats div h3 {
            font-size: 1.4rem;
            color: #fff;
            font-weight: 700;
          }

          .stats div p {
            font-size: 0.85rem;
            color: #CFC9FF;
          }
 
          .buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
          }

          .btn {
            padding: 10px 22px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
          }

          .btn.primary {
            background: #ff9800;
            color: #fff;
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
          }

          .btn.outline {
            background: transparent;
            color: #ff9800;
            border: 1px solid #ff9800;
          }

          .btn:hover {
            transform: translateY(-2px);
            opacity: 0.9;
          }
 
          .message-box {
            position: absolute;
            top: 32px;
            background: #fff;
            color: #4f46e5;
            padding: 12px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 50;
            transition: opacity 0.3s ease;
          }
        `}
      </style>
 
      <div className="app-container">
 
        {message && (
          <div className="message-box">
            {message}
          </div>
        )}
 
        <div className="profile-card"> 
          <div className="profile-banner"></div> 
          <div className="profile-img">
            <img 
              src={profile.imageUrl} 
              alt={`${profile.name} Photo`} 
            />
          </div>
 
          <div className="profile-content">
            <h2 className="name">{profile.name}</h2>
            
            <p className="title">{profile.title}</p>
            
            <p className="bio">
              {profile.bio}
            </p>
 
            <div className="stats">
              {profile.stats.map((stat, index) => (
                <div key={index}>
                  <h3>{stat.count}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
 
            <div className="buttons">
              <button 
                onClick={() => handleButtonClick('Schedule')}
                className="btn primary"
              >
                View Schedule
              </button>
              <button 
                onClick={() => handleButtonClick('Message')}
                className="btn outline"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

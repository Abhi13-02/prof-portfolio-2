// components/FormContent.jsx
import React from 'react';
import BasicDetails from './BasicDetails';
import { useUser } from '../../Provider';
import { BlogSection } from './addSections/blogs/blogSection';
import { OpinionSection } from './addSections/opinions/opinionSection';
import { MeetingRequestsSection } from './addSections/meetingRequests/meetingRequestsSection';
// import { TeachingExperienceSection } from '@/app/admin/components/addSections/teachingExperiences/TeachingExperienceSection';
import { StudentSection } from './addSections/students/studentSection';
import { PhotoSection } from './addSections/photos/photoSection';
import { VideoSection } from './addSections/videos/videoSection';
// import ProjectSection from '@/app/admin/components/addSections/Project/ProjectSection';
import ResearchPaperSection from '@/app/admin/components/addSections/ResearchPapers/researchPaperSection';
import { ConferenceSection } from '@/app/admin/components/addSections/conferances/conferanceSection';
// import { AchievementsSection } from './addSections/achievements/achievementSection';
import { AwardSection } from '@/app/admin/components/addSections/awards/awardSection';
// import { CollaborationSection } from '@/app/admin/components/addSections/collaborations/collaborationSection';

const FormContent = () => {
  const { userData }= useUser();
  // console.log(userData);
  const userInfo = userData?.user;
  if (!userInfo) {
    return (
      <div className="card w-full max-w-3xl mx-auto bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-base mb-4 text-base-content/80">
            Personal Information
          </h2>
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 overflow-auto">
      <div className="space-y-8">
        <section id="basic-details">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <BasicDetails userInfo={userInfo} />
        </section>
        {/* <div className="divider"></div>
        <ProjectSection /> */}
        <div className="divider"></div>
        <section id="research-papers">
          <ResearchPaperSection />
        </section>
        <div className="divider"></div>
        <section id="conferences">
          <ConferenceSection />
        </section>
        <div className="divider"></div>
        <section id="awards">
          <AwardSection />
        </section>
        <div className="divider"></div>
        {/* <TeachingExperienceSection /> */}
        {/* <div className="divider"></div> */}
        <section id="blogs">
          <BlogSection />
        </section>
        <div className="divider"></div>
        <section id="opinions">
          <OpinionSection />
        </section>
        <div className="divider"></div>
        <section id="meeting-requests">
          <MeetingRequestsSection />
        </section>
        <div className="divider"></div>
        <section id="students">
          <StudentSection />
        </section>
        <div className="divider"></div>
        <section id="photos">
          <PhotoSection />
        </section>
        <div className="divider"></div>
        <section id="videos">
          <VideoSection />
        </section>
        {/* <div className="divider"></div>
        <AchievementsSection /> */}
        {/* <div className="divider"></div>
        <CollaborationSection />
        <div className="divider"></div> */}
      </div>
    </div>
  );
};

export default FormContent;

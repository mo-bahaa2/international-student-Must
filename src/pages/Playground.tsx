import AcademicStaffProfileCard, { academicStaffProfileCardMock } from '../components/AcademicStaffProfileCard';
import EventsNewsSection from '../components/EventsNewsCarousels';
import { mockNews, mockRelatedEvents } from '../components/eventsNewsMockData';
import NewStudyPlanResources from '../components/NewStudyPlanResources';
import { postgradStudyPlanConfig, undergradStudyPlanConfig } from '../components/newStudyPlanResourcesMockData';
import ResourcesComponent from '../components/ResourcesComponent';
import { mockGenericReources } from '../components/genericResourcesMockData';

export default function Playground() {
  return (
    <div className="w-full bg-[#070d19] pb-16">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-8 lg:px-10">
        <h1 className="mb-6 text-center text-3xl font-bold text-emerald-400 sm:text-left">UI Playground</h1>
        <p className="mb-8 text-center text-slate-300 sm:text-left">
          Temporary preview zone for static components that are not rendered through dynamic CMS pages.
        </p>

        <AcademicStaffProfileCard {...academicStaffProfileCardMock} />
      </section>

      <div className="mt-12">
        <EventsNewsSection events={mockRelatedEvents} news={mockNews} />
      </div>

      <section className="mt-12 bg-white py-12">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-slate-900 sm:text-left"> Temporary preview for testing</h2>
          <div className="space-y-8">
            <NewStudyPlanResources config={undergradStudyPlanConfig} />
            <NewStudyPlanResources config={postgradStudyPlanConfig} />
            <ResourcesComponent config={mockGenericReources} />
          </div>
        </div>
      </section>
    </div>
  );
}

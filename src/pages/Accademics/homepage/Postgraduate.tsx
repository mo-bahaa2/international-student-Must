import { useEffect, useState } from 'react';
import NewStudyPlanResources from '../../../components/NewStudyPlanResources';
import { postgradStudyPlanConfig } from '../../../components/newStudyPlanResourcesMockData';
import { getFileUrl, getManyFileLinks, getStudyPlansRow } from '../../../services/cmsApi';

export default function Postgraduate() {
  const [config, setConfig] = useState<any>(postgradStudyPlanConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const attrs = await getStudyPlansRow();

        const makeEntry = (field: unknown, id: string, title: string) =>
          field ? [{ id, title, url: getFileUrl(field) }] : [];

        const diplomaLinks = [
          ...getManyFileLinks(attrs.diploma_big_data, 'diploma-bigdata').map((r) => ({ ...r, title: r.title || 'Diploma – Big Data' })),
          ...getManyFileLinks(attrs.diploma_applied_ai, 'diploma-ai').map((r) => ({ ...r, title: r.title || 'Diploma – Applied AI' })),
          ...getManyFileLinks(attrs.diploma_business_intelligence, 'diploma-bi').map((r) => ({ ...r, title: r.title || 'Diploma – Business Intelligence' })),
        ];

        setConfig({
          mode: 'degree-tracks',
          title: 'Study Plans',
          tracks: {
            msc: {
              type: 'research', label: 'M. SC',
              resourcesBySpecialty: {
                CS: [
                  ...makeEntry(attrs.master_cs_old_curriculum, 'pg-msc-cs-old', 'MSc CS – Old Curriculum'),
                  ...makeEntry(attrs.master_cs_new_curriculum, 'pg-msc-cs-new', 'MSc CS – New Curriculum'),
                ],
                IS: [
                  ...makeEntry(attrs.master_is_old_curriculum, 'pg-msc-is-old', 'MSc IS – Old Curriculum'),
                  ...makeEntry(attrs.master_is_new_curriculum, 'pg-msc-is-new', 'MSc IS – New Curriculum'),
                  ...makeEntry(attrs.master_ai_old_curriculum, 'pg-msc-ai-old', 'MSc AI – Old Curriculum'),
                  ...makeEntry(attrs.master_ai_new_curriculum, 'pg-msc-ai-new', 'MSc AI – New Curriculum'),
                ],
              },
            },
            phd: {
              type: 'research', label: 'PH.D',
              resourcesBySpecialty: {
                CS: [
                  ...makeEntry(attrs.phd_cs_old_curriculum, 'pg-phd-cs-old', 'PhD CS – Old Curriculum'),
                  ...makeEntry(attrs.phd_cs_new_curriculum, 'pg-phd-cs-new', 'PhD CS – New Curriculum'),
                ],
                IS: [
                  ...makeEntry(attrs.phd_is_old_curriculum, 'pg-phd-is-old', 'PhD IS – Old Curriculum'),
                  ...makeEntry(attrs.phd_is_new_curriculum, 'pg-phd-is-new', 'PhD IS – New Curriculum'),
                  ...makeEntry(attrs.phd_ai_old_curriculum, 'pg-phd-ai-old', 'PhD AI – Old Curriculum'),
                  ...makeEntry(attrs.phd_ai_new_curriculum, 'pg-phd-ai-new', 'PhD AI – New Curriculum'),
                ],
              },
            },
            professional: {
              type: 'professional', label: 'Professional Degrees',
              resources: diplomaLinks,
            },
          },
        });
      } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };

    void fetchPlans();
  }, []);

  return (
    <div className="py-24 bg-white min-h-screen dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">Postgraduate Programs</h1>
        {isLoading ? <div className="animate-pulse text-emerald-600 dark:text-emerald-400">Loading Plans...</div> : <NewStudyPlanResources config={config} />}
      </div>
    </div>
  );
}

// ---  Real Components ---
import MessageAnalyticsCard from './MessageAnalyticsCard';
import BusinessNumbers from './BusinessNumbers';
import RunCampaign from './RunCampaign';
import CreateTemplates from './CreateTemplates';
import GraphVisuals from './GraphVisuals';
import CalendarCard from './Calendar';
import TopSendersCard from './TopSenderCard';
import TopTemplatesCard from './TopTemplatesCard';

const DashBoard = () => {
    return (
        <div className="min-h-screen px-6 bg-slate-100 p-2 ">
            <div className="transform scale-[0.85] origin-top-left w-[118%]">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">A flexible layout for your components.</p>
                </header>

                {/* Top Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-6 col-span-1">
                        <MessageAnalyticsCard />
                        <RunCampaign />
                    </div>
                    <div className="flex flex-col gap-6 col-span-1">
                        <BusinessNumbers />
                        <CreateTemplates />
                    </div>
                    <div className="lg:col-span-2 p- borde rounded-lg bg-white shadow-sm min-h-[340px]">
                        <GraphVisuals />
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr_1.3fr] gap-6 mt-6">
                    <div className="p- borde rounded-lg bg-white shadow-sm min-h-[260px]">
                        <TopSendersCard />
                    </div>

                    <div className="p- borde rounded-lg bg-white shadow-sm min-h-[260px]">
                        <TopTemplatesCard />
                    </div>

                    <div className="flex  borde rounded-lg bg-white shadow-sm min-h-[260px]">
                        <CalendarCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;

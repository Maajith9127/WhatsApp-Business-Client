import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchTemplates, setTemplateFilter } from '../../../ReduxStates/slices/templateStatsSlice'; // Adjust path if needed
import { fetchTemplates,setTemplateFilter } from '../../ReduxStates/slices/templateStatsSlice';
import TemplateStatsTable from './TemplateStatsTable';
import { IoAddCircleOutline, IoRefresh } from 'react-icons/io5'; // Icons for actions
import { useNavigate } from 'react-router-dom'; // Add this at top

const TemplateStats = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items, loading, error, filterStatus } = useSelector((state) => state.templateStats);

  const handleFilterChange = (status) => {
    dispatch(setTemplateFilter(status));
  };

  // The refresh logic is already in your useEffect, but a manual button is good UX
  const handleRefresh = () => {
    dispatch(fetchTemplates(filterStatus));
  };

  useEffect(() => {
    dispatch(fetchTemplates(filterStatus));
  }, [filterStatus, dispatch]);

  const filterButtons = ['all', 'approved', 'pending', 'rejected'];

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* --- Page Header --- */}
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Template Management
            </h1>
            <p className="text-gray-600 mt-2 text-md">
              Submit, track, and manage all your message templates.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/message-analytics/template-stats/template-submit')} //Now navigates to TemplateBuilder
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-black rounded-3xl text-white font-semibold py-2 px-4  shadow-md hover:bg-gray-700 transition-all duration-200"
          >
            <IoAddCircleOutline size={20} />
            Submit New Template
          </button>
        </header>

        {/* --- Filter and Controls Bar --- */}
        <div className="bg-white bord rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Filter Buttons Group */}
            <div className="flex items-center gap-2">
              {filterButtons.map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className={`px-3 py-1.5 text-sm rounded-3xl transition-all font-semibold capitalize ${filterStatus === status
                    ? 'bg-black rounded-3xl text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50"
            >
              <IoRefresh className={`${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-sm">Error: {error}</p>}
        </div>

        {/* --- Template Stats Table --- */}
        <TemplateStatsTable templates={items} isLoading={loading} />
      </div>
    </div>
  );
};

export default TemplateStats;
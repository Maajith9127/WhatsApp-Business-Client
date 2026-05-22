// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { fetchInvoices, setFilter } from '../../../ReduxStates/slices/invoiceSlice'; 
// import { fetchInvoices, setFilter } from '../../ReduxStates/slices/invoiceSlice'

// import InvoiceTable from './InvoiceTable';
// import { IoPaperPlaneOutline, IoRefresh } from 'react-icons/io5'; // Icons for actions

// const Invoices = () => {
//   const dispatch = useDispatch();
//   // Select state from the Redux store
//   const { items, loading, error, filterSettings } = useSelector((state) => state.invoices);

//   // Handlers to dispatch actions
//   const handleFilterChange = (status) => {
//     dispatch(setFilter(status));
//   };

//   const handleFetchInvoices = () => {
//     dispatch(fetchInvoices(filterSettings));
//   };

//   // Fetch invoices automatically when the component loads or filter changes
//   useEffect(() => {
//     dispatch(fetchInvoices(filterSettings));
//   }, [filterSettings, dispatch]);

//   const filterButtons = ['all', 'sent', 'pending', 'failed'];

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* --- Page Header --- */}
//         <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
//               Invoice History
//             </h1>
//             <p className="text-gray-600 mt-2 text-md">
//               Browse, filter, and manage all sent invoices.
//             </p>
//           </div>
//           <button
//             // onClick={() => navigate('/send-invoice')} // Add navigation logic here
//             className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
//           >
//             <IoPaperPlaneOutline size={18} />
//             Send New Invoice
//           </button>
//         </header>

//         {/* --- Filter and Controls Bar --- */}
//         <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
//           <div className="flex flex-wrap items-center justify-between gap-4">

//             {/* Filter Buttons Group */}
//             <div className="flex items-center gap-2">
//               {filterButtons.map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => handleFilterChange(status)}
//                   className={`px-3 py-1.5 text-sm rounded-lg transition-all font-semibold capitalize ${filterSettings.status === status
//                       ? 'bg-indigo-600 text-white shadow-sm'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                 >
//                   {status}
//                 </button>
//               ))}
//             </div>

//             {/* Refresh Button */}
//             <button
//               onClick={handleFetchInvoices}
//               disabled={loading}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50"
//             >
//               <IoRefresh className={`${loading ? 'animate-spin' : ''}`} />
//               {loading ? 'Refreshing...' : 'Refresh'}
//             </button>

//           </div>
//           {error && <p className="text-red-500 mt-4 text-sm">Error: {error}</p>}
//         </div>

//         {/* --- Invoice Table --- */}
//         <InvoiceTable invoices={items} isLoading={loading} />
//       </div>
//     </div>
//   );
// };

// export default Invoices;




import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices, setFilter } from '../../ReduxStates/slices/invoiceSlice';

import InvoiceTable from './InvoiceTable';
import { IoPaperPlaneOutline, IoRefresh } from 'react-icons/io5';

const Invoices = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filterSettings } = useSelector((state) => state.invoices);

  const handleFilterChange = (status) => {
    dispatch(setFilter(status));
  };

  const handleFetchInvoices = () => {
    dispatch(fetchInvoices(filterSettings));
  };

  useEffect(() => {
    dispatch(fetchInvoices(filterSettings));
  }, [filterSettings, dispatch]);

  const filterButtons = ['all', 'sent', 'pending', 'failed'];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* --- Page Header --- */}
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Invoice History
            </h1>
            <p className="text-gray-600 mt-2 text-md">
              Browse, filter, and manage all sent invoices.
            </p>
          </div>
          <button
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-black text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-900 transition-all duration-200"
          >
            <IoPaperPlaneOutline size={18} />
            Send New Invoice
          </button>
        </header>

        {/* --- Filter and Controls Bar --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Filter Buttons Group */}
            <div className="flex items-center gap-2 flex-wrap">
              {filterButtons.map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className={`px-4 py-1.5 text-sm rounded-full font-medium capitalize border transition-all duration-200
                    ${filterSettings.status === status
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleFetchInvoices}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-800 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
            >
              <IoRefresh className={`${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>

          </div>
          {error && <p className="text-red-500 mt-4 text-sm">Error: {error}</p>}
        </div>

        {/* --- Invoice Table --- */}
        <InvoiceTable invoices={items} isLoading={loading} />
      </div>
    </div>
  );
};

export default Invoices;

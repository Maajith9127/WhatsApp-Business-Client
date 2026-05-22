// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // Using a new set of filled, professional icons
// import {
//   IoReceipt,
//   IoBarChart,
//   IoPeople,
//   IoApps,
//   IoArrowForward
// } from 'react-icons/io5';

// const MessageAnalytics = () => {
//   const navigate = useNavigate();

//   const goTo = (title) => () => {
//     navigate(`/dashboard/message-analytics/${title.toLowerCase().replace(/\s+/g, '-')}`);
//   };

//   // Sections array updated for the new design
//   const sections = [
//     {
//       icon: <IoReceipt size={24} />,
//       title: 'Invoices',
//       desc: 'Access and review all customer invoices and their delivery status.',
//       color: 'blue'
//     },
//     {
//       icon: <IoBarChart size={24} />,
//       title: 'Campaign Stats',
//       desc: 'Track delivery, read rates, and engagement for all campaigns.',
//       color: 'teal'
//     },
//     {
//       icon: <IoPeople size={24} />,
//       title: 'Customer Stats',
//       desc: 'Analyze audience response rates and overall engagement patterns.',
//       color: 'purple'
//     },
//     {
//       icon: <IoApps size={24} />,
//       title: 'Template Stats',
//       desc: 'Monitor the performance and approval status of each message template.',
//       color: 'amber'
//     }
//   ];

//   // Helper for dynamic color classes
//   const colorClasses = {
//     blue: { bg: 'bg-blue-100', text: 'text-blue-600', shadow: 'hover:shadow-blue-500/20' },
//     teal: { bg: 'bg-teal-100', text: 'text-teal-600', shadow: 'hover:shadow-teal-500/20' },
//     purple: { bg: 'bg-purple-100', text: 'text-purple-600', shadow: 'hover:shadow-purple-500/20' },
//     amber: { bg: 'bg-amber-100', text: 'text-amber-600', shadow: 'hover:shadow-amber-500/20' },
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
//           <p className="text-gray-600 mt-2">A detailed breakdown of your messaging performance.</p>
//         </div>

//         {/* Responsive Grid for Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
//           {sections.map(({ icon, title, desc, color }, i) => (
//             <div
//               key={i}
//               onClick={goTo(title)}
//               // The 'group' class allows us to style child elements on hover
//               className={`group bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colorClasses[color].shadow} cursor-pointer`}
//             >
//               <div>
//                 {/* Icon and Title */}
//                 <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-5 ${colorClasses[color].bg} ${colorClasses[color].text}`}>
//                   {icon}
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-2">
//                   {title}
//                 </h2>
//                 <p className="text-gray-600 leading-relaxed">
//                   {desc}
//                 </p>
//               </div>

//               {/* Action Link at the bottom */}
//               <div className="mt-6 font-semibold text-indigo-600 flex items-center gap-2">
//                 View Details
//                 <IoArrowForward className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-1" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageAnalytics;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoReceipt, IoBarChart, IoPeople, IoApps, IoChevronDownOutline } from 'react-icons/io5';

const MessageAnalytics = () => {
  const navigate = useNavigate();

  const goTo = (title) => () => {
    navigate(`/dashboard/message-analytics/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const sections = [
    {
      icon: <IoReceipt size={40} />,
      title: 'Invoices',
      desc: 'Access and review all customer invoices and their delivery status.',
      color: 'gray',
    },
    {
      icon: <IoBarChart size={40} />,
      title: 'Campaign Stats',
      desc: 'Track delivery, read rates, and engagement for all campaigns.',
      color: 'gray',
    },
    {
      icon: <IoPeople size={40} />,
      title: 'Customer Stats',
      desc: 'Analyze audience response rates and overall engagement patterns.',
      color: 'gray',
    },
    {
      icon: <IoApps size={40} />,
      title: 'Template Stats',
      desc: 'Monitor the performance and approval status of each message template.',
      color: 'gray',
    },
  ];

  return (
    <div className="min-h-screen px-6 bg-slate-100 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">A detailed breakdown of your messaging performance.</p>
        </header>

        {/* Responsive Grid for Cards */}
        <div className="flex flex-col gap-6">
          {sections.map(({ icon, title, desc, color }, i) => (
            <div
              key={i}
              onClick={goTo(title)}
              className="bg-white shadow rounded-3xl  p-10 border border-gray-200 w-full cursor-pointer transition-all duration-300 hover:shadow-lg "
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                {/* Icon */}
                <div className="bg-gray-300 p-3 rounded-full">
                  {icon}
                </div>

                {/* Report button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/message-analytics/${title.toLowerCase().replace(/\s+/g, '-')}`);
                  }}
                  className="flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  Report <IoChevronDownOutline size={40} />
                </button>
              </div>

              {/* Text */}
              <p className="text-gray-500 text mb-1">{desc}</p>

              {/* Title */}
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">{title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageAnalytics;
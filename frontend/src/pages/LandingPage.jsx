// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 text-center p-4">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome to Vaccine Tracker</h1>
      
//       <div className="space-y-4 w-full max-w-xs">
//         <Link to="/parent-login">
//           <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
//             👪 Parent Login
//           </button>
//         </Link>
//         <Link to="/parent-signup">
//           <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
//             ✍️ Parent Signup
//           </button>
//         </Link>
//         <Link to="/doctor-auth">
//           <button className="w-full bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700">
//             🩺 Doctor Login
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-8">
      {/* Logo and Title Section */}
      <div className="text-center mb-12"> {/* Increased bottom margin */}
        <div className="mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Suraksha Vax</h1>
        <p className="text-xl text-blue-600">Vaccine Management System</p>
      </div>

      {/* Auth Buttons */}
      <div className="w-full max-w-sm space-y-6"> {/* Increased vertical spacing */}
        <Link 
          to="/parent-login" 
          className="block w-full"
        >
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]">
            👪 Parent Login
          </button>
        </Link>

        <Link 
          to="/parent-signup" 
          className="block w-full"
        >
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]">
            ✍️ Parent Signup
          </button>
        </Link>

        <Link 
          to="/doctor-auth" 
          className="block w-full"
        >
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]">
            🩺 Doctor Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

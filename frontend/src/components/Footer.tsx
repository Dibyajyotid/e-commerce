// export default function Footer() {
//   return (
//     <footer className="border-t border-gray-800 py-12 bg-gray-900/50">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-4">
//               FreshJuice
//             </div>
//             <p className="text-gray-400 mb-4">
//               Fresh juices delivered fast from local vendors you trust.
//             </p>
//             <div className="flex space-x-4">
//               <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
//                 <span className="text-sm">f</span>
//               </div>
//               <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
//                 <span className="text-sm">t</span>
//               </div>
//               <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
//                 <span className="text-sm">i</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-white mb-4">Company</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Careers
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Press
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Blog
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-white mb-4">Support</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Contact Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Safety
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Terms
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-white mb-4">Get the App</h3>
//             <div className="space-y-3">
//               <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer transition-colors">
//                 <div className="text-xs text-gray-400">Download on the</div>
//                 <div className="font-semibold">App Store</div>
//               </div>
//               <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer transition-colors">
//                 <div className="text-xs text-gray-400">Get it on</div>
//                 <div className="font-semibold">Google Play</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//           <p>&copy; 2025 FreshJuice. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-4">
              FreshJuice
            </div>
            <p className="text-gray-400 mb-4">
              Fresh juices delivered fast from local vendors you trust.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-sm">i</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Get the App</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FreshJuice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

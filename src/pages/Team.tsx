import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronLeft, ChevronRight, Users, User, Filter, ArrowLeft, X, ChevronDown } from 'lucide-react'; // Added ChevronDown back
import { Navigation } from '../components/Navigation';
import { TEAM_CONTENT } from '../constants/team';
import { AnimatedSection } from '../components/AnimatedSection';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Constants & Types ---
const ITEMS_PER_PAGE = 12;
type FilterType = 'all' | 'role' | 'specialty';
// Define Member type more explicitly for modal
type Member = typeof TEAM_CONTENT.departments[0]['members'][0] & { department?: string; role?: string };

// --- Helper Function ---
const getUniqueValues = (members: any[], key: string): string[] => {
    const values = members.map(member => member[key]).filter(Boolean);
    return Array.from(new Set(values)).sort();
};

export function Team() {
  // --- State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null); // Re-added state for modal

  // --- Memoized Data ---
  const allMembers = useMemo(() => TEAM_CONTENT.departments.flatMap(dept =>
    dept.members.map(member => ({ ...member, department: dept.name, role: member.title }))
  ), []);
  const uniqueRoles = useMemo(() => getUniqueValues(allMembers, 'role'), [allMembers]);
  const uniqueSpecialties = useMemo(() => getUniqueValues(allMembers, 'specialty'), [allMembers]);
  const filteredMembers = useMemo(() => {
    if (filterType === 'all' || !selectedFilterValue) return allMembers;
    const key = filterType === 'role' ? 'role' : 'specialty';
    return allMembers.filter(member => member[key as keyof typeof member] === selectedFilterValue);
  }, [allMembers, filterType, selectedFilterValue]);
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const currentMembers = useMemo(() => filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE
  ), [filteredMembers, currentPage]);

  // --- Effects ---
  useEffect(() => { setCurrentPage(1); }, [filterType, selectedFilterValue]);

  // --- Animation Variants ---
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { y: 20, opacity: 0, scale: 0.95 }, show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 180, damping: 15 } } };
  // Modal Variants (Re-added)
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)', y: 30 },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, transition: { type: "spring", damping: 25, stiffness: 250 } },
    exit: { opacity: 0, scale: 0.85, filter: 'blur(10px)', y: -30, transition: { duration: 0.2 } }
  };
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
  };

  // --- Event Handlers ---
  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    setSelectedFilterValue(null);
  };
  const handleFilterValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedFilterValue(event.target.value || null); };

  // --- Render ---
  return (
    <div className="min-h-screen text-gray-300">
      <Navigation isVisible={true} />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4">
           {/* Back Link - Points to /#content */}
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-8">
            <Link to="/#content" className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-cyan-300 border border-cyan-500/40 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" /> Back to Home
            </Link>
          </motion.div>

          <AnimatedSection>
            {/* Header */}
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400" style={{ textShadow: '0 0 15px theme(colors.cyan.500), 0 0 25px theme(colors.cyan.700)' }}>
                Our Amazing Team
              </motion.h1>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center mb-10 gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400"> <Filter size={16} className="text-cyan-400"/> Filter by: </div>
              <div className="flex flex-wrap justify-center gap-3">
                {(['all', 'role', 'specialty'] as FilterType[]).map((type) => (
                  <button key={type} onClick={() => handleFilterTypeChange(type)} className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${ filterType === type ? 'bg-cyan-500 text-black border-cyan-500 shadow-md shadow-cyan-500/30' : 'bg-transparent border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/70' }`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
               {(filterType === 'role' || filterType === 'specialty') && (
                 <div className="relative">
                    <select value={selectedFilterValue || ''} onChange={handleFilterValueChange} className="appearance-none bg-space-card border border-cyan-500/30 text-cyan-200 text-sm rounded-full px-4 py-1.5 pr-8 focus:outline-none focus:border-cyan-500/70 cursor-pointer">
                        <option value="">Select {filterType}...</option>
                        {(filterType === 'role' ? uniqueRoles : uniqueSpecialties).map(value => ( <option key={value} value={value}>{value}</option> ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-cyan-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                 </div>
               )}
            </div>

            {/* Member Grid */}
            <motion.div key={filterType + selectedFilterValue + currentPage} variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {currentMembers.map((member) => (
                  <motion.div
                    key={member.name}
                    variants={item}
                    layout
                    onClick={() => setSelectedMember(member)} // Re-added onClick
                    className="relative group p-px rounded-xl overflow-hidden cursor-pointer" // Added cursor-pointer
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/50 via-transparent to-purple-500/50 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-px rounded-xl bg-space-card"></div>
                    <div className="relative bg-transparent p-6 text-center flex flex-col items-center h-full">
                      <div className="relative w-24 h-24 mb-4 rounded-full border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden bg-black/20">
                         {member.image && member.image.startsWith('http') ? ( <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> ) : ( <User className="w-12 h-12 text-cyan-600/70" /> )}
                         <div className="absolute inset-0 rounded-full border border-cyan-400/60 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-0.5">{member.name}</h3>
                      <p className="text-sm text-cyan-400 mb-2">{member.role}</p>
                      <a href={`mailto:${member.contact}`} onClick={(e) => e.stopPropagation()} className="text-xs text-gray-400 hover:text-cyan-300 transition-colors break-all">{member.contact}</a> {/* Added stopPropagation */}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

             {filteredMembers.length === 0 && ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 py-16"> No team members found matching the current filter. </motion.div> )}

            {/* Pagination */}
            {totalPages > 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center mt-12 md:mt-16 space-x-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded-md text-sm font-medium border border-cyan-500/40 text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all duration-200" aria-label="Previous page"> Previous </button>
                    <div className="flex items-center space-x-1">
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            const showPage = pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1;
                            const showEllipsis = Math.abs(pageNum - currentPage) === 2 && totalPages > 5;
                            if (showEllipsis) { return <span key={`ellipsis-${i}`} className="px-1 text-cyan-400/50">...</span>; }
                            if (showPage) { return ( <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 rounded-md text-xs font-medium border transition-all duration-200 ${ currentPage === pageNum ? 'bg-cyan-500 text-black border-cyan-500 shadow-md shadow-cyan-500/30' : 'bg-transparent border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/70' }`}> {pageNum} </button> ); }
                            return null;
                        })}
                    </div>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-md text-sm font-medium border border-cyan-500/40 text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all duration-200" aria-label="Next page"> Next </button>
                </motion.div>
            )}
          </AnimatedSection>
        </div>
      </main>

      {/* Member Detail Modal (Re-added) */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key="team-modal-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={() => setSelectedMember(null)} // Close on overlay click
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key="team-modal-content"
              layoutId={selectedMember.name} // Animation from card
              variants={modalVariants}
              className="relative bg-space-card p-8 rounded-2xl border border-cyan-500/30 max-w-3xl w-full shadow-2xl shadow-cyan-900/40"
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-700/20 to-purple-700/20 rounded-2xl blur-xl opacity-50 -z-10"></div>

              {/* Close Button */}
               <motion.button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all z-20" // Ensure button is clickable
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
               >
                   <X size={20} />
               </motion.button>

              {/* Modal Content Grid */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden aspect-w-1 aspect-h-1 border border-cyan-500/20">
                  {selectedMember.image && selectedMember.image.startsWith('http') ? (
                     <motion.img src={selectedMember.image} alt={selectedMember.name} className="object-cover w-full h-full" initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
                  ) : (
                     <div className="w-full h-full bg-black/20 flex items-center justify-center">
                        <User className="w-24 h-24 text-cyan-600/50" />
                     </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                {/* Details */}
                <div>
                  <motion.h3 className="text-3xl font-bold mb-1 text-white" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    {selectedMember.name}
                  </motion.h3>
                  <motion.p className="text-cyan-400 font-medium mb-1 text-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                    {selectedMember.role} {/* Display role */}
                  </motion.p>
                   {/* **** FIXED LINE **** */}
                   <motion.p className="text-gray-400 font-medium mb-4 text-sm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                     {selectedMember.specialty} {/* Display specialty */}
                   </motion.p>
                   {/* **** END FIXED LINE **** */}

                   {/* Description */}
                   {selectedMember.description && (
                     <motion.p className="text-gray-300 mb-6 text-base leading-relaxed" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                       {selectedMember.description}
                     </motion.p>
                   )}

                   {/* Contact */}
                   <motion.a
                     href={`mailto:${selectedMember.contact}`}
                     className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 border border-cyan-500/50 rounded-full px-4 py-1.5 hover:bg-cyan-500/10 hover:text-cyan-200 hover:border-cyan-500/80 transition-all duration-200 group"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     whileHover={{ scale: 1.03 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                     <span>Contact {selectedMember.name.split(' ')[0]}</span>
                   </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

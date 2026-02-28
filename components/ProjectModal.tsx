
import React from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-[#FAF9F6] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8 mb-12">
            <div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 md:mb-0 shrink-0 border-4 border-white shadow-lg"
              style={{ backgroundColor: project.color }}
            >
              <div className="text-white">
                {/* SVG placeholder for consistency */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                <span>{project.category}</span>
                <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                <span>Difficulty: {project.difficulty}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {project.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                {project.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                <h4 className="font-serif text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">The Puzzle</h4>
                {project.content.split('##').map((section, i) => {
                  if (!section.trim()) return null;
                  const [title, ...body] = section.split('\n');
                  return (
                    <div key={i} className="mb-6">
                      <h5 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-widest">{title.trim()}</h5>
                      <p className="text-gray-600">{body.join('\n').trim()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-widest">Inventory</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, i) => (
                    <span key={i} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
                <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-widest">Solution Link</h4>
                <p className="text-xs text-gray-500 mb-4 italic">Ready to see the final build?</p>
                <button className="flex items-center justify-center space-x-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-opacity-90 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

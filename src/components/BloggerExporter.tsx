/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Copy, HelpCircle, FileText, Code, Layers } from 'lucide-react';
import { BLOGGER_HTML, BLOGGER_CSS, BLOGGER_JS } from '../utils/bloggerCode';

interface BloggerExporterProps {
  onBack: () => void;
}

type TabType = 'single-html' | 'separate-html' | 'separate-css' | 'separate-js';

export default function BloggerExporter({ onBack }: BloggerExporterProps) {
  const [activeTab, setActiveTab] = useState<TabType>('single-html');
  const [copiedTab, setCopiedTab] = useState<TabType | null>(null);

  const getCodeString = (tab: TabType): string => {
    switch (tab) {
      case 'single-html':
        return BLOGGER_HTML;
      case 'separate-html':
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kids Learning Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@500;700;800&family=Fredoka:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body data-theme="light">
  <div class="bubbles" id="bubbles-container"></div>
  <div class="container">
    <!-- Header, Views, Sliders: Refer to single-html for exact tags list -->
  </div>
  <script src="script.js"></script>
</body>
</html>`;
      case 'separate-css':
        return BLOGGER_CSS;
      case 'separate-js':
        return BLOGGER_JS;
    }
  };

  const handleCopy = (tab: TabType) => {
    const code = getCodeString(tab);
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    setTimeout(() => {
      setCopiedTab(null);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center py-4"
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <span>Blogger (Blogspot) Export Hub</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-lg mx-auto">
          Deploy this Kids Learning Website directly inside Blogger! Copy the single-file HTML or access separate static resource files instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {/* Left Column: Instructions card */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-3xl border-3 border-amber-100 dark:border-slate-700/60 p-6 shadow-sm h-fit">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
            <HelpCircle size={22} className="animate-pulse" />
            <h3 className="font-extrabold text-lg">Blogger Embedding Guide</h3>
          </div>

          <ol className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-300 list-decimal pl-4">
            <li className="leading-relaxed">
              <span className="font-extrabold text-slate-800 dark:text-white">Copy unified code:</span> Select the <strong>Single Unified HTML</strong> tab on the right and click "Copy Code".
            </li>
            <li className="leading-relaxed">
              <span className="font-extrabold text-slate-800 dark:text-white">Go to Blogger:</span> Login to your Blogger panel at <a href="https://blogger.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">blogger.com</a>.
            </li>
            <li className="leading-relaxed">
              <span className="font-extrabold text-slate-800 dark:text-white">Create a Page:</span> Go to the <strong>Pages</strong> or <strong>Layout</strong> tab. You can paste it into an HTML Gadget or a static page.
            </li>
            <li className="leading-relaxed">
              <span className="font-extrabold text-slate-800 dark:text-white">Toggle HTML View:</span> Switch your editor mode from "Compose View" to <strong className="text-pink-500">HTML View</strong> (the &lt;&gt; icon).
            </li>
            <li className="leading-relaxed">
              <span className="font-extrabold text-slate-800 dark:text-white">Paste and Save:</span> Paste the code inside the editor, write a title, and click <strong>Publish</strong>. That's it!
            </li>
          </ol>

          {/* Quick info */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400 font-semibold flex items-center gap-2">
            <span>💡</span>
            <span>All code is pure HTML, CSS, & Javascript. No libraries or external APIs needed! Runs lightning fast offline!</span>
          </div>
        </div>

        {/* Right Column: Code viewer & Tabs */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Unified Single File */}
            <button
              onClick={() => setActiveTab('single-html')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'single-html'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <Layers size={14} />
              <span>Unified HTML (Single File)</span>
            </button>

            {/* Separate Index.html */}
            <button
              onClick={() => setActiveTab('separate-html')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'separate-html'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <FileText size={14} />
              <span>index.html</span>
            </button>

            {/* Separate style.css */}
            <button
              onClick={() => setActiveTab('separate-css')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'separate-css'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <Code size={14} />
              <span>style.css</span>
            </button>

            {/* Separate script.js */}
            <button
              onClick={() => setActiveTab('separate-js')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'separate-js'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <Code size={14} />
              <span>script.js</span>
            </button>
          </div>

          {/* Copy Button and Content Container */}
          <div className="relative bg-slate-950 dark:bg-black/80 rounded-3xl border-3 border-slate-900 p-5 flex flex-col h-[400px]">
            {/* Header copy actions */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-wider">
                {activeTab === 'single-html' ? 'Unified HTML (Ready for Blogspot)' : 'Source Code Output'}
              </span>

              <button
                onClick={() => handleCopy(activeTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  copiedTab === activeTab
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                {copiedTab === activeTab ? (
                  <>
                    <Check size={12} />
                    <span>Copied! 📋</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Box */}
            <pre className="text-left font-mono text-xs text-slate-300 overflow-y-auto flex-1 p-2 rounded-xl bg-slate-900/40 custom-scrollbar leading-relaxed selection:bg-purple-500/30">
              <code>{getCodeString(activeTab)}</code>
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

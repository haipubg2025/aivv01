import React, { useState } from 'react';
import { Check, Sparkles, GitBranch, ChevronRight, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { BasicOutlineOption } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useStoryStore } from '../../store/useStoryStore';

interface BasicOutlineOptionSelectorProps {
  basicOutlineOptions: BasicOutlineOption[];
  selectBasicOutlineOption: (option: BasicOutlineOption | BasicOutlineOption[]) => void;
  selectedBasicOutline: BasicOutlineOption | BasicOutlineOption[] | null;
  generateBasicOutlineChildren?: (option: BasicOutlineOption, level: number, customBranches?: number, customTotalLevels?: number, ancestors?: BasicOutlineOption[]) => Promise<BasicOutlineOption[] | null>;
  regenerateRootBranching?: () => Promise<void>;
  totalLevels: number;
  branchingSettings: { branchesPerLevel: number; totalLevels: number };
  branchingSuggestion: string;
  setBranchingSuggestion: (val: string) => void;
  theme: 'light' | 'dark';
}

export const BasicOutlineOptionSelector: React.FC<BasicOutlineOptionSelectorProps> = ({
  basicOutlineOptions,
  selectBasicOutlineOption,
  selectedBasicOutline,
  generateBasicOutlineChildren,
  regenerateRootBranching,
  totalLevels,
  branchingSettings,
  branchingSuggestion,
  setBranchingSuggestion,
  theme
}) => {
  const activeBranchingPath = useStoryStore(state => state.activeBranchingPath);
  const setActiveBranchingPath = useStoryStore(state => state.setActiveBranchingPath);
  
  const navigationPath = activeBranchingPath || [];
  const setNavigationPath = setActiveBranchingPath;

  const [nextLevelBranches, setNextLevelBranches] = useState<number>(branchingSettings.branchesPerLevel);
  const [nextTotalLevels, setNextTotalLevels] = useState<number>(totalLevels);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDark = theme === 'dark';

  const getSelectedLeafId = () => {
    if (!selectedBasicOutline) return null;
    if (Array.isArray(selectedBasicOutline)) {
      return selectedBasicOutline[selectedBasicOutline.length - 1].id;
    }
    return selectedBasicOutline.id;
  };

  const getSelectedTitle = () => {
    if (!selectedBasicOutline) return '';
    if (Array.isArray(selectedBasicOutline)) {
      return selectedBasicOutline[selectedBasicOutline.length - 1].title;
    }
    return selectedBasicOutline.title;
  };

  React.useEffect(() => {
    setNextTotalLevels(totalLevels);
  }, [totalLevels]);

  const currentLevel = navigationPath.length + 1;

  // Lấy danh sách currentOptions luôn đồng bộ với global store
  const currentOptions = React.useMemo(() => {
    if (navigationPath.length === 0) return basicOutlineOptions;
    
    let currentLevelNodes = basicOutlineOptions;
    let foundNode = null;
    
    // Tracing down using IDs to ensure it's completely synced with the global state
    for (const pathNode of navigationPath) {
      const nodeInGlobal = currentLevelNodes.find(n => n.id === pathNode.id);
      if (nodeInGlobal) {
        foundNode = nodeInGlobal;
        currentLevelNodes = nodeInGlobal.children || [];
      } else {
        // Fallback in case of mismatch
        return navigationPath[navigationPath.length - 1].children || [];
      }
    }
    
    return foundNode ? (foundNode.children || []) : basicOutlineOptions;
  }, [navigationPath, basicOutlineOptions]);

  const handleOptionClickWithNavigation = async (option: BasicOutlineOption) => {
    const nextLevel = navigationPath.length + 2;
    
    if (option.children && option.children.length > 0) {
      setNavigationPath([...navigationPath, option]);
      return;
    }

    if (nextLevel <= nextTotalLevels && generateBasicOutlineChildren) {
      // Sử dụng giá trị người dùng nhập tại tầng hiện tại để tạo tầng tiếp theo
      const branchesToUse = nextLevelBranches;
      const totalLevelsToUse = nextTotalLevels;

      const newChildren = await generateBasicOutlineChildren(option, nextLevel, branchesToUse, totalLevelsToUse, [...navigationPath, option]);
      
      if (newChildren && newChildren.length > 0) {
        setNavigationPath([...navigationPath, { ...option, children: newChildren }]);
      }
    } else {
      selectBasicOutlineOption([...navigationPath, option]);
    }
  };

  const goBack = () => {
    setNavigationPath(navigationPath.slice(0, -1));
  };

  const handleRegenerateCurrent = async () => {
    if (currentLevel === 1) {
      if (regenerateRootBranching) {
        await regenerateRootBranching();
      }
    } else {
      const parentOption = navigationPath[navigationPath.length - 1];
      if (generateBasicOutlineChildren) {
        const branchesToUse = currentLevel >= 2 ? nextLevelBranches : branchingSettings.branchesPerLevel;
        const totalLevelsToUse = currentLevel >= 2 ? nextTotalLevels : totalLevels;
        const newChildren = await generateBasicOutlineChildren(parentOption, currentLevel, branchesToUse, totalLevelsToUse, navigationPath.slice(0, -1));
        
        if (newChildren && newChildren.length > 0) {
          const newPath = [...navigationPath];
          newPath[newPath.length - 1] = { ...parentOption, children: newChildren };
          setNavigationPath(newPath);
        }
      }
    }
  };

  const handleRegenerateRoot = async () => {
    if (regenerateRootBranching) {
      setNavigationPath([]);
      await regenerateRootBranching();
    }
  };

  return (
    <div className={cn(
      "space-y-6 transition-all duration-500",
      isCollapsed ? (isDark ? "bg-zinc-900/20 p-4 rounded-3xl border border-zinc-800/50" : "bg-ivory-dark/20 p-4 rounded-3xl border border-zinc-200/50") : ""
    )}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sparkles size={20} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "text-lg font-bold uppercase tracking-wider",
                isDark ? "text-zinc-200" : "text-zinc-800"
              )}>Phác thảo cốt truyện đa nhánh</h3>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                  "p-1 rounded-md transition-colors",
                  isDark ? "hover:bg-zinc-800 text-zinc-500 hover:text-primary" : "hover:bg-zinc-100 text-zinc-400 hover:text-primary"
                )}
                title={isCollapsed ? "Mở rộng" : "Thu gọn"}
              >
                {isCollapsed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
            </div>
            <p className="text-xs text-zinc-500 font-medium">Cấp độ {currentLevel} / {nextTotalLevels}</p>
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            {regenerateRootBranching && (
              <>
                <button 
                  onClick={handleRegenerateCurrent}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold border",
                    isDark ? "bg-zinc-800 hover:bg-zinc-700 text-primary border-primary/30" : "bg-ivory hover:bg-zinc-50 text-primary border-primary/30"
                  )}
                  title="Tạo lại các lựa chọn ở tầng hiện tại"
                >
                  <Sparkles size={14} /> TẠO LẠI TẦNG NÀY
                </button>
                <button 
                  onClick={handleRegenerateRoot}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold border",
                    isDark ? "bg-zinc-800 hover:bg-zinc-700 text-rose-400 border-rose-500/30" : "bg-ivory hover:bg-zinc-50 text-rose-500 border-rose-500/30"
                  )}
                  title="Xóa toàn bộ và tạo lại từ tầng 1"
                >
                  <Sparkles size={14} /> TẠO LẠI TỪ ĐẦU
                </button>
              </>
            )}
            {navigationPath.length > 0 && (
              <button 
                onClick={goBack}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold border",
                  isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" : "bg-ivory hover:bg-zinc-50 text-zinc-600 border-zinc-200"
                )}
              >
                <ArrowLeft size={14} /> QUAY LẠI
              </button>
            )}
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20 font-bold uppercase">
              {currentOptions.length} LỰA CHỌN
            </span>
          </div>
        )}

        {isCollapsed && selectedBasicOutline && (
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
            <Check size={14} className="text-primary" />
            <span className={cn(
              "text-xs font-bold uppercase truncate max-w-[200px]",
              isDark ? "text-primary/80" : "text-primary"
            )}>
              Đã chọn: {getSelectedTitle()}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden space-y-6"
          >
            {navigationPath.length > 0 && (
              <div className={cn(
                "flex flex-wrap items-center gap-2 p-3 rounded-xl border",
                isDark ? "bg-zinc-900/30 border-zinc-800/50" : "bg-ivory-dark/30 border-zinc-200/50"
              )}>
                <button 
                  onClick={() => setNavigationPath([])}
                  className="text-[10px] font-bold text-zinc-500 hover:text-primary transition-colors uppercase"
                >
                  GỐC
                </button>
                {navigationPath.map((node, i) => (
                  <React.Fragment key={node.id}>
                    <ChevronRight size={12} className="text-zinc-700" />
                    <button 
                      onClick={() => setNavigationPath(navigationPath.slice(0, i + 1))}
                      className={cn(
                        "text-[10px] font-bold uppercase transition-colors",
                        i === navigationPath.length - 1 ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {node.title.length > 15 ? node.title.substring(0, 15) + '...' : node.title}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            )}

            {currentLevel >= 1 && (
              <div className={cn(
                "p-4 rounded-2xl border space-y-4",
                isDark ? "bg-primary/5 border-primary/20" : "bg-primary/5 border-primary/10"
              )}>
                <div className="flex items-center gap-2 text-primary">
                  <GitBranch size={16} />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Cài đặt cho cấp độ {currentLevel + 1}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Số nhánh cho cấp độ {currentLevel + 1}</label>
                    <input 
                      type="number"
                      value={nextLevelBranches}
                      onChange={(e) => setNextLevelBranches(parseInt(e.target.value) || 1)}
                      className={cn(
                        "w-full p-2 border rounded-lg text-sm outline-none focus:border-primary",
                        isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory border-zinc-200"
                      )}
                      min="1"
                      max="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Tổng số tầng tối đa</label>
                    <input 
                      type="number"
                      value={nextTotalLevels}
                      onChange={(e) => setNextTotalLevels(parseInt(e.target.value) || 1)}
                      className={cn(
                        "w-full p-2 border rounded-lg text-sm outline-none focus:border-primary",
                        isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory border-zinc-200"
                      )}
                      min={currentLevel + 1}
                      max="20"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-primary/10">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1.5">
                    <Sparkles size={10} className="text-primary" />
                    Gợi ý hướng rẽ nhánh (Tùy chọn)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ví dụ: Thêm phản diện mới, rẽ sang hướng kinh dị..."
                    value={branchingSuggestion}
                    onChange={(e) => setBranchingSuggestion(e.target.value)}
                    className={cn(
                      "w-full p-2 border rounded-lg text-sm outline-none focus:border-primary placeholder:text-zinc-700",
                      isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory border-zinc-200"
                    )}
                  />
                </div>
              </div>
            )}

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={navigationPath.length > 0 ? navigationPath[navigationPath.length - 1].id : 'root'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {currentOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "group relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between",
                        getSelectedLeafId() === option.id
                          ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                          : option.children && option.children.length > 0
                            ? (isDark ? "bg-emerald-500/5 border-emerald-500/30 shadow-md shadow-emerald-500/5" : "bg-emerald-50 border-emerald-500/30 shadow-md shadow-emerald-500/5")
                            : (isDark ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80" : "bg-ivory border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"),
                        option.isGeneratingChildren ? "opacity-70 pointer-events-none" : ""
                      )}
                      onClick={() => handleOptionClickWithNavigation(option)}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-3">
                          <div className="space-y-1">
                            {option.children && option.children.length > 0 && (
                              <span className="text-[8px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                Đã rẽ nhánh
                              </span>
                            )}
                            <h4 className={cn(
                              "text-sm font-bold group-hover:text-primary transition-colors leading-tight",
                              isDark ? "text-zinc-100" : "text-zinc-900"
                            )}>
                              {option.title}
                            </h4>
                          </div>
                          {getSelectedLeafId() === option.id && (
                            <div className="p-1.5 rounded-full bg-primary text-white shrink-0">
                              <Check size={12} />
                            </div>
                          )}
                        </div>
                        
                        <p className={cn(
                          "text-sm leading-relaxed italic",
                          isDark ? "text-zinc-400" : "text-zinc-600"
                        )}>
                          {option.summary}
                        </p>

                        {option.keyPlotPoints && option.keyPlotPoints.length > 0 && (
                          <div className={cn(
                            "space-y-2 py-3 border-t",
                            isDark ? "border-zinc-800/50" : "border-zinc-200"
                          )}>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sự kiện mấu chốt</p>
                            <ul className="space-y-1.5">
                              {option.keyPlotPoints.slice(0, 15).map((point, i) => (
                                <li key={i} className={cn(
                                  "flex items-start gap-2 text-sm leading-tight",
                                  isDark ? "text-zinc-500" : "text-zinc-600"
                                )}>
                                  <span className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className={cn(
                        "mt-4 pt-4 border-t flex items-center justify-between",
                        isDark ? "border-zinc-800/50" : "border-zinc-200"
                      )}>
                        <div className="flex items-center gap-1.5">
                          {option.isGeneratingChildren ? (
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <GitBranch size={12} className={option.children?.length ? "text-emerald-400" : "text-zinc-600"} />
                          )}
                          <span className={`text-[10px] font-bold uppercase ${option.children?.length ? "text-emerald-400" : "text-zinc-500"}`}>
                            {option.isGeneratingChildren 
                              ? "ĐANG TẠO NHÁNH..." 
                              : option.children?.length 
                                ? `${option.children.length} NHÁNH CON` 
                                : currentLevel < nextTotalLevels 
                                  ? "CÓ THỂ RẼ NHÁNH" 
                                  : "NHÁNH CUỐI"}
                          </span>
                        </div>
                        
                        <button
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                            getSelectedLeafId() === option.id
                              ? "bg-primary text-white"
                              : (isDark ? "bg-zinc-800 text-zinc-400 group-hover:bg-primary group-hover:text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-primary group-hover:text-white")
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectBasicOutlineOption([...navigationPath, option]);
                          }}
                        >
                          {getSelectedLeafId() === option.id ? "ĐÃ CHỌN" : "CHỌN"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {currentOptions.length === 0 && (
              <div className={cn(
                "text-center py-12 rounded-3xl border border-dashed",
                isDark ? "bg-zinc-900/20 border-zinc-800" : "bg-ivory-dark/20 border-zinc-200"
              )}>
                <p className="text-zinc-500 italic text-sm">Không có lựa chọn nào ở nhánh này.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

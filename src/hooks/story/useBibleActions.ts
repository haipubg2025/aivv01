import { 
  Character, 
  CodexEntry, 
  TimelineEvent, 
  StoryBibleUpdate 
} from '../../types';

export function useBibleActions(states: any) {
  const {
    setCharacters,
    setCodex,
    setTimeline,
    setLastBibleUpdate,
    setRecentBibleUpdate,
    setBibleUpdateHistory
  } = states;

  const {
    setWorldInfo,
    setWorldGeography,
    setWorldHistory,
    setWorldCulture,
    setWorldEconomy,
    setWorldReligion,
    setWorldFactions,
    setWorldRelationships,
    setWorldUniqueElements,
    setPowerSystem
  } = states;

  const applyBibleUpdates = (updates: any, showModal: boolean = true) => {
    if (!updates) return;
    
    const bibleUpdate: StoryBibleUpdate = {
      newCharacters: [],
      characterUpdates: [],
      newCodexEntries: [],
      codexUpdates: [],
      newTimelineEvents: [],
      timelineUpdates: [],
      worldUpdates: null
    };

    // 0. World Updates
    if (updates.worldUpdates) {
      const wu = updates.worldUpdates;
      const before: any = {};
      const after: any = {};

      const isValidUpdate = (newVal: any, oldVal: any) => {
        if (!newVal || newVal === oldVal) return false;
        if (typeof newVal === 'string') {
          const lower = newVal.toLowerCase().trim();
          if (['không đổi', 'không thay đổi', 'unchanged', 'giữ nguyên'].includes(lower)) {
            return false;
          }
        }
        return true;
      };

      if (isValidUpdate(wu.worldInfo, states.worldInfo)) {
        before.worldInfo = states.worldInfo;
        after.worldInfo = wu.worldInfo;
        setWorldInfo(wu.worldInfo);
      }
      if (isValidUpdate(wu.worldGeography, states.worldGeography)) {
        before.worldGeography = states.worldGeography;
        after.worldGeography = wu.worldGeography;
        setWorldGeography(wu.worldGeography);
      }
      if (isValidUpdate(wu.worldHistory, states.worldHistory)) {
        before.worldHistory = states.worldHistory;
        after.worldHistory = wu.worldHistory;
        setWorldHistory(wu.worldHistory);
      }
      if (isValidUpdate(wu.worldCulture, states.worldCulture)) {
        before.worldCulture = states.worldCulture;
        after.worldCulture = wu.worldCulture;
        setWorldCulture(wu.worldCulture);
      }
      if (isValidUpdate(wu.worldEconomy, states.worldEconomy)) {
        before.worldEconomy = states.worldEconomy;
        after.worldEconomy = wu.worldEconomy;
        setWorldEconomy(wu.worldEconomy);
      }
      if (isValidUpdate(wu.worldReligion, states.worldReligion)) {
        before.worldReligion = states.worldReligion;
        after.worldReligion = wu.worldReligion;
        setWorldReligion(wu.worldReligion);
      }
      if (isValidUpdate(wu.worldFactions, states.worldFactions)) {
        before.worldFactions = states.worldFactions;
        after.worldFactions = wu.worldFactions;
        setWorldFactions(wu.worldFactions);
      }
      if (isValidUpdate(wu.worldRelationships, states.worldRelationships)) {
        before.worldRelationships = states.worldRelationships;
        after.worldRelationships = wu.worldRelationships;
        setWorldRelationships(wu.worldRelationships);
      }
      if (isValidUpdate(wu.worldUniqueElements, states.worldUniqueElements)) {
        before.worldUniqueElements = states.worldUniqueElements;
        after.worldUniqueElements = wu.worldUniqueElements;
        setWorldUniqueElements(wu.worldUniqueElements);
      }
      
      const powerSysVal = wu.powerSystem || wu.logicSystem;
      if (isValidUpdate(powerSysVal, states.powerSystem)) {
        before.powerSystem = states.powerSystem;
        after.powerSystem = powerSysVal;
        setPowerSystem(powerSysVal);
      }

      if (Object.keys(after).length > 0) {
        bibleUpdate.worldUpdates = { before, after, reason: wu.reason };
      }
    }

    // 1. New Codex Entries
    if (updates.newCodexEntries?.length > 0) {
      setCodex((prev: CodexEntry[]) => {
        const existingTitles = new Set(prev.map(e => e.title));
        const uniqueNew = updates.newCodexEntries.filter((e: any) => !existingTitles.has(e.title));
        if (uniqueNew.length === 0) return prev;
        
        const newEntries = uniqueNew.map((e: any) => ({ ...e, id: Math.random().toString(36).substr(2, 9) }));
        bibleUpdate.newCodexEntries = [...bibleUpdate.newCodexEntries, ...newEntries];
        return [...prev, ...newEntries];
      });
    }

    // 2. New Timeline Events
    if (updates.newTimelineEvents?.length > 0) {
      setTimeline((prev: TimelineEvent[]) => {
        const existingTitles = new Set(prev.map(e => e.title));
        const uniqueNew = updates.newTimelineEvents.filter((e: any) => !existingTitles.has(e.title));
        if (uniqueNew.length === 0) return prev;

        const newEvents = uniqueNew.map((e: any) => ({ 
          ...e, 
          id: Math.random().toString(36).substr(2, 9),
          month: 1, day: 1, hour: 0, minute: 0, second: 0
        }));
        bibleUpdate.newTimelineEvents = [...bibleUpdate.newTimelineEvents, ...newEvents];
        return [...prev, ...newEvents];
      });
    }

    // 3. New Characters
    if (updates.newCharacters?.length > 0) {
      setCharacters((prev: Character[]) => {
        const existingNames = new Set(prev.map(c => c.name));
        const uniqueNew = updates.newCharacters.filter((c: any) => !existingNames.has(c.name));
        if (uniqueNew.length === 0) return prev;

        const newChars = uniqueNew.map((c: any) => ({ ...c, id: Math.random().toString(36).substr(2, 9) }));
        bibleUpdate.newCharacters = [...bibleUpdate.newCharacters, ...newChars];
        return [...prev, ...newChars];
      });
    }

    // 4. Character Updates
    if (updates.characterUpdates?.length > 0) {
      setCharacters((prev: Character[]) => {
        const updatedNames = new Set<string>();
        return prev.map(c => {
          const update = updates.characterUpdates.find((u: any) => u.name === c.name);
          if (update && !updatedNames.has(c.name)) {
            const before: Partial<Character> = {};
            const after: Partial<Character> = {};
            const fieldsToProtect = ['personality', 'guidingPrinciple', 'role', 'appearance', 'name', 'gender', 'birthDate', 'originAndFaction', 'age'];
            const strictlyProtectedFields = ['birthDate', 'age'];
            
            Object.keys(update).forEach(key => {
              const k = key as keyof Character;
              const val = update[key];
              
              const isHallucinatedUnchanged = typeof val === 'string' && 
                ['không đổi', 'không thay đổi', 'unchanged', 'giữ nguyên'].includes(val.toLowerCase().trim());

              if (val !== undefined && val !== null && val !== c[k] && key !== 'reason' && !isHallucinatedUnchanged) {
                const isStrictlyProtected = strictlyProtectedFields.includes(key);
                const reasonMinLength = isStrictlyProtected ? 30 : 10;
                
                if (fieldsToProtect.includes(key) && (!update.reason || update.reason.length < reasonMinLength)) {
                  console.log(`Từ chối cập nhật trường quan trọng ${key} của nhân vật ${c.name} do thiếu lý do chính đáng hoặc lý do quá ngắn (${update.reason?.length || 0}/${reasonMinLength}).`);
                } else {
                  (before as any)[k] = c[k];
                  (after as any)[k] = val;
                }
              }
            });

            if (Object.keys(after).length > 0) {
              bibleUpdate.characterUpdates.push({ name: c.name, before, after, reason: update.reason });
              updatedNames.add(c.name);
              return { ...c, ...after };
            }
          }
          return c;
        });
      });
    }

    // 5. Codex Updates
    if (updates.codexUpdates?.length > 0) {
      setCodex((prev: CodexEntry[]) => {
        const updatedTitles = new Set<string>();
        return prev.map(e => {
          const update = updates.codexUpdates.find((u: any) => u.title === e.title);
          
          if (update && update.content !== e.content && !updatedTitles.has(e.title)) {
            const isHallucinatedUnchanged = typeof update.content === 'string' && 
              ['không đổi', 'không thay đổi', 'unchanged', 'giữ nguyên'].includes(update.content.toLowerCase().trim());
              
            if (!isHallucinatedUnchanged) {
              bibleUpdate.codexUpdates.push({ title: e.title, before: e.content, after: update.content, reason: update.reason });
              updatedTitles.add(e.title);
              return { ...e, content: update.content };
            }
          }
          return e;
        });
      });
    }

    // 6. Timeline Updates
    if (updates.timelineUpdates?.length > 0) {
      setTimeline((prev: TimelineEvent[]) => {
        const updatedTitles = new Set<string>();
        return prev.map(e => {
          const update = updates.timelineUpdates.find((u: any) => u.title === e.title);
          
          if (update && update.description !== e.description && !updatedTitles.has(e.title)) {
            const isHallucinatedUnchanged = typeof update.description === 'string' && 
              ['không đổi', 'không thay đổi', 'unchanged', 'giữ nguyên'].includes(update.description.toLowerCase().trim());
              
            if (!isHallucinatedUnchanged) {
              bibleUpdate.timelineUpdates.push({ title: e.title, before: e.description, after: update.description, reason: update.reason });
              updatedTitles.add(e.title);
              return { ...e, description: update.description };
            }
          }
          return e;
        });
      });
    }

    // Cập nhật modal sau khi các state đã được lên lịch update
    // De-duplicate updates in bibleUpdate just in case setters ran multiple times (React StrictMode)
    const deduplicate = (arr: any[], key: string) => {
      const seen = new Set();
      return arr.filter(item => {
        const val = item[key];
        if (seen.has(val)) return false;
        seen.add(val);
        return true;
      });
    };

    bibleUpdate.characterUpdates = deduplicate(bibleUpdate.characterUpdates, 'name');
    bibleUpdate.codexUpdates = deduplicate(bibleUpdate.codexUpdates, 'title');
    bibleUpdate.timelineUpdates = deduplicate(bibleUpdate.timelineUpdates, 'title');
    bibleUpdate.newCharacters = deduplicate(bibleUpdate.newCharacters, 'name');
    bibleUpdate.newCodexEntries = deduplicate(bibleUpdate.newCodexEntries, 'title');
    bibleUpdate.newTimelineEvents = deduplicate(bibleUpdate.newTimelineEvents, 'title');

    const hasActualChanges = 
      bibleUpdate.newCharacters.length > 0 || 
      bibleUpdate.characterUpdates.length > 0 ||
      bibleUpdate.newCodexEntries.length > 0 ||
      bibleUpdate.codexUpdates.length > 0 ||
      bibleUpdate.newTimelineEvents.length > 0 ||
      bibleUpdate.timelineUpdates.length > 0 ||
      bibleUpdate.worldUpdates !== null;

    if (hasActualChanges) {
      if (showModal) {
        setRecentBibleUpdate(bibleUpdate);
        setLastBibleUpdate(bibleUpdate);
      }
      setBibleUpdateHistory((prev: StoryBibleUpdate[]) => [bibleUpdate, ...prev]);
    }
  };

  return {
    applyBibleUpdates
  };
}

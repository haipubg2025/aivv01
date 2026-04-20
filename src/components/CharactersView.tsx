import { Plus, X } from 'lucide-react';
import { Character } from '../types';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';

interface CharactersViewProps {
  characters: Character[];
  addCharacter: () => void;
  updateCharacter: (id: string, field: keyof Character, value: string | number) => void;
  removeCharacter: (id: string) => void;
  generateCharacterAI: (id: string) => void;
  isLoading: boolean;
}

export const CharactersView: React.FC<CharactersViewProps> = ({
  characters,
  addCharacter,
  updateCharacter,
  removeCharacter
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-zinc-300 dark:border-zinc-800 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 bg-ivory dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400">
            Tổng: <span className="text-primary">{Array.isArray(characters) ? characters.length : 0}</span> nhân vật
          </div>
          <button onClick={addCharacter} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all font-bold shadow-lg shadow-primary/20">
            <Plus size={20} /> Thêm nhân vật
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {(!Array.isArray(characters) || characters.length === 0) && <p className="text-zinc-500 italic text-center py-10">Chưa có nhân vật nào được tạo.</p>}
        {Array.isArray(characters) && characters.map(char => (
          <div key={char.id} className="p-5 md:p-8 rounded-3xl bg-ivory dark:bg-black border border-zinc-300 dark:border-zinc-800 relative group hover:border-primary/50 transition-all shadow-sm dark:shadow-none">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button onClick={() => removeCharacter(char.id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Họ và tên</span>
                  <span className="text-[8px] text-amber-600 dark:text-amber-500/60 normal-case font-normal italic">Cần lý do để thay đổi</span>
                </label>
                <AutoResizeTextarea 
                  value={char.name} 
                  onChange={(e) => updateCharacter(char.id, 'name', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-zinc-900 dark:text-zinc-100 min-h-0"
                  placeholder="Tên nhân vật"
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold text-amber-600 dark:text-amber-500">Level (1-5)</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  value={char.level || ''} 
                  onChange={(e) => updateCharacter(char.id, 'level', e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-amber-600 dark:text-amber-500 focus:outline-none focus:border-amber-500 font-bold min-h-0"
                  placeholder="1 (Quan trọng nhất)"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Danh xưng</label>
                <AutoResizeTextarea 
                  value={char.title} 
                  onChange={(e) => updateCharacter(char.id, 'title', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary font-medium min-h-0"
                  placeholder="Cô giáo, Thầy, Đại hiệp..."
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Chức vụ / Nghề nghiệp</label>
                <AutoResizeTextarea 
                  value={char.occupation} 
                  onChange={(e) => updateCharacter(char.id, 'occupation', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-zinc-900 dark:text-zinc-100 min-h-0"
                  placeholder="Giáo viên, Giám đốc, Kiếm sĩ..."
                  minRows={1}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Vai trò</label>
                <AutoResizeTextarea 
                  value={char.role} 
                  onChange={(e) => updateCharacter(char.id, 'role', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary font-medium min-h-0"
                  placeholder="Vai trò"
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Giới tính</span>
                  <span className="text-[8px] text-amber-600 dark:text-amber-500/60 normal-case font-normal italic">Cần lý do để thay đổi</span>
                </label>
                <AutoResizeTextarea 
                  value={char.gender} 
                  onChange={(e) => updateCharacter(char.id, 'gender', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-zinc-900 dark:text-zinc-100 min-h-0"
                  placeholder="Giới tính"
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Tuổi</label>
                <AutoResizeTextarea 
                  value={char.age} 
                  onChange={(e) => updateCharacter(char.id, 'age', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-zinc-900 dark:text-zinc-100 min-h-0"
                  placeholder="Tuổi"
                  minRows={1}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Ngày sinh</span>
                  <span className="text-[8px] text-amber-600 dark:text-amber-500/60 normal-case font-normal italic">Cần lý do để thay đổi</span>
                </label>
                <AutoResizeTextarea 
                  value={char.birthDate} 
                  onChange={(e) => updateCharacter(char.id, 'birthDate', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-zinc-900 dark:text-zinc-100 min-h-0"
                  placeholder="Ngày sinh"
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Nguồn gốc & Thế lực</span>
                  <span className="text-[8px] text-amber-600 dark:text-amber-500/60 normal-case font-normal italic">Cần lý do để thay đổi</span>
                </label>
                <AutoResizeTextarea 
                  value={char.originAndFaction} 
                  onChange={(e) => updateCharacter(char.id, 'originAndFaction', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary font-medium min-h-0"
                  placeholder="Gia tộc, Gia thế, Phe phái, Bản địa/Xuyên không..."
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Trinh tiết & Kinh nghiệm</span>
                  <span className="text-[8px] text-rose-600 dark:text-rose-500/60 normal-case font-normal italic">NSFW</span>
                </label>
                <AutoResizeTextarea 
                  value={char.sexualExperience || ''} 
                  onChange={(e) => updateCharacter(char.id, 'sexualExperience', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-rose-600 dark:text-rose-400 focus:outline-none focus:border-rose-500 font-medium min-h-0"
                  placeholder="Còn trinh / Mất trinh, kinh nghiệm..."
                  minRows={1}
                />
              </div>
              <div className="space-y-1">
                {/* Placeholder to keep grid alignment */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Tính cách</span>
                  <span className="text-[8px] text-red-600 dark:text-red-500/60 normal-case font-normal italic">Cốt lõi - Cần lý do xác đáng</span>
                </label>
                <AutoResizeTextarea 
                  value={char.personality} 
                  onChange={(e) => updateCharacter(char.id, 'personality', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary min-h-0 text-zinc-900 dark:text-zinc-100"
                  placeholder="Tính cách cốt lõi..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                  <span>Kim chỉ nam</span>
                  <span className="text-[8px] text-red-600 dark:text-red-500/60 normal-case font-normal italic">Cốt lõi - Cần lý do xác đáng</span>
                </label>
                <AutoResizeTextarea 
                  value={char.guidingPrinciple} 
                  onChange={(e) => updateCharacter(char.id, 'guidingPrinciple', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary min-h-0 font-medium"
                  placeholder="Lý tưởng sống/Nguyên tắc đạo đức (Rất khó thay đổi)..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Đặc điểm (Thói quen, Sở thích, Nhận dạng...)</label>
                <AutoResizeTextarea 
                  value={char.traits} 
                  onChange={(e) => updateCharacter(char.id, 'traits', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary min-h-0 text-zinc-900 dark:text-zinc-100"
                  placeholder="Thói quen & Cử chỉ, Sở thích & Điểm ghét, Đặc điểm nhận dạng phụ..."
                />
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold text-primary">Năng lực (Kỹ năng, Thần thông, Công pháp...)</label>
              <AutoResizeTextarea 
                value={char.abilities} 
                onChange={(e) => updateCharacter(char.id, 'abilities', e.target.value)}
                className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-primary/20 rounded-xl p-3 md:p-4 text-sm text-primary dark:text-primary focus:outline-none focus:border-primary/50 min-h-0 leading-relaxed"
                placeholder="Mô tả năng lực kèm chi tiết:
- Thế giới thường: Ăn nói: Khả năng thuyết phục...; Diễn xuất: Nhập vai xuất sắc...
- Tu Tiên: Công pháp: Cách thức tu luyện...; Thần thông: Hiệu quả đặc biệt...
- Dị giới: Ma pháp: Tác dụng của phép thuật..."
              />
            </div>

            <div className="space-y-1 mb-4">
              <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold flex items-center justify-between">
                <span>Ngoại hình (Độ dài văn học, thông số chi tiết)</span>
                <span className="text-[8px] text-red-600 dark:text-red-500/60 normal-case font-normal italic">Cốt lõi - Cần lý do xác đáng</span>
              </label>
              <AutoResizeTextarea 
                value={char.appearance} 
                onChange={(e) => updateCharacter(char.id, 'appearance', e.target.value)}
                className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800/50 rounded-xl p-3 md:p-4 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-primary/50 min-h-0 leading-relaxed"
                placeholder="Ngoại hình chi tiết. Với nhân vật NỮ, BẮT BUỘC tuân thủ cấu trúc:
+ Chiều cao: ...
+ Cân nặng: ...
+ Số đo 3 vòng: ...
+ Khuôn mặt: ...
+ Mái tóc: ...
+ Ngực: ...
+ Vóc dáng: ...
+ [Các phần khác]: ..."
              />
            </div>

            <div className="space-y-1 mb-4">
              <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold text-emerald-600 dark:text-emerald-400">Mối quan hệ (Với các nhân vật khác)</label>
              <AutoResizeTextarea 
                value={char.relationships} 
                onChange={(e) => updateCharacter(char.id, 'relationships', e.target.value)}
                className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-emerald-500/20 rounded-xl p-3 md:p-4 text-sm text-emerald-700 dark:text-emerald-200 focus:outline-none focus:border-emerald-500/50 min-h-0 leading-relaxed"
                placeholder="Mối quan hệ xã hội, gia đình, thù hận... (VD: Vợ của A, Kẻ thù của B, Đệ tử của C...)"
              />
            </div>

            <div className="space-y-1 mb-4">
              <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold text-violet-600 dark:text-violet-400">Nội tâm & Suy nghĩ thầm kín (Về người khác)</label>
              <AutoResizeTextarea 
                value={char.currentThoughts} 
                onChange={(e) => updateCharacter(char.id, 'currentThoughts', e.target.value)}
                className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-violet-500/20 rounded-xl p-3 md:p-4 text-sm text-violet-700 dark:text-violet-200 focus:outline-none focus:border-violet-500/50 min-h-0 leading-relaxed"
                placeholder="Nhân vật đang thầm nghĩ gì? (VD: Đang thầm thích A, Muốn trả thù B, Nghi ngờ C...)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold text-rose-600 dark:text-rose-400">Tính cách khi vào cảnh NSFW (Đồng bộ hoặc tương phản)</label>
                <AutoResizeTextarea 
                  value={char.nsfwPersonality || ''} 
                  onChange={(e) => updateCharacter(char.id, 'nsfwPersonality', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-rose-500/20 rounded-xl p-3 md:p-4 text-sm text-rose-700 dark:text-rose-200 focus:outline-none focus:border-rose-500/50 min-h-0 leading-relaxed"
                  placeholder="Tính cách thay đổi thế nào khi thân mật? (VD: Trở nên bạo dạn hơn, hoặc e thẹn trái ngược với vẻ ngoài mạnh mẽ...)"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold text-rose-600 dark:text-rose-400">Phản ứng đặc trưng (NSFW)</label>
                <AutoResizeTextarea 
                  value={char.nsfwReactions || ''} 
                  onChange={(e) => updateCharacter(char.id, 'nsfwReactions', e.target.value)}
                  className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-rose-500/20 rounded-xl p-3 md:p-4 text-sm text-rose-700 dark:text-rose-200 focus:outline-none focus:border-rose-500/50 min-h-0 leading-relaxed"
                  placeholder="Các phản ứng vật lý, âm thanh, lời nói đặc trưng và các sở thích/kink NSFW (nếu có) trong cảnh thân mật..."
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Mô tả văn học (Độ dài văn học, chiều sâu tâm lý)</label>
              <AutoResizeTextarea 
                value={char.description} 
                onChange={(e) => updateCharacter(char.id, 'description', e.target.value)}
                className="w-full bg-ivory-dark dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800/50 rounded-xl p-3 md:p-4 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-primary/50 min-h-0 leading-relaxed"
                placeholder="Mô tả nhân vật theo phong cách văn học, giàu hình ảnh, chiều sâu tâm lý và quá khứ riêng biệt..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

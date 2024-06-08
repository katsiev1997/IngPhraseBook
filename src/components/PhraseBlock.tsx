
interface PhraseBlockProps {
  rus: string;
  ing: string;
  trscp: string;
  active: boolean;
  onClick: () => void;
}

export const PhraseBlock = ({ rus, ing, trscp, active, onClick }: PhraseBlockProps) => {
  return (
    <div onClick={onClick} className="border-b-2 p-2 hover:bg-slate-100 transition-all">
      <div className="flex justify-between  ">
        <span>{rus}</span>
        <img className="w-6 cursor-pointer" src="/sound.svg" alt="sound" />
      </div>
      {active && (
        <div className="flex flex-col">
          <span className="text-cyan-600">{ing}</span>
          <span className="text-slate-500">{trscp}</span>
        </div>
      )}
    </div>
  );
};

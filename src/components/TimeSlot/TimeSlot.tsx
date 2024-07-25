import React from 'react';

interface TimeSlotProps {
  time: string;
  selected: boolean;
  onSelect: (time: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(time)}
      className={`py-2 px-4 rounded-[8px] border-2 ${selected ? 'border-[#761BE4]' : 'border-[#CBB6E5]'} bg-white text-[#000853] focus:outline-none`}
    >
      {time}
    </button>
  );
};

export default TimeSlot;
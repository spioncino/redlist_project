import { create } from 'zustand';

type useShowCountProps = {
  count: number;
  setCount: (value: number) => void;
};

export const useShowCount = create<useShowCountProps>((set) => ({
  count: 10,
  setCount: (newCount) => set(() => ({ count: newCount })),
}));

type useChooseParksProps = {
  parks: string;
  setParks: (value: string) => void;
};

export const useChooseParks = create<useChooseParksProps>((set) => ({
  parks: 'Все парки',
  setParks: (park) => set(() => ({ parks: park })),
}));

type useChooseTypesProps = {
  types: string;
  setTypes: (value: string) => void;
};

export const useChooseTypes = create<useChooseTypesProps>((set) => ({
  types: 'Все виды',
  setTypes: (type) => set(() => ({ types: type })),
}));

type useChooseStatusProps = {
  status: string;
  setStatus: (value: string) => void;
};

export const useChooseStatus = create<useChooseStatusProps>((set) => ({
  status: 'Все стадии',
  setStatus: (st) => set(() => ({ status: st })),
}));

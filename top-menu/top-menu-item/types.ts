export type Props = {
  title: string;
  path: string;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  selectItemHandler?: (itemType: string) => void;
  stylesMenuItem?: string;
};

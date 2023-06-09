export interface FolderI {
  id: string;
  title: string;
  userId: string;
  username: string;
}

export interface FlashcardI {
  frontSite: string;
  backSite: string;
  id: number;
}

export interface FolderFlashcardsParams {
  folderId: string;
  [key: string]: string | undefined;
}

export interface EditFlashcardsParams {
  folderId: string;
  cards?: string;
  [key: string]: string | undefined;
}

export interface CreateFormData {
  title: string;
  cards: {
    frontSite: string;
    backSite: string;
  }[];
}

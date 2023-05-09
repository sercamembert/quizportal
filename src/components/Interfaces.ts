export interface FolderI {
  id: string;
  title: string;
  userId: string;
  username: string;
}

export interface FlashcardI {
  frontSite: string;
  backSite: string;
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

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserNotLogged } from "../../components/User-not-logged";

interface FlashcardI {
  frontSite: string;
  backSite: string;
}

interface FolderI {
  title: string;
  username: string;
  userId: string;
}

interface FolderFlashcardsParams {
  folderId: string;
  [key: string]: string | undefined;
}

export const FolderFlashcards = () => {
  const { folderId } = useParams<FolderFlashcardsParams>();
  const [flashcards, setFlashcards] = useState<FlashcardI[]>([]);
  const [folder, setFolder] = useState<FolderI | null>(null);
  const [user]: any = useAuthState(auth);
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlippedHorizontal, setIsFlippedHorizontal] = useState(false);
  const [isActionsShowed, setIsActionsShowed] = useState(false);
  const [isTermsShow, serIsTermsShow] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const q = query(collection(db, `Folders/${folderId}/Flashcards`));
      const querySnapshot = await getDocs(q);
      const flashcardsData = querySnapshot.docs.map((doc) =>
        doc.data()
      ) as FlashcardI[];
      setFlashcards(flashcardsData);
    };
    fetchFlashcards();

    const fetchFolder = async () => {
      if (folderId != null) {
        const folderRef = doc(db, "Folders", folderId);
        const folderSnapshot = await getDoc(folderRef);
        const folderData = folderSnapshot.data() as FolderI;
        setFolder(folderData);
      }
    };
    fetchFolder();

    function handleClickOutside(event: any) {
      if (
        event.target.closest(".share-modal__content") === null &&
        event.target.closest(".flashcards__buttons") === null
      ) {
        setIsShareModalOpen(false);
        setIsActionsShowed(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [folderId]);

  const deleteFolder = async () => {
    try {
      console.log(folder?.userId);
      if (folderId != null && folder?.userId === user?.uid) {
        const folderRef = doc(db, "Folders", folderId);
        const flashcardsRef = collection(folderRef, "Flashcards");
        const querySnapshot = await getDocs(flashcardsRef);

        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        await updateDoc(folderRef, {
          Flashcards: [],
        });

        await deleteDoc(folderRef);
        navigate("/");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania dokumentu: ", error);
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setIsFlippedHorizontal(true);

    setTimeout(() => {
      setIsFlippedHorizontal(false);
      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0);
      }
    }, 500);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setIsFlippedHorizontal(true);
    setTimeout(() => {
      setIsFlippedHorizontal(false);
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else {
        setCurrentCardIndex(flashcards.length - 1);
      }
    }, 500);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/folder-flashcards/${folderId}`
    );
  };

  return (
    <div className="flashcards">
      {user ? (
        <div className="flashcards__wrapper">
          <span className="flashcards__title">{folder?.title}</span>
          <div
            className={`flashcards__card ${isFlipped ? "flipped" : ""} ${
              isFlippedHorizontal && "flipped-horizontal"
            }`}
            onClick={handleCardClick}
          >
            <div className="front">
              <p>{flashcards[currentCardIndex]?.frontSite}</p>
            </div>
            <div
              className="back"
              style={{ opacity: !isFlipped ? 0 : undefined }}
            >
              <p>{flashcards[currentCardIndex]?.backSite}</p>
            </div>
          </div>
          <div className="flashcards__buttons">
            <div className="flashcards__arrows">
              <button onClick={handlePrevCard} className="flashcards__arrow">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <span className="flashcards__card-number">
                {currentCardIndex + 1}/{flashcards.length}
              </span>
              <button onClick={handleNextCard} className="flashcards__arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="flashcards__actions-container">
              <div className="flashcards__actions">
                {isActionsShowed && (
                  <>
                    <div className="flashcards__action">
                      <i className="fa-regular fa-pen-to-square"></i>
                      <span>Edit</span>
                    </div>
                    <div
                      className="flashcards__action"
                      onClick={handleShareClick}
                    >
                      <i className="fa-regular fa-share-from-square"></i>
                      <span>Share</span>
                    </div>
                    {folder?.userId === user?.uid && (
                      <div
                        className="flashcards__action"
                        onClick={deleteFolder}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                        <span className="flashcards__action-text">Delete</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flashcards__show-actions">
                <i
                  className="fa-solid fa-gear"
                  onClick={() => setIsActionsShowed(!isActionsShowed)}
                ></i>
              </div>
            </div>
          </div>
          <div className="flashcards__terms">
            <div className="flashcards__terms-heading">
              <span className="flashcards__terms-title">Terms in set</span>
              <span
                className="flashcards__terms-show-hide"
                onClick={() => serIsTermsShow(!isTermsShow)}
              >
                {isTermsShow ? "Hide" : "Show"}
              </span>
            </div>
            {isTermsShow && (
              <div className="flashcards__terms-container">
                {flashcards.map((term) => {
                  return (
                    <div className="flashcards__terms-item">
                      <span className="flashcards__term">{term.frontSite}</span>
                      <span className="flashcards__meaning">
                        {term.backSite}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <UserNotLogged />
      )}
      {isShareModalOpen && (
        <div className="share-modal">
          <div className="share-modal__content">
            <div className="share-modal__link">{`${window.location.origin}/folder-flashcards/${folderId}`}</div>
            <button
              className="share-modal__copy"
              onClick={() => {
                handleCopyClick();
                setIsShareModalOpen(false);
              }}
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
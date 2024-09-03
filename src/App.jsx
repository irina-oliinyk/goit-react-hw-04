import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import searchApi from "./components/searchApi";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loadMoreBtnRef = useRef(null);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = (newTopic) => {
    setTopic(newTopic);
    setPage(1);
    setImages([]);
    setError(false);
  };

  useEffect(() => {
    if (!topic) return;

    const getImages = async () => {
      try {
        setLoading(true);
        const { images: newImages, totalPages: newTotalPages } =
          await searchApi(topic, page);

        if (page === 1 && newImages.length === 0) {
          toast.error("No images found for this search term.", {
            duration: 1500,
          });
        }
        setImages((prevImages) =>
          page === 1 ? newImages : [...prevImages, ...newImages]
        );
        setTotalPages(newTotalPages);
      } catch (error) {
        console.log(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [topic, page]);

  useEffect(() => {
    if (images.length > 0 && page > 1) {
      loadMoreBtnRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [images, page]);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <ImageGallery images={images} onOpenModal={openModal} />
          {loading && <Loader />}
          {images.length > 0 && !loading && page < totalPages && (
            <LoadMoreBtn
              onClick={handleLoadMore}
              loadMoreRef={loadMoreBtnRef}
            />
          )}
          {images.length > 0 && !loading && page >= totalPages && (
            <b>End of collection</b>
          )}
        </>
      )}
      {modalImage && (
        <ImageModal
          isOpen={modalImage}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
    </>
  );
}

export default App;

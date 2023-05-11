import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import css from './ImageGallery.module.css';
export const ImageGallery = () => {
  return (
    <>
      <ul className={css.ImageGallery}>
        <ImageGalleryItem />
      </ul>
    </>
  );
};

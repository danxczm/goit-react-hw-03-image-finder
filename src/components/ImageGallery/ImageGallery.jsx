import { Component } from 'react';
import { fetchData } from 'API/fetchData';
import { Loader } from 'components/Loader/Loader.jsx';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';
export class ImageGallery extends Component {
  state = {
    pictures: [],
    largePictureOpened: null,
    error: null,
    status: '',
    tags: '',
    page: null,
    totalHits: null,
    showModal: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending', pictures: [], page: 1 });

      return fetchData(this.props.searchQuery, this.state.page)
        .then(data => {
          if (data.data.hits.length === 0)
            throw new Error(
              `There are no pictures with ${this.props.searchQuery} tag`
            );
          else
            this.setState({
              pictures: data.data.hits,
              totalHits: data.data.totalHits,
              status: 'resolved',
            });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreHandler = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        fetchData(this.props.searchQuery, this.state.page)
          .then(data => {
            this.setState(prevState => ({
              pictures: [...prevState.pictures, ...data.data.hits],
            }));
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onPictureClick = (largePictureOpened, tags) => {
    this.setState({ largePictureOpened, tags });
    this.toggleModal();
  };

  render() {
    const {
      pictures,
      totalHits,
      error,
      status,
      showModal,
      largePictureOpened,
      tags,
    } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
          {error.message}
        </h1>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            <ImageGalleryItem
              pictures={pictures}
              onPictureClick={this.onPictureClick}
            />
          </ul>
          {pictures.length > 0 && pictures.length < totalHits && (
            <Button onClick={this.loadMoreHandler} />
          )}
          {showModal && (
            <Modal
              onModalClose={this.toggleModal}
              largePictureOpened={largePictureOpened}
              tags={tags}
            />
          )}
        </>
      );
    }
  }
}

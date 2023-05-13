import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onModalClose();
    }
  };

  render() {
    const { largePictureOpened } = this.props;
    return (
      <div className={css.Overlay} onClick={this.onBackDropClick}>
        <div className={css.Modal}>
          <img src={largePictureOpened} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};

import './styles.scss';

export default function Modal({
  children, type, modalRef, closeModal,
}) {
  if (type === 'success') {
    return (
      <div className="toast toast--green" ref={modalRef}>
        <div className="toast__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            className="toast__svg"
            viewBox="0 0 512 512"
          >
            <path d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z" />
          </svg>
        </div>
        <div className="toast__content">
          <p className="toast__type">Success</p>
          <p className="toast__message">
            {children}
          </p>
        </div>
        <div className="toast__close" onClick={closeModal} aria-hidden="true">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15.642 15.642"
          >
            <path fillRule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="toast toast--red add-margin" ref={modalRef}>
      <div className="toast__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642">
          <path
            fillRule="evenodd"
            d="M8.882 7.821l6.541-6.541A.75.75 0 1014.362.219L7.821 6.76 1.28.22A.75.75 0 10.219 1.281L6.76 7.822l-6.54 6.54a.75.75 0 001.06 1.061l6.541-6.541 6.541 6.541a.75.75 0 101.06-1.061l-6.54-6.541z"
          />
        </svg>
      </div>
      <div className="toast__content">
        <p className="toast__type">Error</p>
        <p className="toast__message">
          {children}
        </p>
      </div>
      <div className="toast__close" onClick={closeModal} aria-hidden="true">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15.642 15.642"
        >
          <path fillRule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z" />
        </svg>
      </div>
    </div>
  );
}

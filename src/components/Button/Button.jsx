import './styles.scss';

export default function Button({
  children,
  handleClick,
}) {
  return (
    <button
      type="button"
      className="btn"
      onClick={handleClick}
      aria-hidden="true"
    >
      <span>{children}</span>
      <div className="dot" />
    </button>
  );
}

interface AnswerButtonProps {
  index: number;
  text: string;
  selected: boolean;
  disabled: boolean;
  revealState: "idle" | "correct" | "incorrect" | "muted";
  onSelect: (index: number) => void;
  onHover?: () => void;
}

export default function AnswerButton({
  index,
  text,
  selected,
  disabled,
  revealState,
  onSelect,
  onHover,
}: AnswerButtonProps) {
  const classes = ["answer-button", selected ? "answer-selected" : "", `answer-${revealState}`]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={() => onSelect(index)}
      onMouseEnter={onHover}
    >
      <span className="answer-index">[{index + 1}]</span>
      <span className="answer-text">{text}</span>
    </button>
  );
}

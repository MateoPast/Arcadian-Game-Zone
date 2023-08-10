import './ControlsDigits.scss';


function ControlsDigits({board, getImage, HandleDigitInput}) {
  return (
    <div className="controls_digits">
      { // On crée 9 boutons pour input chacun des chiffres du sudoku
        Array(9)
          .fill(0)
          .map((_, i) => i + 1)
          .map(digit =>
            <button id={`digit_${digit}`} key={digit} onClick={e => HandleDigitInput(digit)}>
              { getImage(digit) }
              <small>
                {
                  board.flat().reduce(
                    (sum, board_digit) => sum - (board_digit === digit),
                    9
                  )
                }
              </small>
            </button>
          )
      }
    </div>
    
  );
}

export default ControlsDigits;
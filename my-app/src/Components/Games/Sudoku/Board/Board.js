import './Board.scss';
import {memo} from 'react';



const Board = memo(function Board({playing_states, playing_state, getImage, setSelectedCell, values, selected_cell}) {
    
    function selectCell(x, y) {
        setSelectedCell({ column: x, row: y });
        //solution[y][x]
    }

    switch (playing_state) {
        case playing_states.loading:
            return <h2>Loading...</h2>;
        default:

    }
    return (
        <table className="table_sudoku">
            <tbody>
            {console.log('hey')}
            {   // On crée 9 <tr> contenant chacun 9 <td>
                values?.map((row, row_i) => 
                    <tr key={row_i}>
                        {
                            row.map((cell, cell_i) =>
                                <td
                                    key={cell_i}
                                    onClick={e => selectCell(cell_i, row_i)}
                                    className={selected_cell.row === row_i && selected_cell.column === cell_i ? 'selected_cell' : ''}
                                >
                                    { getImage(cell) }
                                </td>
                            )
                        }
                    </tr>
                )
            }
            </tbody>
        </table>
    );
});

export default Board;
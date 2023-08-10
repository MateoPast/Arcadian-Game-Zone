import {memo} from 'react';



const ModalRouter = memo(function ModalRouter({ playing_states, playing_state, score }) {
    switch (playing_state) {
        case playing_states.loading:
            return <h2>Loading...</h2>;
        default:

    }
});

export default ModalRouter;
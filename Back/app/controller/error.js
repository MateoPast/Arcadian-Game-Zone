const controller = {
    unknown_error(req, res, err){
        res.status(500);
        res.json({error: 'an unexpected error happened'});

        console.log('-- new unknown error --');
        if (err != null) console.error(err);
    },

    error_message(req, res, err, err_string = 'not found', status = 404){
        res.status(status);
        res.json({error: err_string.toString()});

        console.log('-- new message error --');
        if (err != null) console.error(err);
    }
};

module.exports = controller;
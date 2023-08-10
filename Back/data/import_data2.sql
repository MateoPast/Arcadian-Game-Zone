BEGIN;

INSERT INTO
    public."game"(
        name,
        description,
        game_url,
        image_url
    )

VALUES (
        'Le Pendu',
        'Jeu du pendu',
        'gameurl_jeu1',
        'imageurl_jeu1'
    ), (
        'Le Morpion',
        'Description de test du jeu 2',
        'gameurl_jeu2',
        'imageurl_jeu2'
    ), (
        'Snake',
        'Description de test du jeu 3',
        'gameurl_jeu3',
        'imageurl_jeu3'
    ), (
        'Memory',
        'Description de test du jeu 4',
        'gameurl_jeu4',
        'imageurl_jeu4'
    ), (
        'Sudoku',
        'Description de test du jeu 5',
        'gameurl_jeu5',
        'imageurl_jeu5'
    );


COMMIT 
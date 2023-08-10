BEGIN;

INSERT INTO
    public."player"(
        user_name,
        mail,
        password,
        avatar_url
    )
VALUES (
        'FishRoxxor',
        'mailtest1@mail.com',
        'PASSWORDTEST',
        '/images/avatars/pacman.png'
    ), (
        'StoneLuck',
        'mailtest2@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'PhantomWitcher',
        'mailtest3@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'PainLuck',
        'mailtest4@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'SaleHydro',
        'mailtest5@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest6',
        'mailtest6@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest7',
        'mailtest7@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest8',
        'mailtest8@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest9',
        'mailtest9@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest10',
        'mailtest10@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest11',
        'mailtest11@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest12',
        'mailtest12@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest13',
        'mailtest13@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest14',
        'mailtest14@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest15',
        'mailtest15@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest16',
        'mailtest16@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest17',
        'mailtest17@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest18',
        'mailtest18@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest19',
        'mailtest19@mail.com',
        'PASSWORDTEST',
        'testurl'
    ), (
        'UsernameTest20',
        'mailtest20@mail.com',
        'PASSWORDTEST',
        'testurl'
    );

INSERT INTO
    public."game"(
        name,
        description,
        game_url,
        image_url
    )
VALUES (
        'Le Pendu',
        'Description de test du jeu 1',
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
    ), (
        'Jeu6',
        'Description de test du jeu 6',
        'gameurl_jeu6',
        'imageurl_jeu6'
    ), (
        'Jeu7',
        'Description de test du jeu 7',
        'gameurl_jeu7',
        'imageurl_jeu7'
    ), (
        'Jeu8',
        'Description de test du jeu 8',
        'gameurl_jeu8',
        'imageurl_jeu8'
    ), (
        'Jeu9',
        'Description de test du jeu 9',
        'gameurl_jeu9',
        'imageurl_jeu9'
    ), (
        'Jeu10',
        'Description de test du jeu 10',
        'gameurl_jeu10',
        'imageurl_jeu10'
    );

INSERT INTO
    public."score"(score, player_id, game_id)
VALUES (1, 1, 2), (3, 5, 6), (5, 10, 7), (12345, 14, 8), (1234, 13, 9), (5645245, 14, 5), (16541451, 12, 4), (424561, 14, 3), (12345, 1, 10), (1105456, 18, 2), (54561651, 17, 7), (15546543, 11, 8), (123, 11, 5), (45641, 16, 3), (999999, 19, 9), (1256411, 17, 5), (121544, 12, 7), (12345, 12, 5), (12345, 2, 2), (14564321, 18, 8), (1238545245, 14, 4), (912345, 14, 6), (456172345, 15, 1), (1212325445, 18, 4), (5345, 8, 3), (89122345, 2, 7), (891225345, 1, 9), (88192345, 3, 10), (98912345, 6, 10), (152345, 19, 5), (112345, 17, 4), (212345, 13, 6), (1152345, 14, 7), (1212345, 14, 8), (71212345, 12, 2), (81212345, 11, 8), (61221345, 7, 1), (51232145, 1, 8), (2112345, 2, 1), (112345, 4, 10), (212345, 16, 7), (912345, 10, 5), (7812345, 10, 2), (6512345, 19, 8), (8912345, 17, 7), (54612345, 14, 5), (125412345, 11, 4);

INSERT INTO
    public."favorite"(player_id, game_id)
VALUES (1, 2), (1, 5), (1, 4), (13, 6), (13, 6), (16, 6), (18, 6), (16, 5), (16, 3), (1, 6), (10, 9), (9, 1), (1, 10);

COMMIT 
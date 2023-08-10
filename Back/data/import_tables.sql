-- On démarre une transaction pour s'arrurer que toutes les requêtes soient exécutées, si une erreur survient, on annule toutes les requêtes.
BEGIN;

-- CREATION DES TABLES

-- On commence par supprimer nos tables. En premier celle qui dispose de clé étrangère

DROP TABLE IF EXISTS "favorite", "score", "game", "player";

DROP VIEW IF EXISTS "highscore";

CREATE TABLE "player" (
  -- GENERATED ALWAYS AS IDENTITY va obliger la génération de l'identifiant par SQL et ne pourra pas être renseigner par l'utilisateur. BY DEFAULT aurait permis à l'utilisateur de spécifier un id lors de la création de ma donnée
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_name" VARCHAR (20) UNIQUE NOT NULL , 
  "mail" TEXT UNIQUE NOT NULL,
  "password" VARCHAR (256) NOT NULL,
  "avatar_url" VARCHAR (100) DEFAULT 'AMODIFIER',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "game" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "description" TEXT,
  "game_url" VARCHAR (100) UNIQUE NOT NULL, 
  "image_url" VARCHAR (100) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "favorite" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "player_id" INTEGER NOT NULL REFERENCES "player"("id") ON DELETE CASCADE,
  "game_id" INTEGER NOT NULL REFERENCES "game"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "score" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "score" INTEGER NOT NULL,
  "player_id" INTEGER NOT NULL REFERENCES "player"("id") ON DELETE CASCADE,
  "game_id" INTEGER NOT NULL REFERENCES "game"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CREATE VIEW public.highscore
--  AS
--  SELECT score.score,
--     player.user_name AS user_name,
--     player.id AS player_id,
--     player.avatar_url AS player_avatar_url,
--     game.image_url AS game_image_url,
--     game.name AS name,
--     game.id AS game_id
--    FROM score
--      JOIN player ON score.player_id = player.id
--      JOIN game ON score.game_id = game.id;
     
-- ALTER TABLE public.highscore
--     OWNER TO arcadian;

CREATE VIEW public.highscore
 AS
 SELECT game.name, player.user_name, score.score ,game.id 
       FROM score
       JOIN game ON score.game_id = game.id
       JOIN player ON score.player_id = player.id
       WHERE score.score = (SELECT MAX(score) FROM score s WHERE s.game_id = score.game_id)
       ORDER BY game.id ASC;
     
ALTER TABLE public.highscore
    OWNER TO arcadian;

COMMIT;

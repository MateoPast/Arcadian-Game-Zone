export default class ScoreCalc {
    max_score = 10000;
    min_score = 1000;
    max_lives_count = 0;

    score (time, lives_count = 0) {
        if (lives_count < 1 && this.max_lives_count > 0) {
            throw new Error('Shouldn\'t compute the score of a lost game.');
        }

        // J'ai utilisé chat GPT comme outil de brainstorm
        // pour avoir des idées de formules de calcul
        // d'un score qui décroit avec le temps.
        // J'ai conservé une formule qui utilise une fonction exponentielle,
        // parce qu'elle a de bonnes propriétés, notamment elle ne devient pas négative.

        // La base de l'exponentielle doit être "très légèrement" supérieure à 1,
        // relativement au score minimal.
        // Pour réduire la vitesse de décroissance du score,
        // on met au carré `steepness` et `time`.
        const steepness = 1 + 2 / (this.min_score ** 2);
        const score_time_naive = steepness ** (-(time ** 2));
        
        const scaled_score_time = (this.max_score - this.min_score) * score_time_naive;

        if (this.max_lives_count === 0) {
            return Math.round(scaled_score_time + this.min_score);
        } else {
            const score_for_one_life = this.min_score / this.max_lives_count;
            const score_lives = lives_count * score_for_one_life;

            return Math.round(scaled_score_time + score_lives);
        }
    }
};
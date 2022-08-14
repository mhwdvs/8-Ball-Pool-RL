import * as tf from '@tensorflow/tfjs';

export class RL_AI {
    // tensorflow ML model
    model = tf.sequential();

    /**
     * Given the current gamestate, predict the best action possible
     */
    predict() {
        // possible game state factors:
        // {x, y} coordinates of all balls
        // {x, y} coordinates of holes
        // number of visits remaining?

        // possible actions:
        // cue angle
        // cue force
    }

    /**
     * Given the gamestate before and after an action, determine the action's efficacy
     */
    evaluate(): number {
        // possible evaluation criteria:
        // -- was the shot valid?
        // hyperparameter
        let valid_shot_weight = 0.2;
        // correct ball touched first
        // number of non-preferred balls sunk
        // black ball sunk?
        // cue ball sunk?
        // if unsuccessful, no point evaluating other params
        if (true) {
            return 0;
        }
        else {

        }

        // -- was the shot successful in isolation?
        // hyperparameter
        let successful_shot_weight = 0.4;
        // number of preferred balls sunk

        // -- was the shot successful in terms of the greater game state?
        // hyperparameter
        let gamestate_weight = 0.4;
        // distance of friendly balls from their nearest pocket
        // distance between balls
        // distance between cue ball and edge of table

        return
    }

    /**
     * Fit a prediction and evaluation into the AI model
     */
    train() {

    }

}

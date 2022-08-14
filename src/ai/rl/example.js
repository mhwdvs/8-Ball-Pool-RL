//definitions
moves = ["ROCK", "PAPER", "SCISSORS"];
let myMove;
let opMove;
let opMoveIdx;
const model = tf.sequential();

// phase 0 = train
// phase 1 = evaluate

/**
 *Initialize the model parameters and plot the initial probabilities.
 */
function init() {
    //create model class
    model.add(tf.layers.dense({ units: 3, inputShape: [3], useBias: false, kernelInitializer: 'heNormal' }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
    plotProbs();
}

/**
 * Choose an agent's move based on the phase.
 * Training Phase: Choose actions randomly
 * Evaluation Phase: Choose actions based on argmax probability.
 *
 * Params: My Move
 * Return: Agent Move
 */

function chooseMove(chosenMove) {

    var phase = document.getElementsByName('phase');

    if (phase[1].checked) {
        //choose from model
        var intMove = convertToOneHot(chosenMove);
        var xs = tf.tensor2d(intMove, [1, 3]);
        var logits = model.predict(xs).arraySync()[0];
        //get max
        opMove = moves[getMaxIndex(logits)];
    } else {
        //choose randomly
        opMoveIdx = Math.floor((Math.random() * 3) + 0);
        opMove = moves[opMoveIdx];
    }

    return opMove;
}

/**
 * Trains the model based on the reward given by the user.
 *
 * Params: reward
 * Return: None
 */
function train(reward) {
    var phase = document.getElementsByName('phase')
    if (phase[0].checked) { // if train has been clicked

        var intMove = convertToOneHot(myMove);
        var xs = tf.tensor2d(intMove, [1, 3]);
        var logits = model.predict(xs).arraySync()[0];

        //update model
        logits[opMoveIdx] = logits[opMoveIdx] + reward;
        const ys = tf.tensor2d(logits, [1, 3])
        model.fit(xs, ys).then(() => {
            plotProbs();
        });
    }
}

/**
 * Converts a move into a one-hot vector.
 *
 * Params: Move
 * Return: One-Hot-Vector
 */
function convertToOneHot(move) {
    if (move == "ROCK") return [1, 0, 0];
    if (move == "PAPER") return [0, 1, 0];
    if (move == "SCISSORS") return [0, 0, 1];
    //throw error
}

/**
 * Choose the index of the maximum value from the array.
 *
 * Params: Array of values
 * Return: Index of the max value
 */
function getMaxIndex(values) {
    var max = values[0];
    var index = 0;

    for (var i = 1; i < values.length; i++) {
        if (values[i] > max) {
            max = values[i];
            index = i;
        }
    }
    return index;
}

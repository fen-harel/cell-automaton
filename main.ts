// Goal:
//
// Current cell state defines state of next cell
// Statemachine & transition table
// Only 2 states: dead | alive
// Encode Switch case as a table

const states = 2

// Transition table
// index 0 -> else
const gameOfLife = {
    "dead": ["dead", "dead", "dead", "alive", ...]
    "alive" : [...]
}


// PSUEDOCODE ...

current_cell = "dead" | "alive"
// no.of neighbours -> 0-8 (2d grid)
nbors = ...;
assert(0 <= nbors && nbors <= 8)

next_cell = undefined

// no.of alive neighbours 
switch (current_cell) {
    case "dead": {
        if (nbors === 3) {
            next_cell = "alive"
        }
         else {
            next_cell = "dead"
        }
    }break;

    case "alive": {
        if (nbors >= 2 && nbors <= 3){
            next_cell = "alive"
        } else {
            next_cell = "dead"
        }
    } break;
}

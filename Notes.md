# Goal:

-   Current cell state defines state of next cell
-   Statemachine & transition table
-   Only 2 states: dead | alive
-   Encode Switch case as a table
-   Cellular automata is a Convolution(see later) & also statemachine

```ts
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
```

## Use pixellated image

### Create a transition Table

-   Transition Table will replace a switch case.
    Hence its faster and more conscise i.e. easier to understand

            --> `GameOfLife[current_cell]` ...brings us to transition table
            --> `GameOfLife[current_cell][nbors]` ...brings us to "next_cell"

    -   Transition Table didctates model of cellukar automaton
    -   May generate transition table procedurally (Just a thought)

$(function(){
    //Get input data from file
    //Using $.ajax instead of $.get so that caching can be disabled
    $.ajax({url: "input.txt", success: function(data){
        //split input file into lines
        var lines = data.split('\r\n');
        //remove and store instruction list
        var instructions = lines.pop();
        //remove and store room dimensions, and convert to numerical values
        var roomSize = lines.shift().split(" ").map(Number);
        //remove and store starting position, and convert to numerical values
        var position = lines.shift().split(" ").map(Number);
        //initialise variable for counting number of patches cleaned
        var cleanedPatches = 0;
        //load list of dirty patches from remaining lines
        var patches = [];
        for (var patch in lines){
            patches.push(lines[patch].split(" ").map(Number));
        }
        //iterate through instructions
        for (var i in instructions){
            //decide which axis and direction the hoover will move in
            var axis = undefined;
            var val = undefined;
            switch(instructions[i]){
                case "N":
                    axis = 1;
                    val = 1;
                    break;
                case "S":
                    axis = 1;
                    val = -1;
                    break;
                case "E":
                    axis = 0;
                    val = 1;
                    break;
                case "W":
                    axis = 0;
                    val = -1;
                    break;
            }
            //calculate new value of changed axis
            newval = position[axis] + val;
            //ensure the new value is not out of room bounds
            if(newval < roomSize[axis] && newval >= 0){
                //new position is within room boundary, so set position permanently
                position[axis] = newval;
                //loop through list of patches
                for(var patch in patches){
                    //check if patch is in the same position as the hoover
                    if(position[0] == patches[patch][0] && position[1] == patches[patch][1]){
                        //hoover is cleaning a patch
                        //remove patch from list, as it is now clean
                        patches.splice(patch,1);
                        //increment counter of cleaned patches
                        cleanedPatches += 1;
                    }
                }
            }
        }
        //output final position and number of cleaned patches
        console.log(position[0] + " " + position[1]);
        console.log(cleanedPatches);
    }, cache: false});
});
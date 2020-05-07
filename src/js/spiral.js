class spiral {
    constructor(inputx, inputy, inputTime) {

        this.spiralx = inputx;
        this.spiraly = inputy;
        this.maxtodraw = 7000;
        this.time = 0;
        this.opacity = 30;
        this.spiralcolors = [[], [], []];
        this.animate = true;
        this.keepgoing = true;
        this.size = 20;                                 // size of each shape
        this.stepSize = 0.65;
        this.goldenAngle = PI * (3.0 - sqrt(5));
        this.timeLimit = inputTime;
        this.mono = [];
        this.overrideTouched = false;
        this.dimensionChoices = [-1, 1, -2, 2];
        this.dimensions = [];
        this.loadcolors();
    }

    loadcolors() {
        for (i = 0; i < this.maxtodraw; i++) {
            this.spiralcolors[0].push(random(0, 255));
            this.spiralcolors[1].push(random(0, 255));
            this.spiralcolors[2].push(random(0, 255));
            this.dimensions.push(random(this.dimensionChoices));
            // this.mono.push(round(random(0, 255)));
        }
    }

    show(inputframecount, startpoint, clicklength) {
            // console.log(this.time);
            push();
            rectMode(CENTER);
            

            translate(this.spiralx, this.spiraly);             // move center to middle of canvas
            if (this.animate) {
                if(this.time <= this.timeLimit) {
                    this.maxtodraw = startpoint + inputframecount;
                }
            }              

            
            rotateX(this.time * 0.5);
            rotateZ(this.time * 0.7);
            
            // rotateY(this.time * 0.01);
            for (i = 0; i < this.maxtodraw; i++) {
                translate(0, 0, this.time * 0.5 * this.dimensions[i]);

                fill(this.spiralcolors[0][i], this.spiralcolors[1][i], this.spiralcolors[2][i], this.opacity + (clicklength * 5));    
                // fill(this.mono[i], this.mono[i], this.mono[i], this.opacity);      
                translate(0, i * this.stepSize);                 // take step forward
                rotate(this.goldenAngle);                        // rotate by the golden angle

                /////////////////////
                // Draw the shape! //
                /////////////////////
                triangle(this.size * -1, 0, 0, this.size, this.size, 0);       // draw a triangle
                //ellipse(0, 0, size);						// draw an ellipse (circle)
                //rect(0, 0, size, size); 					// draw a rectangle
            }
            this.time += 0.001; 
            pop();
        
    }

}
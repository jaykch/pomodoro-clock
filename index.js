/**
 * Created by Jay on 11/14/2016.
 */

$(document).ready(function () {
    pomodoro.init();

});


var pomodoro = {


    config: {
        breakVal: 5,
        sessionVal: 25,
        displayMinVal: 25,
        displaySecVal: 0,
        clockControl: 0,
        breakControl: 0,
        displayColors: ["rgba(10, 141, 0, 0.51)", "rgba(0, 0, 0, 0.51)"]
    },

    init: function () {
        this.getDomElements();
        this.reset();
        this.resetHandler();
        this.render();
        this.sessionSelectHandler();
        this.breakSelectHandler();
        this.clockHandler();
        this.displayColorHandler();
    },

    getDomElements: function () {
        this.$break = $('#break-display');
        this.$session = $('#session-display');
        this.$display = $('#display');
        this.$reset = $('#reset');
        this.$sneg = $('#session-neg');
        this.$spos = $('#session-pos');
        this.$bneg = $('#break-neg');
        this.$bpos = $('#break-pos');
    },

    displayColorHandler: function () {
        if (this.config.breakControl === 0) {
            this.$display.css("background", this.config.displayColors[0]);
        }
        else {
            this.$display.css("background", this.config.displayColors[1]);
        }

    },

    resetHandler: function () {
        this.$reset.click(function () {
            this.reset();
            console.log("resetting....");
        }.bind(this));
    },

    clockHandler: function () {
        this.$display.click(function () {

            //settings for clock
            if (this.config.clockControl === 0) {
                this.config.clockControl = 1;
            } else {
                this.config.clockControl = 0;
            }
            //end of settings

            var clock = setInterval(function () {
                if (this.config.clockControl === 1) {

                    if (this.config.displaySecVal == 0) {
                        this.config.displayMinVal -= 1;
                        this.config.displaySecVal = 60;
                    }
                    this.config.displaySecVal -= 1;

                    if (this.config.displayMinVal === 0 && this.config.displaySecVal === 0) {
                        if (this.config.breakControl === 1) {
                            this.config.breakControl = 0;
                            this.config.displayMinVal = this.config.breakVal;
                        }
                        else if (this.config.breakControl === 0) {
                            this.config.breakControl = 1;
                            this.config.displayMinVal = this.config.sessionVal;

                        }
                    }


                    this.render();
                } else clearInterval(clock);
            }.bind(this), 1000);
        }.bind(this));
    },

    restrictedActivity: function () {
        alert("You cannot use this action while the clock is running");
    },

    sessionSelectHandler: function () {

        this.$sneg.click(function () {
            if (this.config.clockControl === 0) {
                if (this.config.sessionVal > 1)this.config.sessionVal -= 1;
                this.config.displayMinVal = this.config.sessionVal;
                this.config.displaySecVal = 0;
                this.render();
            } else this.restrictedActivity();

        }.bind(this));
        this.$spos.click(function () {
            if (this.config.clockControl === 0) {
                this.config.sessionVal += 1;
                this.config.displayMinVal = this.config.sessionVal;
                this.config.displaySecVal = 0;
                this.render();
            } else this.restrictedActivity();

        }.bind(this));
    },
    breakSelectHandler: function () {
        this.$bneg.click(function () {
            if (this.config.clockControl === 0) {
                if (this.config.breakVal > 1)this.config.breakVal -= 1;
                this.config.displayMinVal = this.config.sessionVal;
                this.config.displaySecVal = 0;
                this.render();
            } else this.restrictedActivity();
        }.bind(this));
        this.$bpos.click(function () {
            if (this.config.clockControl === 0) {
                this.config.breakVal += 1;
                this.config.displayMinVal = this.config.sessionVal;
                this.config.displaySecVal = 0;
                this.render();
            } else this.restrictedActivity();
        }.bind(this));
    },

    resetVals: function () {
        this.config.breakVal = 5;
        this.config.sessionVal = 25;
        this.config.displayMinVal = 25;
        this.config.displaySecVal = 0;
        this.config.clockControl = 0;
        this.config.breakControl = 0;
    },

    reset: function () {
        this.resetVals();
        this.render();
    },

    render: function () {
        this.$break.html(this.config.breakVal + ":00");
        this.$session.html(this.config.sessionVal + ":00");


        if (this.config.displaySecVal < 10) {
            if (this.config.breakControl === 1) {
                this.$display.html("Break!<br>" + this.config.displayMinVal + ":0" + this.config.displaySecVal);

            }
            else if (this.config.breakControl === 0) {
                this.$display.html("Session<br>" + this.config.displayMinVal + ":0" + this.config.displaySecVal);

            }
        }
        else {
            if (this.config.breakControl === 1) {
                this.$display.html("Break!<br>" + this.config.displayMinVal + ":" + this.config.displaySecVal);

            }
            else if (this.config.breakControl === 0) {
                this.$display.html("Session<br>" + this.config.displayMinVal + ":" + this.config.displaySecVal);

            }
        }
        this.displayColorHandler();
    }
};
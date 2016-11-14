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
        displaySecVal: 0


    },

    init: function () {
        this.getDomElements();
        this.reset();
        this.resetHandler();
        this.render();
        this.sessionSelectHandler();
        this.breakSelectHandler();
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

    resetHandler: function () {
        this.$reset.click(function () {
            this.reset();
            console.log("resetting....");
        }.bind(this));
    },

    sessionSelectHandler: function () {
        this.$sneg.click(function () {
            if (this.config.sessionVal > 1)this.config.sessionVal -= 1;
            this.config.displayMinVal = this.config.sessionVal;
            this.render();
        }.bind(this));
        this.$spos.click(function () {
            this.config.sessionVal += 1;
            this.config.displayMinVal = this.config.sessionVal;
            this.render();
        }.bind(this));
    },
    breakSelectHandler: function () {
        this.$bneg.click(function () {
            if (this.config.breakVal > 1)this.config.breakVal -= 1;
            this.render();
        }.bind(this));
        this.$bpos.click(function () {
            this.config.breakVal += 1;
            this.render();
        }.bind(this));
    },

    resetVals: function () {
        this.config.breakVal = 5;
        this.config.sessionVal = 25;
        this.config.displayMinVal = 25;
    },

    reset: function () {
        this.resetVals();
        this.render();
    },

    render: function () {
        this.$break.html(this.config.breakVal + ":00");
        this.$session.html(this.config.sessionVal + ":00");
        if (this.config.displaySecVal < 10) {
            this.$display.html(this.config.displayMinVal + ":0" + this.config.displaySecVal);
        }
        else {
            this.$display.html(this.config.displayMinVal + this.config.displaySecVal);
        }
    }
};
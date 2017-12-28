# rythm-correct.js
A simple script used to add margin to elements with dynamic heights, in order to maintain vertical rythm.

This script assumes a few things about your css.
- It assumes you have implemented a vertical baseline, which is a set number.
- It assumes that your font-size and line-heights have a specific relationship.
- It assumes that you have used margin-bottom, with said typography, to make sure the page stays consistent with your vertical rythm.
- It assumes you are using padding to add whitespace below elements, not margin.

The aim of this script is to add margin to elements with flexible heights, in order to maintain vertical rythm.

## How to Use
At the bottom of `rythm-correct.js`, change the function inputs the what you wish. The first is the vertical baseline, in pixels, followed by the unit of measurement you wish to have it implemented in. (Checks for `rem`, otherwise uses `px`.)
Then, just add the `rythm-correct` class to the elements you want to correct the vertical rythm of.

Quiz Quartet
==========

Quiz Quartet was built to automate the process for generating a quiz so no developer has to be involved and write repetitive code! Check out the project at [http://quiz-generator.herokuapp.com](http://quiz-generator.herokuapp.com)

## Fork!
This is a forked version of robflaherty's for of Vox's quiz generator. To quote Rob: 

"It's not totally done yet but it's functional. Experiment, use with caution. This version:

* Removes the hard coded references to the Vox brands' stylesheets and social usernames
* Removes the Ruby dependencies so you can just run it as static files
* Removes the quiz/flowchart JS and stylesheets from the generated embed code.

This last change is sort of an architectural change to make the tool better suited for general, non-brand specific use. Instead of having the tool generate specific stylesheet and script file references, we can just include the CSS and JS in our application."

[Hosted version of the tool is here](http://robflaherty.github.io/quiz-generator/)

### Instructions
1. Wherever you plan on embedding the quizzes, include quiz.js and flowchart.js in your site JS. You'll need jQuery, too.
2. Wherever you plan on embedding the quizzes, include quiz.css. Add your own styling of course to make it look nice.
3. I think that's it. Just drop the generated embed code into your CMS.

All credit goes to the Vox team!

If you have any questions about the fork you can find me on twitter: [@robflaherty](https://twitter.com/robflaherty).

/end Fork info

## How does the tool work?

The quiz tool is powered by (you guessed it!) Google Spreadsheets. Editors use a Google Spreadsheet Template to input the content of the quiz. For each question, they enter the question text, four choices, an optional question description, the correct answer, incorrect message, correct message and a hint. Once the editor is done, they publish the spreadsheet to the web and grab its public URL.

The editor then feeds the spreadsheet URL into our authoring tool, which uses Tabletop.js to collect the spreadsheet data. In order to make the tool more reliable, the authoring tool uses Tabletop.js to collect the spreadsheet data into a JSON object, which is then attached to the embed code. This means that the quiz embed code will need to be regenerated every time a change is made in the spreadsheet, but the quiz will be more stable since it does not rely on accessing Google Spreadsheets every time it loads.

Next, the editor picks from one of Vox Media’s verticals (the tool currently supports Vox.com, SB Nation, The Verge, Polygon, Eater and Racked). A vertical-specific stylesheet URL is then generated, e.g. quiz-vox.css. The stylesheet, together with the quiz data, is parsed together with a script tag using the quiz.js library. All of these files are currently hosted on Amazon S3. Now, editors can copy and paste the embed code into the CMS and voilà -- an interactive quiz without touching any code!



## How does the quiz work?
The quiz dynamically generates an array of multiple choice questions from a JSON object. Users’ answers are highlighted when selected, then the chosen string is compared to the correct answer. Users can also see a hint for each question. Scores are incremented if the user answers correctly, and the final result is displayed at the end of the quiz for users to share on social media.



## What’s next?
The app is fully functional, but we would like to add more options for creating different kinds of quizzes (true/false, flowchart-ish). We’d also like to make options for inserting images/video/audio within questions, answers, and hints (as our project is currently completely text-based). We’d also like to polish/write better Javascript!


## License

Copyright (c) 2014 Vox Media Inc., KK Rebecca Lai, Nicole Zhu, Adam Baumgartner

BSD license

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    /* Pass your questions in here */
    {
        message: "Type your link here: ",
        name: "URL"

    }
])
    .then((answers) => {
        let userURL = answers.URL;
        var qr_svg = qr.image(userURL, { type: 'png' });
        qr_svg.pipe(fs.createWriteStream('./images/qr-image.png'));

        
        fs.appendFile("userinput.txt", "\n"+userURL, (err) => { 
            if (err)
             throw err 
            console.log("success");
            })
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });



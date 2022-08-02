/*
    Copyright 2021 VMware, Inc.
    SPDX-License-Identifier: Apache-2.0	
*/
const { createCanvas, loadImage } = require('canvas')
const path = require('path');


exports.drawBadge = async(data)  {
    let badgeInfo = data.badgeInfo;
    let awardLine1 = badgeInfo.line1;
    let awardLine2 = badgeInfo.line2;
    let awardLine3 = badgeInfo.line3;
    let name = `${data.givenName} ${data.familyName}`;
    let bg = badgeInfo.bg;

    const top = 170;
    const left = 100;
    const right = 800;

    const canvas = createCanvas(1200, 750)
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 2;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    ctx.fillText(awardLine1, left, top);
    ctx.strokeText(awardLine2, left, top + 100);
    ctx.strokeText(awardLine3, left, top + 200);
    ctx.lineWidth = 1;
    ctx.font = "bold 50px Arial";
    ctx.strokeText("Awarded to:", left, top + 330);

    ctx.font = "bold 60px Arial";
    ctx.fillText(name, left, top + 400);

    
    let img = await loadImage(path.join(__dirname, "public/passed.png"));
    ctx.drawImage(img, right, top - 80);

    ctx.font = "15px Courier New";
    ctx.fillText("56 49 4e 43", right + 110, top + 10);
    ctx.fillText("49 54 20 51 55", right + 95, top + 40);
    ctx.fillText("49 20 53 45 20 56", right + 80, top + 70);
    ctx.fillText("49 4e 43 49 54", right + 95, top + 100);

    let nameParts = name.split(" ");
    if(nameParts.length > 1){
        let ini1 = nameParts[0].charCodeAt(0).toString(16);
        let ini2 = nameParts[1].charCodeAt(0).toString(16);
        let sp = " ".charCodeAt(0).toString(16);
        ctx.fillText(`${sp} ${ini1} ${sp} ${ini2}`, right + 110, top + 130);
    }
    let date = new Date(data.completion);
    ctx.fillText(date.toLocaleDateString(), left, top + 480);
    ctx.fillText(data.idHash, right + 150, top + 480);
    return canvas.toBuffer();
}

import { createCanvas, loadImage } from "canvas";
import { readSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { cwd } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const text = req.query.text as string;

  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");
  const bg = await loadImage(path.join(cwd(), "public", "nft-background.jfif"));

  //center fit
  // center fill
  const hRatio = canvas.width / bg.width;
  const vRatio = canvas.height / bg.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - bg.width * ratio) / 2;
  const centerShift_y = (canvas.height - bg.height * ratio) / 2;

  ctx.drawImage(
    bg,
    0,
    0,
    bg.width,
    bg.height,
    centerShift_x,
    centerShift_y,
    bg.width * ratio,
    bg.height * ratio
  );
  if(text.length > 10){
    ctx.font = "32px mono";
  } else {
    ctx.font = "40px mono";
    
  }
  ctx.fillStyle = '#fff'
  ctx.textAlign = "center";
  ctx.fillText(`/${text}`,canvas.width/2, canvas.height/2);


  const dataURL = canvas.toDataURL();
  // Respond as html
  res.json({dataURL})
}

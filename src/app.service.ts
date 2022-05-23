import { Injectable } from '@nestjs/common';
import { text } from 'express';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class AppService {
  getHello(): string {
    let imageList = ['CT_68/CT_68_0.png', 'CT_68/CT_68_1.png'];
    return this.replceImageName('text', imageList);
  }

  replceImageName(text: string, imageList: string[]) {
    text = `<h1>รีวิวแบบชิงชัง</h1><p><img src=""></p><p>เกมจ้า</p><p><img src=""></p>`;
    let convertText = '';
    let newtext = text.split(`<img src="">`);
    newtext.forEach((text, index, newtext) => {
      if (index !== newtext.length - 1) {
        convertText = convertText + text + `<img src="${imageList[index]}">`;
      } else {
        convertText = convertText + text;
      }
    });
    console.log(convertText);
    return convertText;
  }
}

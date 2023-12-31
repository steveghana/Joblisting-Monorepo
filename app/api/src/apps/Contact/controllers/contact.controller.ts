import {
  Controller,
  Get,
  UseFilters,
  Res,
  Post,
  Req,
  Logger,
  Next,
} from '@nestjs/common';
import emailUtil from '../../../util/email';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
import { Response } from 'express';

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/gu, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
    }
    return c;
  });
}
@Controller(`/contact`)
export class ContactController {
  // constructor() {}

  /* ===================== */

  @ApiTags('Send email notification')
  @Post('/')
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'send email to user',
  })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  // @UseInterceptors(CacheInterceptor)
  async getVapidPublicKey(@Next() next, @Res() res: Response, @Req() req) {
    const { subject, reciepients, message } = req.body;
    console.log(req.body);
    for (let i = 0; i < reciepients?.length; i++) {
      await emailUtil.sendStyled({
        to: reciepients[i].email,
        subject: `מישהו השאיר פרטים בעמוד הנחיתה של Q-int: ${escapeXml(
          subject,
        )}`,
        html: `<h1>
שלום רן.<br/>
מישהו השאיר פרטים הרגע ב<a href="https://www.q-int.com/#contact">עמוד הנחיתה של q-int</a>.
</h1>
<table>
    <tr>
        <th>שם</th>
        <th>טלפון</th>
        <th>כתובת דוא&quot;ל</th>
        <th>הודעה</th>
    </tr>
    <tr>
        <td>${escapeXml(reciepients[i].name)}</td>
        <td>${escapeXml(message)}</td>
    </tr>
</table>
<br/><br/>
בברכה,
מערכת q-int`,
      });
    }

    res.status(200).send();
  }

  /* ===================== */

  /* ===================== */

  /* ===================== */
}

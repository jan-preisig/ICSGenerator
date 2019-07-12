import {Injectable} from '@angular/core';
import {TerminService} from './termin.service';
import {v4 as uuid} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class FileCreateDownloadService {
  NEWLINE = '\n';
  private setting = {
    element: {dynamicDownload: null as HTMLElement}
  };

  constructor(private terminService: TerminService) {
  }

  public createIcsFileFromTermine(fileName: string) {
    let content = this.generateICSHeader();
    this.terminService.getTermine().forEach((termin) => {
      content += 'BEGIN:VEVENT' + this.NEWLINE;
      content += 'DTSTAMP:' + this.createDateTimeStringFromDate(termin.dtStamp) + this.NEWLINE;
      content += 'CREATED:' + this.createDateTimeStringFromDate(termin.creationDate) + this.NEWLINE;
      content += 'UID:' + termin.uid + this.NEWLINE;
      content += 'DTSTART:' + this.createDateTimeStringFromDateAndTime(termin.startDate, termin.startTime) + this.NEWLINE;
      content += 'DTEND:' + this.createDateTimeStringFromDateAndTime(termin.endDate, termin.endTime) + this.NEWLINE;
      content += 'SUMMARY:' + termin.title + this.NEWLINE;
      if (termin.description !== '' && termin.description !== null) {
        content += 'DESCRIPTION:' + termin.description + this.NEWLINE;
      }
      if (termin.location !== '' && termin.location !== null) {
        content += 'LOCATION:' + termin.location + this.NEWLINE;
      }
      content += 'END:VEVENT' + this.NEWLINE;
    });
    content += 'END:VCALENDAR';
    this.createAndDownloadFile(fileName, content);
  }

  private generateICSHeader(): string {
    let result = 'BEGIN:VCALENDAR' + this.NEWLINE;
    result += 'VERSION:2.0' + this.NEWLINE;
    result += 'CALSCALE:GREGORIAN' + this.NEWLINE;
    result += 'METHOD:PUBLISH' + this.NEWLINE;
    result += 'PERIODID:ICSGenerator by Jan Preisig' + uuid() + this.NEWLINE;
    result += 'TZ:-02' + this.NEWLINE;
    return result;
  }

  private createDateTimeStringFromDate(date: Date): string {
    let result = '';
    result += date.getFullYear();
    result += this.pad2(date.getMonth() + 1);
    result += date.getDate();
    result += 'T';
    result += date.getHours();
    result += date.getMinutes();
    result += '00';
    return result;
  }

  private createDateTimeStringFromDateAndTime(date: Date, time: string): string {
    let result = '';
    result += date.getFullYear();
    result += this.pad2(date.getMonth() + 1);
    result += date.getDate();
    result += 'T';
    result += time.substr(0, 2);
    result += time.substr(3, 5);
    result += '00';
    return result;
  }

  private pad2(number): string {
    return (number < 10 ? '0' : '') + number;
  }

  public createAndDownloadFile(fileName: string, text: string) {
    this.dyanmicDownloadByHtmlTag({
      fileName: fileName,
      text: text
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'exclude' })
export class ExcludePipe implements PipeTransform {
  transform(fullData: any[], excludeData: any[], key: string = 'id') {
    console.log({ fullData, excludeData });
    return fullData.filter(data =>
      !excludeData.some(exclude => exclude[key] == data[key]),
    );
  }
}

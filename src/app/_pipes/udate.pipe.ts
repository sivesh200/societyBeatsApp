import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'udate'
})
export class UdatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var d = new Date(value);
    var n = d.toUTCString();
    return n;
  }

}

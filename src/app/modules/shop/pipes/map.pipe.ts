import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  transform(place: string): string {
    return `https://www.google.es/maps/search/${place}/`;
  }

}

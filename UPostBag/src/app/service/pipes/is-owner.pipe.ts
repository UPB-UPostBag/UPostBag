import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOwner'
})
export class IsOwnerPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return (value) ? "Owner" : "Collaborator";
  }

}

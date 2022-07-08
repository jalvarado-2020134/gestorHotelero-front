import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'hotel'
})
export class HotelPipe implements PipeTransform {
    transform(events: any, search: any) {
        if (search === undefined) {
            return events;
        } else {
            return events.filter((event: any) => {
                return event.hotel.name.toLowerCase().includes(search.toLowerCase());
            })
        }
    }
}
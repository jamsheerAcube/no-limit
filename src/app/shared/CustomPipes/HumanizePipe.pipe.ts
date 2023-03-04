import { Pipe } from "@angular/core";

@Pipe({
    name: 'humanizeCamelCase'
})

export class HumanizePipe {
    transform(value: string) {
        if ((typeof value) !== 'string' || value == 'UOM') {
            return value;
        }
        value = value.split(/(?=[A-Z])/).join(' ');
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
}
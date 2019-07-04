import { Directive, HostListener, HostBinding, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{

    @HostBinding('class.open') isOpen = false;

    ngOnInit(){ }

    @HostListener('click') toggleOpen(event: Event){
        this.isOpen = !this.isOpen;
    }
}